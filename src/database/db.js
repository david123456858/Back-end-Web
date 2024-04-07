import { connect } from 'mongoose'

const DB = 'mongodb://localhost:27017/ordenes'
export const connectDB = async () => {
  try {
    await connect(
      DB
    )
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
