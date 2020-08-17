import * as express from 'express';
import db from '../db';

const router = express.Router();

router.get('/count', async (req, res, next) => {
    try {
        const [count] = await db.users.registered();
        res.json(count);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'i suck lol', error });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await db.users.all();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'i suck lol', error });
    }
});

router.post('/', async (req, res, next) => {
    const newUser = req.body;
    try {
        const { insertId: id } = await db.users.insert(newUser.email);
        res.json({ id, msg: 'user registered like an idiot lol' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'i suck lol', error });
    }
});

export default router;