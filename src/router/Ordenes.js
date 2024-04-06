import { Router } from 'express'

import { SaveDatos, createToken, getData } from '../controllers/Ordenes.js'
import { checkRol } from '../Middleware/Ordenes.js'

const path = 'ordenes'

const routerOrdenes = Router()

routerOrdenes.get(`/${path}`, checkRol, getData)
routerOrdenes.post(`/${path}/realizar`, checkRol, SaveDatos)// TODO -> para realizar la orden
routerOrdenes.put(`/${path}/finallly`, checkRol, SaveDatos)// TODO -> para finalizar la orden
routerOrdenes.put(`/${path}/chek`, checkRol, SaveDatos)// TODO -> mandar a la otra api y eliminar de mongo
routerOrdenes.get(`/${path}/token`, createToken)

export default routerOrdenes
