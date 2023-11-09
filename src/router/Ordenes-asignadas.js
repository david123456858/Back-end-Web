import { Router } from 'express'

import { OrdenAsignada } from '../controllers/Ordenes-asignadas.js'
import { checkRol } from '../Middleware/Ordenes.js'
const path = '/ordenes/Asignadas'

const routerAsignada = Router()

routerAsignada.put(`${path}/:id`, checkRol, OrdenAsignada)

export default routerAsignada
