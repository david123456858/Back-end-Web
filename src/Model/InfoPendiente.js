import { Schema, model } from 'mongoose'

const infoPendiente = new Schema({
  idOrder: {
    type: String
  },
  descripcion: {
    type: String
  },
  fecha: {
    type: Date
  }
})

const notificacionOrden = model('OrdenPendiente', infoPendiente)

export default notificacionOrden
