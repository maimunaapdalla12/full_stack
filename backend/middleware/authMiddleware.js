
import JWT from 'jsonwebtoken';
import { jwt_secret } from '../config/config.js';

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(403).send("Access denied, please login.");
    }
  
    try {
      const decoded = JWT.verify(token, jwt_secret);
      req.user = decoded ; 
  
      next();
    } catch (err) {
   
      res.status(401).json({ error: 'Invalid token' });
    }
  }
  
















