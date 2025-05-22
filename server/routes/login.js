const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userFullName, password } = req.body;

    try {
        const user = await User.findByUserFullName(userFullName);
        if (!user) {
            return res.status(403).json({ message: 'Пользователь не найден' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.hashedPassword);
        if (!passwordIsValid) {
            return res.status(403).json({ message: 'Неверный пароль' });
        }

        res.status(200).json({ authKey: user.hashedAuthKey, userFullName: user.userFullName });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при входе', error });
    }
});

module.exports = router;
