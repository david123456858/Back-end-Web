import { Schema, model } from 'mongoose'

const infoPendiente = new Schema({
  idOrder: {
    type: String
  },
  descripcion: {
    type: String
  }
})

const notificacionOrden = model('OrdenPendiente', infoPendiente)

export default notificacionOrden
