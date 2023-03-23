const express = require('express') 
const bodyParser = require('body-parser')
var path = require('path')
const http = require('http')
const cookieParser = require("cookie-parser")
const sessions = require('express-session');
var recepientreg = require('./routes/recepientreg.js');
//var donorreg = require('./routes/donorreg.js');
var recepientlog = require('./routes/recepientlog.js');
var recepientform = require('./routes/recepientform.js');
var adminlog = require('./routes/adminlog.js');
var admindash = require('./routes/admindash.js');
//var instlog = require('./bb_inst_login.js');


var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static('public'))
app.use('/images', express.static(__dirname + '/images'))

//session middleware
app.use(sessions({
  secret: "thisismysecrctekey",
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  resave: false
}))

const hostname = '127.0.0.1'
const port = 3000

app.get('/', (req,res) => {
    res.render('main')
})

app.get('/recepientreg', (req,res) => {
  res.render('recepientreg')
  console.log("Recepient reg page")
})

app.post('/recepientreg', (req,res) => {
  recepientreg(req,res)
})

app.get('/failreg', (req,res) => {
  res.render('failreg')
  console.log("Recepient Fail reg page")
})

// app.get('/donorreg', (req,res) => {
//   res.render('donorreg')
//   console.log("Donor reg page")
// })

// app.post('/donorreg', (req,res) => {
//   donorreg(req,res)
// })

app.get('/recepientlog', (req,res) => {
  res.render('recepientlog')
  console.log("Recepient login page")
})

app.post('/recepientlog', (req,res) => {
  recepientlog(req,res)
})

app.get('/recepientform', (req,res) => {
  res.render('recepientform')
  console.log("Recepient Form page")
})

app.post('/recepientform', (req,res) => {
  recepientform(req,res)
})

app.get('/adminlog', (req,res) => {
  res.render('adminlog')
  console.log("Admin login page")
})

app.post('/adminlog', (req,res) => {
  adminlog(req,res)
})

app.get('/whoweare', (req,res) => {
  res.render('whoweare')
})

app.get('/missionvision', (req,res) => {
  res.render('missionvision')
})

app.get('/workplan', (req,res) => {
  res.render('workplan')
})

app.get('/willingtodonate', (req,res) => {
  res.render('willingtodonate')
})

app.get('/eligibledonor', (req,res) => {
  res.render('eligibledonor')
})

app.get('/ttkdonor', (req,res) => {
  res.render('ttkdonor')
})

app.get('/ttkrecepient', (req,res) => {
  res.render('ttkrecepient')
})

app.get('/opcfind', (req,res) => {
  res.render('opcfind')
  console.log("OPC Find page")
})

app.get('/opc', (req,res) => {
  res.render('opc')
})

app.get('/opclink', (req,res) => {
  res.render('opclink')
})
// app.get('/bb_inst_login', (req,res) => {
//   res.render('bb_inst_login')
// })

// app.post('/bb_inst_login', (req,res) => {
//   instlog(req,res)
// })

app.get('/recepientdash', (req, res) => {
  const con = require('./connection.js')
  
  con.query('SELECT * from recepientreg LEFT JOIN recepientform ON recepientreg.id = recepientform.id', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('recepientdash', { data: '' })
    } else {
      res.render('recepientdash', { data: rows })
    }
  })
  // recepientdash(req,res)
  console.log("Recepient Dashboard Page")
})

app.get('/admindash', (req, res) => {
  const con = require('./connection.js')
  var headinginit = "Kidney Recepient Waiting List";
  
  con.query('SELECT * from recepientreg LEFT JOIN recepientform ON recepientreg.id = recepientform.id', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('admindash', { data: '', heading: headinginit })
    } else {
      res.render('admindash', { data: rows, heading: headinginit })
    }
  })
  // recepientdash(req,res)
  console.log("Admin Dashboard Page")
})

app.post('/admindash', (req, res) => {
  admindash(req,res)
})

app.get('/terms', (req,res) => {
  res.render('terms')
  console.log("Terms page")
})

// app.get('/bb_inst_port', (req, res) => {
//   // req.session.destroy();
//   res.render('bb_inst_port');
//   console.log("Institution need to be approved!")
// })

app.get('/logout', (req, res) => {
  // req.session.destroy();
  res.render('main');
})


// app.get('/bb_map', (req, res) => {
//   // req.session.destroy();
//   res.redirect('bb_map');
// })

// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!")
// })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

module.exports = app;