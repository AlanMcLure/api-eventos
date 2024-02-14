import { NextFunction, Request, Response } from "express";
import { Evento } from "../models/Evento.js";
import { User } from "../models/User.js";

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'Bienvenido a la API de la Tienda' });
};

export const getEventos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventos = await Evento.fetchAll();
    res.json({ eventos });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventoById = async (req: Request, res: Response, next: NextFunction) => {
  const eventoId = req.params.eventoId;
  try {
    const evento = await Evento.findById(eventoId);
    if (evento) {
      res.json({ evento });
    } else {
      res.status(404).json({ message: 'Evento no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user as User;
  try {
    const items = await user.getCart();
    res.json({ items });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const postCart = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;
  const eventoId = req.body.eventoId;
  try {
    await user.addToCart(eventoId);
    res.status(201).json({ message: 'Evento añadido al carrito' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    const eventoId = req.body.eventoId;
    try {
      await user.deleteCartItem(eventoId);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export const postCartIncreaseItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    const eventoId = req.body.eventoId;
    try {
      await user.addToCart(eventoId);
      res.status(201).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const postCartDecreaseItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    const eventoId = req.body.eventoId;
    try {
      await user.decreaseCartItem(eventoId);
      res.status(201).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    try {
      const orders = await user.getOrders();
      res.json({ orders });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export const getCheckOut = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user as User;
    try {
      const result = await user.addOrder();
      result 
        ? console.log("Orden añadida: ", result)
        : console.log("Error en la order");
      res.status(204).send();
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Error al procesar la orden" });
    }
  }
  