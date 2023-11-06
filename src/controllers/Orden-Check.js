import mongoose from 'mongoose'

import Ordenes from '../Model/Orden.js'

const parseId = (id) => {
  return new mongoose.Types.ObjectId(id)
}

export const OrdensCheck = async (req, res) => {
  const { id } = req.params

  const { check } = req.body
  try {
    const parsedId = parseId(id)
    const OrdenDb = await Ordenes.findById({ _id: id })

    if (!OrdenDb) {
      return res.status(404).json({ data: 'Invalid id' })
    }
    const data = await Ordenes.findOneAndUpdate(parsedId, {

      $set: {
        check
      }
    },
    { new: true })

    res.status(206).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Error Server Intenañ' })
  }
}
