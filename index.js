import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://testapiccccc.netlify.app", // Certifique-se de que este é o URL correto do frontend
    methods: ["GET", "POST"],
  },
});

let contador1 = 0;
let contador2 = 0;

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Envia os contadores iniciais ao cliente ao conectar
  socket.emit('initialCounters', { contador1, contador2 });
  console.log('Contadores iniciais enviados:', { contador1, contador2 });

  // Incrementa contador 1 e emite para todos os clientes
  socket.on('incrementarBotao1', () => {
    contador1 += 1;
    console.log('Contador 1 incrementado:', contador1);
    io.emit('contadorAtualizado', { contador1, contador2 });
  });

  // Incrementa contador 2 e emite para todos os clientes
  socket.on('incrementarBotao2', () => {
    contador2 += 1;
    console.log('Contador 2 incrementado:', contador2);
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
