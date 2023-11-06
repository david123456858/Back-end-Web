import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

import { connectDB } from './src/database/db.js'
import routerOrdenes from './src/router/Ordenes.js'
import routerAsignada from './src/router/Ordenes-asignadas.js'
import routerRealizadas from './src/router/orden-realizadas.js'
import routerCheck from './src/router/Orden-Check.js'
import eventoRealizado from './src/helpers/events.js'
import infoSocket from './src/Model/informacion.js'

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
app.use(urlencoded({ extended: true }))

let socket = null
const clientesConnects = new Map()
const port = 3000

connectDB()

app.use(routerOrdenes)
app.use(routerAsignada)
app.use(routerRealizadas)
app.use(routerCheck)

app.get('/socket', (req, res) => {
  res.sendFile(process.cwd() + '/Client/index.html')
})

io.on('connection', (clientSocket) => {
  console.log('Cliente conectado')

  socket = clientSocket
  const clientID = socket.id
  console.log(clientesConnects)

  socket.on('id', async (id) => {
    console.log('id front', id)
    clientesConnects.set(clientID, id)

    await infoSocket.create({ idAdmin: id, idSocket: clientID })
  })

  socket.on('disconnect', async () => {
    console.log('se desconecto el usuario')
    const socketAdmin = clientID
    clientesConnects.delete(clientID)
    await infoSocket.findOneAndDelete({ idSocket: socketAdmin })
    socket = null
  })
})

eventoRealizado.on('realizado', async (data) => {
  console.log(data)
  if (socket) {
    const administrador = await infoSocket.findOne({ idAdmin: data.data.idAdmin })

    io.to(administrador?.idSocket).emit('notificacion', { data: data.data })
  }
})

server.listen(port, () => {
  console.log(`listo para utilizar http://localhost:${port}`)
})
