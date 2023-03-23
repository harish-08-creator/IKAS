function admindash(req,res) {
  const con = require('../connection.js')
  var Donor_id = req.body.donorid;
  var headingfinal = "Matched Recepient List";
  var match_id = [];
  var sql='';
  console.log(Donor_id)

  con.query('SELECT * FROM donorform WHERE id = ?', Donor_id, function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('adminfdash', { data: '',datas:'', heading: headingfinal })
    } else {
      // res.render('admindash', { data: rows, heading: headingfinal })
      if (rows[0].bmi < 35) {
          
        if (rows[0].bloodgroup == "A") {
          sql = 'SELECT * from recepientform where bloodgroup IN ("A","AB")'
        }
        else if (rows[0].bloodgroup == "B") {
          sql = 'SELECT * from recepientform where bloodgroup IN ("B","AB")'
        }
        else if (rows[0].bloodgroup == "AB") {
          sql = 'SELECT * from recepientform where bloodgroup IN ("AB")'
        }
        else {
          sql = 'SELECT * from recepientform where bloodgroup IN ("A","B","AB","O")'
        }

          con.query(sql, function (err, rows_a) {
            if (err) {
              req.flash('error', err)
              res.render('adminfdash', { data: '', datas: '', heading: headingfinal })
            } else {
              // res.render('recepientdash', { data: rows, heading: headinginit })
              for(var i=0; i< rows_a.length; i++) {
                  var count = 0;
                  if (rows_a[i].rhla_a1 == rows[0].rhla_a1) 
                      count++
                  if (rows_a[i].rhla_a2 == rows[0].rhla_a2) 
                      count++ 
                  if (rows_a[i].rhla_b1 == rows[0].rhla_b1) 
                      count++
                  if (rows_a[i].rhla_b2 == rows[0].rhla_b2) 
                      count++
                  if (rows_a[i].rhla_dr1 == rows[0].rhla_dr1) 
                      count++
                  if (rows_a[i].rhla_dr2 == rows[0].rhla_dr2) 
                      count++
                  if (count >= 3) {
                      match_id.push(rows_a[i].id)
                  }
              }

              con.query('SELECT * from recepientreg LEFT JOIN recepientform ON recepientreg.id = recepientform.id where recepientform.id IN (?)', [match_id], function (err, rows_b) {
                if (err) {
                  req.flash('error', err)
                  res.render('adminfdash', { data: '', datas: '', heading: headingfinal })
                } else {
                  // res.render('adminfdash', { data: rows_b, heading: headingfinal })
                  con.query('SELECT id from recepientform where healthcondition ="Urgency" AND id IN (?)', [match_id], function (err, rows_c) {
                    var countu = rows_c.length;
                    console.log(countu);
                    if (countu == 1) {
                      //urgency=1
                      con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where healthcondition ="Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_d) { 
                      res.render('adminfdash', { data: rows_b, datas: rows_d, heading: headingfinal })
                      })  
                    } 
                    else if(countu >1) {
                      //urgency>1
                      con.query('SELECT id from recepientform where epts <20 AND healthcondition="Urgency" AND id IN (?)', [match_id], function (err, rows_e) {
                        var counte = rows_e.length;
                        if (counte == 1) {
                          //epts=1
                          con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts <20 AND healthcondition="Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_f) { 
                          res.render('adminfdash', { data: rows_b, datas: rows_f, heading: headingfinal })
                          })  
                        }
                        else if(counte > 1) {
                          //epts>1
                          con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts <20 AND healthcondition="Urgency" AND recepientform.id IN (?) ORDER BY age asc', [match_id], function (err, rows_g) {
                            //minimum age
                            res.render('adminfdash', { data: rows_b, datas: rows_g, heading: headingfinal })
                          })
                        }
                        else {
                          //epts>20
                          con.query('SELECT id from recepientform where epts >20 AND healthcondition="Urgency" AND id IN (?)', [match_id], function (err, rows_h) {
                            var counte = rows_h.length;
                            if (counte == 1) {
                              //epts=1nos
                              con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts >20 AND healthcondition="Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_i) { 
                              res.render('adminfdash', { data: rows_b, datas: rows_i, heading: headingfinal })
                              })  
                            }
                            else {
                              //epts>1nos
                              con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts >20 AND healthcondition="Urgency" AND recepientform.id IN (?) ORDER BY age asc', [match_id], function (err, rows_j) {
                                //minimum age
                                res.render('adminfdash', { data: rows_b, datas: rows_j, heading: headingfinal })
                              })
                            }
                          })
                        }
                      })  
                    }
                    else {
                      //not urgency
                      con.query('SELECT id from recepientform where healthcondition ="Not Urgency" AND id IN (?)', [match_id], function (err, rows_k) {
                        var countnu = rows_k.length;
                        if (countnu == 1) {
                          //not urgency=1nos
                          con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where healthcondition ="Not Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_l) { 
                          res.render('adminfdash', { data: rows_b, datas: rows_l, heading: headingfinal })
                          })  
                        } 
                        else {
                          //not urgency>1nos
                          con.query('SELECT id from recepientform where epts <20 AND healthcondition="Not Urgency" AND id IN (?)', [match_id], function (err, rows_m) {
                            var counte = rows_m.length;
                            if (counte == 1) {
                              //epts=1
                              con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts <20 AND healthcondition="Not Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_n) { 
                              res.render('adminfdash', { data: rows_b, datas: rows_n, heading: headingfinal })
                              })  
                            }
                            else if(counte > 1) {
                              //epts>1
                              con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts <20 AND healthcondition="Not Urgency" AND recepientform.id IN (?) ORDER BY age asc', [match_id], function (err, rows_o) {
                                //minimum age
                                res.render('adminfdash', { data: rows_b, datas: rows_o, heading: headingfinal })
                              })
                            }
                            else {
                              //epts>20
                              con.query('SELECT id from recepientform where epts >20 AND healthcondition="Not Urgency" AND id IN (?)', [match_id], function (err, rows_p) {
                                var counte = rows_p.length;
                                if (counte == 1) {
                                  //epts=1nos
                                  con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts >20 AND healthcondition="Not Urgency" AND recepientform.id IN (?)', [match_id], function (err, rows_q) { 
                                  res.render('adminfdash', { data: rows_b, datas: rows_q, heading: headingfinal })
                                  })  
                                }
                                else {
                                  //epts>1nos
                                  con.query('SELECT * from recepientform LEFT JOIN recepientreg ON recepientform.id = recepientreg.id where epts >20 AND healthcondition="Not Urgency" AND recepientform.id IN (?) ORDER BY age asc', [match_id], function (err, rows_r) {
                                    //minimum age
                                    res.render('adminfdash', { data: rows_b, datas: rows_r, heading: headingfinal })
                                  })
                                }
                              })
                            }
                          })  
                        }
                      })
                    }
                  })
                }
              })

            }
          })
      } 
    }
  })
  // recepientdash(req,res)
  console.log("Admin Matching Dashboard Page")
}

module.exports = admindash