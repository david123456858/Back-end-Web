import { Router } from 'express'

import { OrdensCheck } from '../controllers/Orden-Check.js'
import { checkRol } from '../Middleware/Ordenes.js'

const routerCheck = Router()

const path = '/check'

routerCheck.put(`${path}/:id`, checkRol, OrdensCheck)

export default routerCheck
