// authCtrl.ts

import { NextFunction, Request, Response } from 'express';
import { generateToken, verifyToken } from '../utils/jwtUtils.js';
import { authenticateUser } from '../services/authService.js';
import { User } from '../models/User.js';

interface CustomRequest<T = Record<string, any>> extends Request {
    user?: User; // Define la propiedad 'user' de tipo 'User'
  }

export const login = async (req: Request, res: Response) => {
    try {
        // Lógica para autenticar al usuario
        const user = await authenticateUser(req.body.username, req.body.password);

        // Si las credenciales son válidas, generar token JWT
        if (user) {
            const token = generateToken(user);
            res.json({ message: 'Autenticación exitosa', token });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(500).send('Error de autenticación');
    }
};

export const logout = (req: Request, res: Response) => {
    // Cerrar la sesión del usuario destruyendo la sesión
    req.session.destroy((err) => {
        if (err) {
            // Si hay un error al destruir la sesión, responder con un mensaje de error
            res.status(500).json({ error: 'Error al cerrar sesión' });
        } else {
            // Si la sesión se destruye correctamente, responder con un mensaje de éxito
            res.status(200).json({ message: 'Sesión cerrada exitosamente' });
        }
    });
};

export const verifyAuthToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado de autorización
    if (token) {
        const decodedToken = verifyToken(token); // Verifica el token JWT
        if (decodedToken) {
            // Si el token es válido, adjunta la información del usuario al objeto de solicitud (req)
            req.user = decodedToken.userId;
            next(); // Continúa con el siguiente middleware o controlador
        } else {
            res.status(401).json({ error: 'Token inválido' });
        }
    } else {
        res.status(401).json({ error: 'Token de autorización no proporcionado' });
    }
};