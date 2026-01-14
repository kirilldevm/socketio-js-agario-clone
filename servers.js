const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const socketio = require('socket.io');

const URL = process.env.URL || 'http://localhost:9000';
const io = socketio(expressServer, {
  cors: {
    origin: [URL],
    credentials: true,
  },
});
const { instrument } = require('@socket.io/admin-ui');
// const bcrypt = require('bcrypt');

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash('adminui', salt, function(err, hash) {
//         // Store hash in your password DB.
//         console.log(hash)
//     });
// });

instrument(io, {
  auth: {
    type: 'basic',
    username: 'admin',
    password: '$2b$10$6/Cu3ozK3ECwVDwt5hXLruraFb9V8yy/zglypGbuxaelWN5GboHPy', // "changeit" encrypted with bcrypt
  },
  mode: 'development',
});

module.exports = {
  app,
  io,
};
