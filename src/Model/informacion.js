import { Schema, model } from 'mongoose'

const infoSocketSchema = new Schema({
  idSocket: {
    type: String
  },
  idUser: {
    type: String
  },
  rol: {
    type: String
  }
})

const infoSocket = model('infoSocket', infoSocketSchema)

export default infoSocket
