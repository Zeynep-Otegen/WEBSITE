const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Kullanıcı profili getirme
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Profil güncelleme
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, bio, interests, education } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        user.profile = {
            ...user.profile,
            name: name || user.profile.name,
            bio: bio || user.profile.bio,
            interests: interests || user.profile.interests,
            education: education || user.profile.education
        };

        await user.save();
        res.json({ message: 'Profil başarıyla güncellendi', user });
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Kullanıcı listesi (sadece admin)
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
        }

        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

module.exports = router; 