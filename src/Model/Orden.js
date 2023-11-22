import {
  Schema,
  model
} from 'mongoose'

const estadoSchema = new Schema({
  nombre_estado: String,
  id_estado: String
})
const equipoSchema = new Schema({
  id_equipo: String,
  nombre_equipo: String
})

const personaSchema = new Schema({
  nombre: String,
  id_usuario: String
})
const prioridadSchema = new Schema({
  id_prioridad: String,
  nombre_prioridad: String
})

const ordenesMatenimientoSchema = new Schema({
  estado: estadoSchema,
  id_orden: {
    type: String
  },
  descripcion: {
    type: String,
    default: ''
  },
  equipo: equipoSchema,
  comentarios: {
    type: String,
    default: ''
  },
  personas: [personaSchema],
  administrativo: personaSchema,
  hora_incio: Date,
  hora_fin: Date,
  prioridad: prioridadSchema
})

const OrdenesMatenimiento = model('OrdenesMatenimiento', ordenesMatenimientoSchema);

export default OrdenesMatenimiento;