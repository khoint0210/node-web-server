const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000 ;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
 var now = new Date().toString();

 console.log(`${now}: ${req.method} , this user has ip${req.ip} , This user is in ${req.originalUrl}  `);
  next()
});

app.use((req, res, next) => {
  res.render('message.hbs')
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/', (req, res) => {
  // res.send('<h1>hello express!</h1>');
res.render('home.hbs',{
  pageTitle: 'Home page',
  wellcomeMessage: 'Welcom to my website'
    })
  });

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
});

app.get('/help',(req, res) => {
  res.render('help.hbs', {
    pageTitle: 'Help page'
  })
});


app.get('/bad', (req, res) => {
    res.send({
      errorMessage:'Unable handler connection'
    }
   )
  });

app.listen(port, () => {
  console.log(`server is up on port ${port} ` );
});
