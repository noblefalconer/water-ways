
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const locationRouter = require('./routes/locations.router');

const photoRouter = require('./routes/Photos.router');
const reviewRouter = require('./routes/reviews.router');
const reportsRouter = require('./routes/reports.router');

// Body parser middleware
app.use(bodyParser.json({limit: '1 gb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/locations', locationRouter);

app.use('/api/reviews', reviewRouter);
app.use('/api/photo', photoRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/reports', reportsRouter);

//publicly available route for LetsEncrypt Certificate challenge
app.get('/.well-known/acme-challenge/JpaXN9YEdI5mHDusz-iCNtH-WhJbnC7aiPBuuarR8xY', function(req, res) {
  res.send('JpaXN9YEdI5mHDusz-iCNtH-WhJbnC7aiPBuuarR8xY.er-NmTXLrxlKLvzU3LfbdYrBTsHQQ9bsNXz1GBcNAfI');
});

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
