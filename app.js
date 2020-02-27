const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/test', (req, res) => {
   res.status(200).send('Hola mundo desde ruta');
});

var messages = [{
   id: 1,
   text: '¡Bienvenido a Sela-Chat!',
   nickname: 'SelaBot'
}];

io.on('connection', (socket) => {
   console.log(`El cliente *${socket.handshake.address}* se ha conectado.`);
   socket.emit('messages', messages);
   socket.on('add-message', (data) => {
      messages.push(data);
      io.sockets.emit('messages', messages);
   });
});

server.listen(6677, () => console.log('Server working! http://localhost:6677'));
