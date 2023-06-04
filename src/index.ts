import app from './server.js';
import { config } from 'dotenv';

config()

app.listen(process.env.PORT, () => {
  console.log('Running on port ' + process.env.PORT);
});
