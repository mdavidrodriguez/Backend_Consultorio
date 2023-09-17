import express from "express"
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentsRoutes from './routes/appointmentRoutes.js'
import { db } from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import morganBody from 'morgan-body';
import { loggerStream } from './utils/handleLogger.js'
import userRoutes from './routes/useRoutes.js'
import axios from "axios";


// variables de entorno
dotenv.config()

// configurar la app
const app = express()

const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json())

// conectar a mongo
db()
// services
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);


morganBody(app, {
  noColors: true,
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: loggerStream,


});
async function enviarMensajeTelegram(message) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHATID,
        text: message,
      }
    );
    // console.log("Mensaje enviado a Telegram:", response.data);
  } catch (error) {
    // console.error("Error al enviar el mensaje a Telegram:", error);
    console.log(error);
  }
}
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const status = res.statusCode;
  const mensaje = `nSolicitud:\nMétodo: ${method}\nURL: ${url}\n\nRespuesta:\nCódigo de estado: ${status}`;

  enviarMensajeTelegram(mensaje);
  next();
});

app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', userRoutes)


// definir puerto
const PORT = process.env.PORT || 4000;

// arrancar la app
// if (NODE_ENV !== 'test') {
//   app.listen(PORT)
// }
app.listen(PORT, () => {
  console.log(colors.blue.bgMagenta.bold('El servidor se esta ejecutando en el puerto', PORT))
})

// export default app