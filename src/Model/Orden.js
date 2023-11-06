import { Schema, model } from 'mongoose'

const ordenSchema = Schema({
  estado: {
    type: String,
    default: '1'
  },
  prioridad: {
    type: String,
    required: true
  },
  idAdmin: {
    type: String,
    default: null
  },
  idEquipo: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  repuestos: {
    type: String,
    default: null
  },
  TimeStar: {
    type: String,
    default: null
  },
  TimeFinished: {
    type: String,
    default: null
  },
  check: {
    type: Boolean,
    default: false
  }
})
const Ordenes = model('orden', ordenSchema)

export default Ordenes
