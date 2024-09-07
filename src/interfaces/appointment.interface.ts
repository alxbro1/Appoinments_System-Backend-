export interface Appointment {
    id?: number;
    date: string;
    time: string;
    user: number;
    status?: 'active' | 'cancelled';
}