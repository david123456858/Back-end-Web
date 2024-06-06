import { Schema, model } from 'mongoose'

const infoSocketSchema = new Schema({
  idGrupo: {
    type: String
  },
  prioridad: {
    type: String
  },
  fecha: {
    type: Date
  }
})

const infoSocket = model('infoSocket', infoSocketSchema)

export default infoSocket
