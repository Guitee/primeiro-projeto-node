import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
const appointmentsRouter = Router();

const appointmentRespository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRespository.all();

    return response.json(appointments);
});

// n precisa passar a rota appointments  pois ja pe definida  no index
appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRespository,
        );

        const appointment = createAppointment.execute({
            date: parseDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
