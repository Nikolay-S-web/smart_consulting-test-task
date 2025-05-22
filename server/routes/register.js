const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const IdentityDocument = require('../models/IdentityDocument');
const WorkInfo = require('../models/WorkInfo');
const generateKey = require('../utils/keyGenerator');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userFullName, userDateOfBirth, userPhone, password, identityDocument, workInfo } = req.body;
    console.log(req.body);

    try {
        const existingUser = await User.findByUserFullName(userFullName);
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже зарегистрирован.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const authKey = generateKey(16);
        const hashedAuthKey = bcrypt.hashSync(authKey, 8);

        const userId = await User.create(userFullName, userDateOfBirth, userPhone, hashedPassword, hashedAuthKey);

        await IdentityDocument.create(
            userId,
            identityDocument.series,
            identityDocument.number,
            identityDocument.issueDate
        );
        await WorkInfo.create(userId, workInfo.companyName, workInfo.phone, workInfo.address);

        res.status(201).json({ message: 'Новый пользователь успешно зарегистрирован!', userFullName });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка регистрации', error });
    }
});

module.exports = router;
