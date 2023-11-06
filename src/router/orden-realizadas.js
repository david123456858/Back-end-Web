import { Router } from 'express'

import { SaveRealizada } from '../controllers/orden-realizadas.js'

const routerRealizadas = Router()

const path = '/ordenes/realizadas'

routerRealizadas.put(`${path}/:id`, SaveRealizada)

export default routerRealizadas
