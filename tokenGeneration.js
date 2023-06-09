const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");

const appId = "3cfa260fc2024b9ea344541f797bd171";
const appCertificate = "1156571fe7b14abb95fe33a36a430f2e";
// const channelName = "test";
const uid = 0;
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 86400;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
// Build token with uid

function generateToken(channelName) {
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  return token;
}

module.exports = { generateToken, privilegeExpiredTs };
