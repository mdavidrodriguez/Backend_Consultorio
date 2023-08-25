import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    const msg = {
        to: email,  // Destinatario del correo
        from: 'mdavidrodriguez@unicesar.edu.co',  // Remitente del correo (debe ser una dirección verificada en SendGrid)
        subject: "SalonBelleza",
        text: "Salon - Confirmar Cuenta",
        html: `<p>Hola: ${name}, confirma tu cuenta en Consultorio del Dr. Juan Velázquez </p>
        <p>Tu cuenta esta casi lista, solo debes confirmar en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
        <p>Si tú no creaste esta cuenta, puedes omitir este mensaje</p>`
    };

    try {
        await sgMail.send(msg);
        console.log('Correo de verificación enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo de verificación:', error);
    }

}


export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Enviar email
    const info = await transporter.sendMail({
        from: 'Consultorio del Dr. Juan Velázquez ! <salonTurbo@gmail.com>',
        to: email,
        subject: "SalonBelleza -  Restablece tu Passsword",
        text: "Salon - Restablece tu Passsword",
        html: `<p>Hola: ${name}, Has solicitado restablecer tu Password </p>
        <p>sigue el siguiente enlace para generar un nuevo password: </p>
        <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer Password</a>
        <p>Si tu no soliciatste esto, puedes omitir este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)

}
