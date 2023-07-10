import Appointment from "../models/Appointment.js"

const getUserAppointments = async (req, res) => {
    const { user } = req.params

    // Lineas para que el admin pueda ver la lista de sus pacientes
    // const role = 'user'
    // if (user !== req.user._id.toString() && role !== 'admin') 

    if (user !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const appointments = await Appointment.find({
            user,
            date: {
                $gte: new Date()
            }
        }).populate('services').sort({ date: 'asc' })
        res.json(appointments)
    } catch (error) {

    }
}

export {
    getUserAppointments
}