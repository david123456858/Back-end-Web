import mongoose from 'mongoose'

import Ordenes from '../Model/Orden.js'
import { obtenerFecha } from '../helpers/obtenerFecha.js'
import eventoRealizado from '../helpers/events.js'

const parseId = (id) => {
  return new mongoose.Types.ObjectId(id)
}

export const SaveRealizada = async (req, res) => {
  const { id } = req.params

  if (Object.entries(req.body).length === 0) {
    res.status(403).json({ data: 'Body invalid' })
    return
  }

  const { description, repuestos, estado } = req.body

  try {
    const fecha = obtenerFecha()
    const parsedId = parseId(id)
    const ordenDb = await Ordenes.findById({ _id: id })

    if (!ordenDb) {
      return res.status(404).json({ data: 'Invalid Id' })
    }

    const data = await Ordenes.findOneAndUpdate(parsedId,
      {
        $set: {
          estado,
          description,
          repuestos,
          TimeFinished: fecha
        }
      },
      { new: true })
    eventoRealizado.emit('realizado', { data })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Error Server Internal' })
  }
}
