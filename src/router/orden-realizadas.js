import { Router } from 'express'

import { SaveRealizada } from '../controllers/orden-realizadas.js'
import { checkRol } from '../Middleware/Ordenes.js'
const routerRealizadas = Router()

const path = '/ordenes/realizadas'

routerRealizadas.put(`${path}/:id`, checkRol, SaveRealizada)

export default routerRealizadas
