import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { connectDB } from './src/database/db.js'
import routerOrdenes from './src/router/Ordenes.js'
import { config } from 'dotenv'
// import infoSocket from './src/Model/informacion.js'

config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({
  extended: true
}))

const port = process.env.PORT ?? 3002

connectDB()
  .then(() => {
    console.log('Conectado a la base de datos')
  })

app.use(routerOrdenes)

app.get('/', (req, res) => {
  res.send('Bienvenido a ordenes DevelopWord')
})
// app.get('/socket', (req, res) => {
//   res.sendFile(process.cwd() + '/Client/index.html')
// })

// io.on('connection', (socket) => {
//   let persona = socket.handshake.query.usuario
//   if (persona !== undefined && persona !== null) {
//     persona = JSON.parse(persona)
//     infoSocket.find({
//       idAdmin: persona.id_usuario
//     }).then((notificaciones) => {
//       socket.emit('notificaciones', notificaciones)
//     }).catch((error) => {
//       console.error('Error al obtener notificaciones:', error)
//     })
//   } else {
//     console.log('No hay usuario')
//   }
//   socket.on('nuevaNotificacion', (mensaje) => {
//     const nuevaNotificacion = new infoSocket(mensaje)
//     nuevaNotificacion.save().then(() => {
//       io.emit('nuevaNotificacion', nuevaNotificacion)
//     })
//   })

//   socket.on('disconnect', () => {
//     console.log('Usuario desconectado')
//   })
// })

server.listen(port, () => {
  console.log(`listo para utilizar http://localhost:${port}`)
})
export default io
