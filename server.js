const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log('server is running');
});

app.get('/', (req, res) => {
  res.send('server is runing');
});

const msgBoard = [];
const msgBoardSize = 30;

io.on('connection', (client) => {
  console.log('conected user: ', new Date().toJSON().slice(0, 16).replace(/[-T]/g, '  '));
  client.emit('chat', msgBoard.slice(-msgBoardSize));

  client.on('chatMessage', (msgNew) => {
    msgBoard.push(msgNew);
    client.emit('chat', msgBoard.slice(-msgBoardSize));
    client.broadcast.emit('chat', msgBoard.slice(-msgBoardSize));
  });
});
