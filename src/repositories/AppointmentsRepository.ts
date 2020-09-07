import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// o repositorio sera  responsavel  por fazer as operaçoes com o banco de dados (listar deletar ..)
// realizaar as operaçoes em cima dos dados

// DTO -  Data Transfer Object

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findDate || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
