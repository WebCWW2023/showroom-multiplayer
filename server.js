const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  pingTimeout: 2500,
  pingInterval: 5000,
});
var mysql = require("mysql2");
var moment = require("moment");
const webrtc = require("wrtc");
const tokenGenerator = require("./tokenGeneration").generateToken;

/*-----------------database connection-------------------*/
var con = mysql.createConnection({
 
  host: "13.200.71.91",
  user: "worldbeyond_worldbeyond2023",
  password: "e^gU@]1t_1YI",
  database: "worldbeyond_metaverse2023",
  
  });

app.use(express.static("."));

/*-----------------admin-------------------*/
app.get("/a", (req, res) => {
  res.redirect(`/game/admin.html`);
});

/*-----------------public-------------------*/
app.get("", (req, res) => {
  res.redirect(`game/game.html?id=1&name=ashish&isadmin=true&room=test-hall2`);
});
app.get("/2", (req, res) => {
  res.redirect(`game/game.html?id=2&name=mohit&isadmin=true&room=test-hall2`);
});

var playerList = {};
var playerVoiceList = {};

/*-----------------connection-------------------*/
io.on("connection", (socket) => {
  //Check DB for agora Token
  socket.on("checkAgoraToken", (roomName) => {
    let agoraToken;
    var CurrentDate = moment();
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `SELECT token, time_stamp FROM agora_token where room_name= "${roomName}"`,
        function (err, result, fields) {
          if (err) throw err;

          if (result && result.length > 0) {
            const period = CurrentDate.diff(result[0].time_stamp, "seconds");
            if (period > 86400) {
              const newToken = tokenGenerator(roomName);
              const updateRow = `update agora_token set token="${newToken}", time_stamp="${CurrentDate.format()}" where room_name="${roomName}"`;
              con.connect(function (err) {
                if (err) throw err;
                con.query(updateRow, function (err, result, fields) {
                  if (err) throw err;
                });
              });
              socket.emit("getTokenFromDB", newToken);
            } else {
              socket.emit("getTokenFromDB", result[0].token);
            }
          } else {
            const randomID = Math.random().toString().slice(2, 11);
            const newToken = tokenGenerator(roomName);
            const insertRow = `insert into agora_token values (${randomID},"${newToken}","${roomName}","${CurrentDate.format()}" )`;
            con.connect(function (err) {
              if (err) throw err;
              con.query(insertRow, function (err, result, fields) {
                if (err) throw err;
              });
            });
            socket.emit("getTokenFromDB", newToken);
          }
        }
      );
    });
  });
  /*-----------------addPlayer-------------------*/
  socket.on("addPlayer", (data) => {
    if (data.socketName2) {
      socket.join(data.roomName);
      playerList[data.roomName] = {
        ...playerList[data.roomName],
        [String(data.socketName2)]: data,
      };
      io.to(data.roomName).emit("addPlayer", playerList[data.roomName]);
    }
  });

  /*-----------------updatePlayer-------------------*/
  socket.on("updatePlayer", (data) => {
    const roomName = data.roomName;
    const socketId = String(data.socketName2);

    if (!playerList[roomName]) {
      playerList[roomName] = {};
    }

    if (!playerList[roomName][socketId]) {
      playerList[roomName][socketId] = {
        position: { x: "", y: "", z: "" },
        rotation: { x: "", y: "", z: "" },
        voiceId: "",
      };
    }

    playerList[roomName][socketId].position = data.position;
    playerList[roomName][socketId].rotation = data.rotation;
    data.voiceId = playerList[roomName][socketId].voiceId;
    socket.to(data.roomName).emit("updatePlayer", data);
  });

  /*-----------------addVoiceId-------------------*/
  socket.on("addVoiceId", (data) => {
    Object.values(playerList[data.roomName]).map((playerItem) => {
      if (playerItem.avtarName === data.avtarName) {
        playerList[data.roomName][playerItem.socketName2] = {
          ...playerItem,
          voiceId: data.voiceId,
        };
        playerVoiceList[data.roomName] = {
          ...playerVoiceList[data.roomName],
          [String(playerItem.socketName2)]: data,
        };
        io.to(data.roomName).emit(
          "addAvtarToSidebar",
          playerVoiceList[data.roomName]
        );
      }
    });
    // console.log('---------------------:',)
    // console.log('playerList:', playerList)
    // console.log('playerVoiceList:', playerVoiceList)
  });

  /*-----------------createEmoji-------------------*/
  socket.on("createEmoji", (data) => {
    socket.to(data.roomName).emit("createEmoji", data);
  });
  /*-----------------disconnect-------------------*/
  function getPlayerBySocketId2(socket_id) {
    for (const [, roomPlayers] of Object.entries(playerList)) {
      for (const [socketId, player] of Object.entries(roomPlayers)) {
        if (player.socket_id === socket_id) {
          delete playerList[player.roomName][player.avtarName];
          return player;
        }
      }
    }
    return null;
  }
  socket.on("disconnect", () => {
    const player = getPlayerBySocketId2(socket.id);
    if (player) {
      socket.broadcast.emit("removePlayer", {
        socketName2: player.avtarName,
      });
    }
  });

  /*-----------------admin-------------------*/
  socket.on("receiveData", () => {
    io.emit("receiveData", playerList);
  });

  socket.on("deletePlayerAdmin", (data) => {
    delete playerList[data.roomName][data.socketName2];
    playerVoiceList.length > 0 &&
      delete playerVoiceList[data.roomName][socket.id];
    io.to(data.roomName).emit("removePlayer", {
      socketName2: data.socketName2,
    });
  });
});
const PORT = process.env.PORT || 3008;
server.listen(PORT, () => {});
