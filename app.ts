import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import helpers from './helpers/handlebars';
import { Sequelize } from 'sequelize-typescript';
import { configurePassport } from './config/passportConfig';
import _ from 'lodash'
import routes from './routes'
import session from 'express-session'
import { Configuration } from 'models/configuration';
import passport from 'passport';
import sessionSequelize from 'connect-session-sequelize'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import Handlebars from 'handlebars'

const app = express();
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite',
  models: [path.join(__dirname, 'models')],
  modelMatch: (filename, member) => _.upperFirst(_.camelCase(filename)) === member
});
Configuration.afterSync(() => Configuration.create({}, {ignoreDuplicates: true}).then())
sequelize.sync()

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use("/js", express.static(path.join(__dirname, "node_modules/masonry-layout/dist")));
app.use("/js", express.static(path.join(__dirname, "node_modules/hyperscript.org/dist")));
app.use("/js", express.static(path.join(__dirname, "node_modules/htmx.org/dist")));
app.use("/icons", express.static(path.join(__dirname, "node_modules/@tabler/icons/iconfont")))

app.engine('handlebars', engine({ 
  helpers: helpers,
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

const SequelizeStore = sessionSequelize(session.Store)
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'qoduhb',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false
}))

configurePassport();
app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});