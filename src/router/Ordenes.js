import { Router } from 'express'
import { SaveDatos, getData } from '../controllers/Ordenes.js'
const path = 'ordenes'

const routerOrdenes = Router()

routerOrdenes.get(`/${path}`, getData)
routerOrdenes.post(`/${path}/post`, SaveDatos)

export default routerOrdenes
