function recepientform(req,res) {
    const con = require('../connection.js')

    console.log("Recepient form post")
    var Gender = req.body.Gender
    var Age = req.body.Age
    var Bloodgroup = req.body.Bloodgrp
    var Healthcond = req.body.Healthcond
    var Height = req.body.Height
    var Weight = req.body.Weight
    var Bmi = req.body.Bmi
    var Area = req.body.Areacity
    var Address = req.body.Address
    var Mobilenum = req.body.Mobnum
    var Epts = req.body.Epts
    var Hlaa1 = req.body.rhla_a1
    var Hlaa2 = req.body.rhla_a2
    var Hlab1 = req.body.rhla_b1
    var Hlab2 = req.body.rhla_b2
    var Hladr1 = req.body.rhla_dr1
    var Hladr2 = req.body.rhla_dr2

    console.log(Area) 

      function userPage(){
        res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>IKAS</title>
                <link rel="icon" type="image/x-icon" href="/images/nbbicon.ico">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> 
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <style>
                 @media all and (min-width: 992px) {
	    .navbar .dropdown-menu-end{ right:0; left: auto;  }
	    .navbar .nav-item .dropdown-menu{  display:block; opacity: 0;  visibility: hidden; transition:.3s; margin-top:0;  }
	    .navbar .nav-item:hover .nav-link{ color: black;  }
	    .navbar .dropdown-menu.fade-down{ top:80%; transform: rotateX(-75deg); transform-origin: 0% 0%; }
	    .navbar .dropdown-menu.fade-up{ top:180%;  }
	    .navbar .nav-item:hover .dropdown-menu{ transition: .3s; opacity:1; visibility:visible; top:100%; transform: rotateX(0deg); }
      }	

      .nav-link {
        font-family:Verdana, sans-serif;
        font-size: 20px;
        font-weight: 500;
      }
      .navbar-brand {
        font-family: Georgia;
        font-size: 30px;
        font-weight: 500;
      }
      .dropdown-item {
        font-family: Georgia;
        font-size: 18px;
        font-weight: 300;
      }
      </style>
    </head>
    <body style="background-color: rgb(197, 234, 237)">
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">I K A S</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  <i> <b>About Us</b></i>  </a>
              <ul class="dropdown-menu fade-up">
              <li><a class="dropdown-item text-primary" href="#"> Who we are?</a></li>
              <li><a class="dropdown-item text-primary" href="#"> Our Mission & Vision</a></li>
              <li><a class="dropdown-item text-primary" href="#"> Our Work plan & Methodologies </a></li>
              </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  <i>Our <b>PIONEERS</b></i>  </a>
              <ul class="dropdown-menu fade-up">
              <li><a class="dropdown-item text-primary" href="https://www.hrsa.gov/"> HRSA</a></li>
              <li><a class="dropdown-item text-primary" href="https://www.kidneyregistry.org/"> NKR </a></li>
              <li><a class="dropdown-item text-primary" href="https://www.kidney.org/"> NKF </a></li>
              </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  <i>For <b>DONORS</b></i>  </a>
              <ul class="dropdown-menu fade-up">
              <li><a class="dropdown-item text-primary" href="#"> I am willing to donate</a></li>
              <li><a class="dropdown-item text-primary" href="#">  Am I an eligible Donor? </a></li>
              <li><a class="dropdown-item text-primary" href="#"> Things To Know </a></li>
              </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  <i>For <b>RECEPIENTS</b></i>  </a>
              <ul class="dropdown-menu fade-up">
              <li><a class="dropdown-item text-primary" href="#">I need a Kidney </a></li>
              <li><a class="dropdown-item text-primary" href="#"> Recepient Login  </a></li>
              <li><a class="dropdown-item text-primary" href="#">Things To Know </a></li>
              </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">  <i>For <b>CENTERS</b></i>  </a>
              <ul class="dropdown-menu fade-up">
              <li><a class="dropdown-item text-primary" href="#">Find Your Nearest OPC</a></li>
              <li><a class="dropdown-item text-primary" href="#">What is OPC? </a></li>
              <li><a class="dropdown-item text-primary" href="#">Donor->OPC->Recepient</a></li>
              </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact"><i><b>Contact us</b></i></a>
          </li>
        </ul>
      </div>
      </div>
    </nav>

    <main class="container mt-4">
          
        <section id="home">
        <div>
          <h1 style="font-family: Georgia;"><b>I K A S</b></h1> <h3 style="font-family: Georgia;"><i>A Cure for the Needy</i></h3>
                <p style="font-family: Georgia;">Save a life after life and a second chance is in your hands.</p>
        </div>
        <div>
          <h2><b>You have been added to the waiting list successfully. We will reach you shortly when there is a right match for you.</b></h2>
          <br>
          <a class="btn btn-primary" style="font-family: Verdana; font-weight: 600;" href="recepientdash" role="button" target="_self">Your Dashboard</a>
        </div>
        </section>
      </main>
    </body>
    </html>
    `)
            }
            var sql = `INSERT INTO recepientform (gender, age, bloodgroup, healthcondition, height, weight, bmi, area, address, mobilenum, epts, rhla_a1, rhla_a2, rhla_b1, rhla_b2, rhla_dr1, rhla_dr2) VALUES ("${Gender}","${Age}","${Bloodgroup}","${Healthcond}","${Height}","${Weight}","${Bmi}","${Area}","${Address}","${Mobilenum}","${Epts}","${Hlaa1}","${Hlaa2}","${Hlab1}","${Hlab2}","${Hladr1}","${Hladr2}")`
            con.query(sql, function (err, result) {
                if (err){
                    console.log(err);
                }else{
                    // using userPage function for creating user page
                    userPage();
                };
            });
      

//     var sql = `INSERT INTO recepientreg (fullname, email, password) VALUES ("${Name}","${Email}","${Password}")`
//     con.query(sql, function (err, result) {
//       if (err) { 
//         console.error('Error in sql query:' + Query + ' Err', err)
//         throw err
//       }
//       console.log("1 record inserted")
// })
// res.redirect('/recepientlog')
}

module.exports = recepientform