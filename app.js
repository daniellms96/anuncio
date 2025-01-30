const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const preferencia = req.cookies.preferencia || null;
  res.render('index', { preferencia });
});

app.post('/anuncio', (req, res) => {
  const { preferencia } = req.body;
  res.cookie('preferencia', preferencia, { maxAge: 60000 });
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
