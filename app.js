import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { connectDB } from './src/database/db.js'
import routerOrdenes from './src/router/Ordenes.js'
import { config } from 'dotenv'
// import infoSocket from './src/Model/informacion.js'
import notificacionOrden from './src/Model/InfoPendiente.js'
import Ordenes from './src/Model/Orden.js'

config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
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
app.get('/socket', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})
app.get('/socket/ope', (req, res) => {
  res.sendFile(process.cwd() + '/client/index1.html')
})

export const opertSocket = []
export const adminsSocket = []
io.on('connection', async (socket) => {
  const persona = socket.handshake.query
  console.log('Se conecto')
  console.log(persona.rol)
  if (persona.rol === 'administrador') {
    adminsSocket.push(socket)
    const infoP = await notificacionOrden.find()
    infoP.forEach(element => {
      socket.emit('chat message', {
        idOrder: element.idOrder,
        desc: element.descripcion,
        _id: element._id
      })
    })
  }
  if (persona.rol === 'operario') {
    opertSocket.push(socket)
    const infoP = await Ordenes.find({ id_Equipo: { $eq: persona.idGrupo } }) // $eq es para buscar con condicione especificas
    infoP.forEach(elemento => {
      socket.emit('chat message', elemento)
    })
  }
  socket.on('acepte', async (info) => {
    console.log(info)
    await notificacionOrden.findByIdAndDelete(info.idNoti)
    console.log('Se borro la vainass')
  })
  socket.on('cancele', async (info) => {
    await notificacionOrden.findByIdAndDelete(info)
    console.log('Se cancelo la orden')
  })
  socket.on('disconnect', () => {
    console.log('Se desconceto el mmguevo')
  })
})

server.listen(port, () => {
  console.log(`listo para utilizar http://localhost:${port}`)
})
export default io
