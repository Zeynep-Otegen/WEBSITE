const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Geçersiz token' });
    }
}; 