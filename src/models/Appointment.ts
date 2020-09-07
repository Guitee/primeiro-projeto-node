import { uuid } from 'uuidv4';

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        // o OMit remove o id
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
