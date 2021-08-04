import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {sequelize} from './app/models/sequelizeInst';
import role from './app/models/role.model';
import authRoute from './app/routes/auth.routes';
import userRoute from './app/routes/user.routes';
import userRoutes from './app/routes/user.routes';

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get(
    '/',
    (req, res) => {
        res.json({message: 'Welcome to auth app~'})
    }
);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  () => {console.log(`Server is running on port ${PORT}`)},
);

//sequelize.sync();
//change lower code by the upper commented line for production
sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  role.create({
    id: 1,
    name: 'user',
    email: ''
  });
 
  role.create({
    id: 2,
    name: 'moderator',
    email: ''
  });
 
  role.create({
    id: 3,
    name: 'admin',
    email: ''
  });
}

authRoute(app);
userRoutes(app);
