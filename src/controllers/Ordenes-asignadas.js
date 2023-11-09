import mongoose from 'mongoose'

import Ordenes from '../Model/Orden.js'
import { obtenerFecha } from '../helpers/obtenerFecha.js'

const parseId = (id) => {
  return new mongoose.Types.ObjectId(id)
}

export const OrdenAsignada = async (req, res) => {
  const { id } = req.params

  if (Object.entries(req.body).length === 0) {
    res.status(403).json({ data: 'Body invalid' })
    return
  }

  const { idAdmin, idEquipo, estado } = req.body

  try {
    if (req.rol === 'Admin') {
      const ordenDb = await Ordenes.findById({ _id: id })
      if (!ordenDb) {
        return res.status(404).json({ data: 'Invalid Id' })
      }

      const fecha = obtenerFecha()
      const parsedId = parseId(id)
      const data = await Ordenes.findOneAndUpdate(parsedId,
        {
          $set: {
            estado,
            idAdmin,
            idEquipo,
            TimeStar: fecha
          }
        },
        { new: true }
      )

      res.status(200).json(data)
    } else {
      res.status(402).json({ data: 'Errot not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Error Server Imyternal' })
  }
}
