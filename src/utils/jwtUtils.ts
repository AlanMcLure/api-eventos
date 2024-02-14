// jwtUtils.ts

import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_aqui', { expiresIn: '1h' });
    return token;
};

export const verifyToken = (token: string): any | null => {
    try {
        const decoded = jwt.verify(token, 'tu_secreto_aqui');
        return decoded;
    } catch (error) {
        return null; // Token inválido
    }
};