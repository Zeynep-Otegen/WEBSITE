const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// Tüm soruları getirme
router.get('/', async (req, res) => {
    try {
        const { category, tag, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        const questions = await Question.find(query)
            .populate('author', 'username profile.name')
            .sort({ createdAt: -1 });

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Yeni soru oluşturma
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const question = new Question({
            title,
            content,
            category,
            tags,
            author: req.user.userId
        });

        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Soru detayı getirme
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('author', 'username profile.name')
            .populate('answers.author', 'username profile.name');

        if (!question) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }

        // Görüntülenme sayısını artır
        question.views += 1;
        await question.save();

        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Cevap ekleme
router.post('/:id/answers', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }

        question.answers.push({
            content,
            author: req.user.userId
        });

        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

// Cevabı kabul etme
router.put('/:questionId/answers/:answerId/accept', auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);

        if (!question) {
            return res.status(404).json({ message: 'Soru bulunamadı' });
        }

        // Sadece soru sahibi cevabı kabul edebilir
        if (question.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
        }

        const answer = question.answers.id(req.params.answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Cevap bulunamadı' });
        }

        // Diğer tüm cevapları kabul edilmemiş yap
        question.answers.forEach(a => a.isAccepted = false);
        answer.isAccepted = true;

        await question.save();
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
});

module.exports = router; 