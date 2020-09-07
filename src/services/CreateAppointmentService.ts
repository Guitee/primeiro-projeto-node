import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRespository from '../repositories/AppointmentsRepository';
// O service não tem acesso a requisiçao e nem a resposta.
// ele tem  acesso ao que ele recebe como dados  e retorna erros se preciso
// Responsavel por regra de negocio do sistema
interface RequestDTO {
    date: Date;
    provider: string;
}

// Dependecy Inversion(Dependencia Externa)
class CreateAppointmentService {
    private appointmentsRepository: AppointmentRespository;

    constructor(appointmentsRepository: AppointmentRespository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
        /*
         *passa agendamento por agendamento e verifica se a parseDate que recebe do usuario
         * é igual ao agendamento que esta pecorrendo. Se for retorna esse appointment
         */
        const sameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (sameDate) {
            throw Error('Esse agendamento ja ta marcado');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
