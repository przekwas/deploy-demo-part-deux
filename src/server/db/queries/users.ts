import { Query } from '../';

const all = () => Query<{ id: number, email: string, created_at: Date }[]>('SELECT * FROM users ORDER BY created_at DESC');

const insert = (email: string) => Query<{ insertId: number }>('INSERT INTO users (email) VALUE (?)', [email]);

const registered = () => Query<{ count: number }[]>('SELECT COUNT(*) as count FROM users');

export default {
    all,
    insert,
    registered
}