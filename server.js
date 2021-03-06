const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Caremerge Test listening at http://localhost:${port}`)
})
