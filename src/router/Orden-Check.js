import { Router } from 'express'

import { OrdensCheck } from '../controllers/Orden-Check.js'

const routerCheck = Router()

const path = '/check'

routerCheck.put(`${path}/:id`, OrdensCheck)

export default routerCheck
