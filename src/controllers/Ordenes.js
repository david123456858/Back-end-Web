import { Axios } from 'axios'
import Ordenes from '../Model/Orden.js'
import { tokenSing } from '../helpers/Tokens-Ordenes.js'

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

export const SaveDatos = async (req, res) => {
  try {
    const { estado, prioridad, idEquipo, idUser, idOrder, description } = req.body
    const ordenPriodidad = {
      alta: '1',
      media: '2',
      baja: '3'
    }
    if (!estado || !prioridad || !idEquipo || !idUser || !idOrder || !description) {
      return res.status(422).json({ data: 'Algunos datos de orden faltan' })
    }
    const orden = {
      idOrder,
      estado,
      prioridad: ordenPriodidad[prioridad],
      id_Usuario: idUser,
      id_Equipo: idEquipo,
      description,
      TimeFinished: null,
      check: false
    }
    if (req.rol === 'admin' || req.rol === 'operario') {
      const ordenCreate = await Ordenes.create(orden)
      res.status(201).json(ordenCreate)
    } else {
      res.status(402).json({ data: ' No tienes acceso a esta ruta' })
    }
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
    const { idOrder, estado, description } = req.body
    const updateOperation = {
      $set: { estado, TimeFinished: Date.now() }
    }
    if (!idOrder || !estado || !description) return res.status(422).json({ data: 'Unprocessable Content' })
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
      const response = await Axios.post(url, registerDelete)
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
