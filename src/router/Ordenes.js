import { Router } from 'express'

import { SaveDatos, createToken, getData, updateData, updateChekc, createpetition } from '../controllers/Ordenes.js'

const path = 'ordenes'

const routerOrdenes = Router()

routerOrdenes.get(`/${path}`, getData)
routerOrdenes.post(`/${path}/soli`, createpetition)
routerOrdenes.post(`/${path}/realize`, SaveDatos)// TODO -> para realizar la orden
routerOrdenes.put(`/${path}/finally`, updateData)// TODO -> para finalizar la orden
routerOrdenes.put(`/${path}/check`, updateChekc)// TODO -> mandar a la otra api y eliminar de mongo
routerOrdenes.get(`/${path}/token`, createToken)

export default routerOrdenes
