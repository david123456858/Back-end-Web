import { Schema, model } from 'mongoose'

const ordenSchema = Schema({
  idOrder: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    default: '1'
  },
  prioridad: {
    type: String,
    required: true
  },
  id_Usuario: {
    type: String,
    required: true
  },
  id_Equipo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  TimeFinished: {
    type: String,
    default: null
  },
  TimeInit: {
    type: Date
  },
  check: {
    type: Boolean,
    default: false
  }
})
const Ordenes = model('ordenes', ordenSchema)

export default Ordenes
