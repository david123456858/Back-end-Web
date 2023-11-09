import { VerifyToken } from '../helpers/Tokens-Ordenes.js'

export const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop()
    if (!token) {
      res.status(403).send('Not found token ')
      return
    }
    const decode = await VerifyToken(token)
    if (decode.rol) {
      req.rol = decode.rol
      next()
    }
  } catch (error) {
    console.log('Nada manin tu por aqui no pasas' + error)
  }
}
