import { isadmin } from "../game.js";

const socket = io();

let options = {
  // Pass your App ID here.
  appId: "3cfa260fc2024b9ea344541f797bd171",
  // Set the channel name.
  channel: "",
  // Pass your temp token here.
  token: "",
  // Set the user ID.
  uid: 0,
};

let channelParameters = {
  localAudioTrack: null,
  remoteAudioTrack: null,
  remoteUid: null,
};

var muteButton;
var startVoice;
var remoteUser = {};

async function startBasicCall() { 
  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  agoraEngine.on("user-published", async (user, mediaType) => {
    await agoraEngine.subscribe(user, mediaType);
    if (mediaType == "audio") {
      const remoteUid = user.uid;
      // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
      const remoteAudioTrack = user.audioTrack;
      remoteUser[remoteUid] = remoteAudioTrack;
      remoteAudioTrack.play();
    }
    // Listen for the "user-unpublished" event.
    agoraEngine.on("user-unpublished", (user) => { });
  });

  startVoice = () => {
    let search_params = new URL(window.location.href).searchParams;
    var avtarName = search_params.get("name");
    var roomName = search_params.get("room");
    // Join a channel.
    options.channel = roomName;
     socket.emit("checkAgoraToken", roomName);
    socket.on("getTokenFromDB", async (token) => {
      options.token = token;
      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      /*------------------------------------*/

      socket.emit("addVoiceId", {
        voiceId: agoraEngine.uid,
        avtarName: avtarName,
        roomName: roomName,
      });
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      await agoraEngine.publish(channelParameters.localAudioTrack);

      muteButton = document.querySelector(".selfMute");
      muteButton.addEventListener("click", async function () {
        if (!channelParameters.localAudioTrack.enabled) {
          await channelParameters.localAudioTrack.setEnabled(true);
          muteButton.innerHTML = '<i class="fas fa-microphone"></i>';
        } else {
          await channelParameters.localAudioTrack.setEnabled(false);
          muteButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        }
      })
      document.addEventListener("keyup", async function (e) {
        if (e.code === "KeyM") {
          if (!channelParameters.localAudioTrack.enabled) {
            await channelParameters.localAudioTrack.setEnabled(true);
            muteButton.innerHTML = '<i class="fas fa-microphone"></i>';
          } else {
            await channelParameters.localAudioTrack.setEnabled(false);
            muteButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
          }
        }
      })

    });
  };
  agoraEngine.enableAudioVolumeIndicator();
 
}
export { startBasicCall, remoteUser, startVoice };
