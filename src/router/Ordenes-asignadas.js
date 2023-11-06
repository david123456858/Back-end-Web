import { Router } from 'express'

import { OrdenAsignada } from '../controllers/Ordenes-asignadas.js'

const path = '/ordenes/Asignadas'

const routerAsignada = Router()

routerAsignada.put(`${path}/:id`, OrdenAsignada)

export default routerAsignada
