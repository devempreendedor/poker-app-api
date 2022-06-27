import 'dotenv/config';
import bodyparser from 'body-parser';
import express, { NextFunction } from 'express';
import cors from 'cors';
import initRouter from '@/routes/router';
import connectDB from '@/database/database';
import createHttpError, { HttpError } from 'http-errors'

const app = express();

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8001);

//OPTIONAL Mongodb
connectDB();
initRouter(app);

app.use((req: any, res: any, next: NextFunction) => {
  next(createHttpError(404))
})

app.use((err: any, req: any, res: any, next: NextFunction) => {
  const { status = 500, message, stack } = err

  res.locals.errorMessage = message

  const response: { status: number; message: string; stack?: string } = {
    status,
    message,
  }

  res.status(status).json(response)
})

app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  console.log('  Press CTRL-C to stop\n');
});
