import axios from 'axios'
import Ordenes from '../Model/Orden.js'
import { tokenSing } from '../helpers/Tokens-Ordenes.js'
import { adminsSocket } from '../../app.js'
import notificacionOrden from '../Model/InfoPendiente.js'

export const getData = async (req, res) => {
  try {
    const data = await Ordenes.find()

    if (req.rol === 'admin' || req.rol === 'operario') {
      res.status(200).json(data)
    } else {
      res.status(402).json({ data: ' No tienes acceso a esta informacion' })
    }
  } catch (error) {
    console.log('mira lo que es ' + error)
    res.status(500).json({ data: 'Error Server Internal' })
  }
}
export const createpetition = async (req, res) => {
  try {
    const { idOrden, descripcion } = req.body
    if (!idOrden || !descripcion) {
      res.status(422).json({ error: 'Faltan algunos datos' })
      return
    }
    const peticion = {
      idOrder: idOrden,
      descripcion
    }
    const response = await notificacionOrden.create(peticion)
    res.status(202).json({ data: 'Se a guardado temporalmente' })
    // revisar esto
    console.log(response)
    if (adminsSocket.length !== 0) {
      adminsSocket.forEach(socket => {
        socket.emit('chat message', response)
      })
    }
  } catch (error) {
    res.status(505).json({ data: 'Error internal server' })
  }
}
export const SaveDatos = async (req, res) => {
  try {
    const { prioridad, idEquipo, idUser, idOrder, description } = req.body
    if (!prioridad || !idEquipo || !idUser || !idOrder || !description) {
      return res.status(422).json({ data: 'Algunos datos de orden faltan' })
    }
    const seach = await Ordenes.findOne({ idOrder })
    console.log(seach)
    if (seach) return res.status(409).json({ data: 'Esta orden ya existe' })
    const orden = {
      idOrder,
      estado: 'Pediente',
      prioridad,
      id_Usuario: idUser,
      id_Equipo: idEquipo,
      description,
      TimeFinished: null,
      TimeInit: Date.now(),
      check: false
    }
    const ordenCreate = await Ordenes.create(orden)
    res.status(201).json(ordenCreate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Server internal' })
  }
}
export const createToken = async (req, res) => {
  try {
    const users = {
      rol: 'operario'
    }
    const user = await tokenSing(users)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Server internal' })
  }
}

export const updateData = async (req, res) => {
  // quiero acuatlizar el estado de la orden
  try {
    const { idOrder } = req.body
    const updateOperation = {
      $set: { estado: 'Chequear', TimeFinished: Date.now() }
    }
    if (!idOrder) return res.status(422).json({ data: 'Unprocessable Content' })
    const update = await Ordenes.findOneAndUpdate({ idOrder }, updateOperation)
    console.log(update)
    res.status(200).json('Se actualizo correctamente la orden')
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Server internal' })
  }
}

export const updateChekc = async (req, res) => {
  try {
    const url = 'http://localhost:3001/api/v1/ordenes/save'

    const { idOrder, check, idEquipo } = req.body
    if (!idOrder || !check) return res.status(422).json({ data: 'Unprocessable Content' })
    if (check === 'true') {
      const registerDelete = await Ordenes.findOneAndDelete({ idOrder })
      console.log(registerDelete)
      const response = await axios.post(url, registerDelete)
      console.log(response)
      res.status(200).json('se elimino correctamente la orden')
    } else if (check === 'false') {
      if (!idEquipo) return res.status(422).json({ data: 'Unprocessable Content' })
      const updateOperation = {
        $set: {
          check: false,
          estado: '1',
          description: null,
          id_Equipo: idEquipo
        }
      }
      const update = await Ordenes.findOneAndUpdate({ idOrder }, updateOperation)
      console.log(update)
      res.status(200).json('Se actualizo correctamente la orden')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      data: {
        info: 'Server internal',
        detail: error
      }
    })
  }
}
