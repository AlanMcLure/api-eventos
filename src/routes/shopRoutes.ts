import { Router } from "express";

import { getIndex, getEventos, getEventoById, postCart, getCart, deleteCartItem, postCartDecreaseItem, postCartIncreaseItem, getOrders, getCheckOut } from "../controllers/shopCtrl.js";

export const shopRouter =  Router();

//Usamos get y por lo tanto exige coincidencia "completa", no capa otras rutas
shopRouter.get('/',getIndex);
shopRouter.get('/eventos',getEventos);
shopRouter.get('/eventos/:eventoId',getEventoById);
shopRouter.get('/cart', getCart)
shopRouter.post('/add-to-cart', postCart);
shopRouter.post('/cart-delete-item',deleteCartItem);
shopRouter.post('/cart-increase-item', postCartIncreaseItem);
shopRouter.post('/cart-decrease-item', postCartDecreaseItem);
shopRouter.get('/checkout', getCheckOut);
shopRouter.get('/orders', getOrders);
// shopRouter.get('/saludo', getSaludo);
