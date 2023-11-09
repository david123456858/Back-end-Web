import { Router } from 'express'

import { SaveDatos, getData } from '../controllers/Ordenes.js'
import { checkRol } from '../Middleware/Ordenes.js'

const path = 'ordenes'

const routerOrdenes = Router()

routerOrdenes.get(`/${path}`, checkRol, getData)
routerOrdenes.post(`/${path}/post`, checkRol, SaveDatos)

export default routerOrdenes
