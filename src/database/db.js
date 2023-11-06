import { connect } from 'mongoose'

const DB = 'mongodb://127.0.0.1:27017/ordenes'
export const connectDB = async () => {
  try {
    await connect(
      DB
    )
  } catch (error) {
    console.log(error)
  }
}
