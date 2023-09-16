import sgMail from '@sendgrid/mail';

// Configura la clave API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export async function sendEmailNewAppointment({ date, time }) {
    const msg = {
        to: 'mdavidmontero6@gmail.com',
        from: 'mdavidrodriguez@unicesar.edu.co',
        subject: "SalonBelleza",
        text: "Salon - Nueva Cita",
        html: `<p>Hola: Rodriguez tienes una nueva Cita </p>
        <p>La cita sera el día: ${date} a las ${time} horas</p>`
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Las otras funciones (sendEmailUpdateAppointment, sendEmailDeleteAppointment) se modifican de manera similar.



export async function sendEmailUpdateAppointment({ date, time }) {
  

    const msg  = {
        to: 'mdavidmontero6@gmail.com',
        from: 'mdavidrodriguez@unicesar.edu.co',
        subject: "SalonBelleza - Cita Actualizada",
        text: "Salon - Cita Actualizada",
        html: `<p>Hola: Rodriguez, un usaurio ha modificado una cita </p>
        <p>La nueva cita sera el día: ${date} a las ${time} horas</p>
        `
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export async function sendEmailDeleteAppointment({ date, time }) {
   
    const msg  = {
        to: 'mdavidmontero6@gmail.com',
        from: 'mdavidrodriguez@unicesar.edu.co',
        subject: "SalonBelleza -  Cita Cancelada",
        text: "Salon - Cita Cancelada",
        html: `<p>Hola: Rodriguez, un Usuario ha cancelado una cita </p>
        <p>La cita fue cancelada el  día: ${date} a las ${time} horas</p>
        `
    };
    try {
        await sgMail.send(msg);
        console.log('Correo de verificación enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo de verificación:', error);
    }

}