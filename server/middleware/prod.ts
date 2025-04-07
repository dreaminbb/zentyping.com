import { config } from "../config";
import { verify_token } from "../module/auth/jwt";
import { Request, Response } from "express";

class prod_middleware {
                prod_mode(req: Request, res: Response, next: Function) {
                                console.log('hello from prod middleware')
                                const isAuthRoute = req.url === '/api/auth/token';
                                const token = req.headers.authorization?.split(' ')[1] ?? undefined;

                                if (req.url === './favicon.ico' || (req.url === '/favicon.ico' || req.url === '/')) {
                                                console.log('favicon.ico request, skipping auth check');
                                                return next()
                                }

                                if (isAuthRoute || (!config.PRODUCTION && !config.JTW_AUTH)) {
                                                console.log('Skipping auth check for auth route or dev mode');
                                                return next();
                                }

                                if ((config.PRODUCTION || config.JTW_AUTH) && token) {
                                                try {
                                                                const decoded = verify_token(token);
                                                                if (decoded) return next();
                                                } catch (error) {
                                                                console.error('Token verification failed:', error);
                                                }
                                }

                                const message = 'Unauthorized'

                                res.status(401).send(message);
                }
}

export default new prod_middleware();