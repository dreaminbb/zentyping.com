import express from 'express';
import { type Request, type Response } from 'express';
import morgan from 'morgan'
import cors from 'cors';
import { config } from './config';
import db_class from './module/db'
import code_router from './router/code';
import auth_router from './router/auth'
import path from 'path'
import { verify_token } from './module/auth/jwt';
export const app = express();
const index_file: string = path.join(__dirname, "static", "index.html")


app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'static', 'assets')));


// const allowedOrigins = config.PRODUCTION
//   ? [process.env.SITE_ORIGIN] // 本番環境
//   : ['http://localhost:8000', process.env.SITE_ORIGIN]; // 開発環境


// const corsOptions = {
//   origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//     console.log('Request from origin:', origin);

//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.log('Rejected origin:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   maxAge: 86400
// };

// app.use(cors(corsOptions));
console.log('is production', config.PRODUCTION, 'is jwt auth', config.JTW_AUTH)
// before every request, check request has jwt

app.use((req: Request, res: Response, next: Function) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${req.headers.authorization}`);

  const isAuthRoute = req.url === '/api/auth/token';
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  console.log(token, 'token')
  console.log(req.originalUrl, 'origin')
  console.log(req.url, 'url', '\n\n\n\n\n\n')

  if (req.url === './favicon.ico' || (req.url === '/favicon.ico' || req.url === '/')) {
    console.log('favicon.ico request, skipping auth check');
    return next()
  }

  if (isAuthRoute || (!config.PRODUCTION && !config.JTW_AUTH && token === config.DEV_TOKEN)) {
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

  const message = config.PRODUCTION
    ? 'Unauthorized'
    : 'Unauthorized. Server is in dev mode, only admin access allowed.';
  res.status(401).send(message);
});

// Move CORS middleware to be first in the chain
// * これでdb classの変数にコレクションが追加されたから他のコードからコレクションを使うことができる。
await db_class.init()

app.use('/api/code', code_router);
app.use('/api/auth', auth_router)

app.get('/', (req: Request, res: Response) => {
  console.log(req)
  res.sendFile(index_file) /* html file */
});


app.listen(config.API_HOST_PORT, () => {
  console.log(`Server is running on http://localhost:${config.API_HOST_PORT}`);
});
