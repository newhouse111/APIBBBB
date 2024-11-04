import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Coloque o domínio do frontend aqui
    methods: ["GET", "POST"],
  },
});

let contador1 = 0;
let contador2 = 0;

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Envia os contadores iniciais ao cliente ao conectar
  socket.emit('initialCounters', { contador1, contador2 });

  // Incrementa contador 1 e emite para todos os clientes
  socket.on('incrementarBotao1', () => {
    contador1 += 1;
    io.emit('contadorAtualizado', { contador1, contador2 });
  });

  // Incrementa contador 2 e emite para todos os clientes
  socket.on('incrementarBotao2', () => {
    contador2 += 1;
    io.emit('contadorAtualizado', { contador1, contador2 });
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
