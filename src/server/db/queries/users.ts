import { Query } from '../';

const all = () => Query<{ id: number, email: string, created_at: Date }[]>('SELECT * FROM users');

export default {
    all
}