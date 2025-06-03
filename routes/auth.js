const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kayıt olma
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Kullanıcı kontrolü
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email veya kullanıcı adı zaten kullanımda' });
        }

        // Yeni kullanıcı oluşturma
        const user = new User({
            username,
            email,
            password,
            role: role || 'student'
        });

        await user.save();

        // JWT token oluşturma
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'gizli-anahtar',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Giriş yapma
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı kontrolü
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre' });
        }

        // Şifre kontrolü
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre' });
        }

        // JWT token oluşturma
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'gizli-anahtar',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Giriş başarılı',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

module.exports = router; 