import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
export const VerifyToken = async (tokens) => {
  try {
    return jwt.verify(tokens, process.env.PASSWORD_TOKENS)
  } catch (error) {
    return console.log('Algo paso y es esto ' + error)
  }
}
export const tokenSing = async (user) => {
  return jwt.sign(
    {
      rol: user.rol
    }, process.env.PASSWORD_TOKENS,
    {
      expiresIn: '12h'
    }
  )
}
