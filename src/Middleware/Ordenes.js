import { VerifyToken } from '../helpers/Tokens-Ordenes.js'

export const checkRol = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      return res.status(403).send('Not found token ')
    }
    const token = authorization.split(' ').pop()

    const decode = await VerifyToken(token)
    req.rol = decode.rol ? decode.rol : undefined
    next()
  } catch (error) {
    console.log('aquí esta el problema' + error)
    res.status(500).send('Error del sistema')
  }
}
