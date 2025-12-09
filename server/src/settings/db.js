import mysql2 from 'mysql2/promise.js'
import dotenv from 'dotenv'

dotenv.config()

export const myMarketDB = mysql2.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT
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
