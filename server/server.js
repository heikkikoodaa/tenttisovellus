const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const { isAdmin } = require('./middlewares/isAdmin');
const { verifyToken } = require('./middlewares/verifyToken');

const port = process.env.PORT || 3001;

//Import routes
const tenttiRoute = require('./routes/tentit');
const kayttajaRoute = require('./routes/kayttajat');
const kysymysRoute = require('./routes/kysymykset');
const vastausRoute = require('./routes/vastaukset');
const loginRoute = require('./routes/login');
const tokenRoute = require('./routes/token');
const adminRoute = require('./routes/admin');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
// app.set('etag', false); // turn off

app.use('/tentit', tenttiRoute);
app.use('/kysymykset', kysymysRoute);
app.use('/kayttajat', kayttajaRoute);
app.use('/vastaukset', vastausRoute);
app.use('/login', loginRoute);
app.use('/token', tokenRoute);
app.use('/admin', verifyToken, isAdmin, adminRoute);

app.get('/', (req, res) => {
  res.send('You arrived to the root route. Nothing to see here!');
});

https
  .createServer(
    {
      key: fs.readFileSync('./server/cert/server.key'),
      cert: fs.readFileSync('./server/cert/server.crt'),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
