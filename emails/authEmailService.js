import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Enviar email
    const info = await transporter.sendMail({
        from: 'Salon de belleza <salonTurbo@gmail.com>',
        to: email,
        subject: "SalonBelleza",
        text: "Salon - Confirmar Cuenta",
        html: `<p>Hola: ${name}, confirma tu cuenta en Salón de Belleza TURBO </p>
        <p>Tu cuenta esta casi lista, solo debes confirmar en el siguiente enlace</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puede omitir este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)

}
