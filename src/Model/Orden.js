import { Schema, model } from 'mongoose'

const ordenSchema = Schema({
  idOrder: {
    type: String
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
    default: null
  },
  id_Equipo: {
    type: String
  },
  description: {
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
const Ordenes = model('ordenes', ordenSchema)

export default Ordenes
