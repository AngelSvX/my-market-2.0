import mysql2 from 'mysql2/promise.js'
import dotenv from 'dotenv'

dotenv.config()

export const myMarketDB = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
})

export const testConnection = async () => {
  try {
    const response = myMarketDB.getConnection()
    console.log("Conexión establecida")
  } catch (error) {
    console.error("Sucedió un error con la conexión a la BD")
    console.log(error)
  }
}