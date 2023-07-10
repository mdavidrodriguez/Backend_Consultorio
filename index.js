import express from "express"
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentsRoutes from './routes/appointmentRoutes.js'
import { db } from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/useRoutes.js'

// variables de entorno
dotenv.config()

// configurar la app
const app = express()

app.use(express.json())

// conectar a mongo
db()

// config cors
const whitelist = [process.env.FRONTEND_URL]

if (process.argv[2] === '--postman') {
    whitelist.push(undefined)
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de cors'))
        }
    }
}
app.use(cors(corsOptions))

app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', userRoutes)


// definir puerto
const PORT = process.env.PORT || 4000

// arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El servidor se esta ejecutando en el puerto', PORT))
})

