var express = require("express");

var app = express();
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var localStorage = require('node-localstorage')
// var session  = require('express-session');
// var cookieParser = require('cookie-parser');
// var flash    = require('connect-flash');


var tasks;
var res;
var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

var bcrypt = require('bcrypt-nodejs');


// app.use(cookieParser()); // read cookies (needed for auth)


// // required for passport
// app.use(session({
// 	secret: 'vidyapathaisalwaysrunning',
// 	resave: true,
// 	saveUninitialized: true
//  } )); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport






// to enable the use of the body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));




// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

//call sql into action
var mysql = require('mysql');

app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));
app.use(express.static("public"));
app.set("view engine", "ejs");


const ejsLint = require('ejs-lint');
//////////////////////////////////////////////////DATABASE SECTION//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//connectivity to sql database: connection details have been added in the final report on the first page
const db = mysql.createConnection ({
    host: "den1.mysql1.gear.host",
    user: "contacts2",
    password: "Ip2q0zJXg-j!",
    database: "contacts2",    
    multipleStatements: true //this allows for multiple sql statements in 1 function

 });

 db.connect(function (err){
 if(!err){
  console.log("DB connected");
  //wstream.write('\nConnected to gearhost DB...');
 }
 else{
  console.log("Error in connecting DB");
  //wstream.write('\nerror connecting to gearhost db');
 }
});


//route for application
app.get('/', function(req, res){
res.render("index.ejs");
console.log("index page has been displayed");
});



 

///////////////////////////////////////////////////MYSQL SECTION////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//create a route to create a database table

// app.get('/createtable1', function(req, res){
//       console.log("got to here");
//       let sql = 'CREATE TABLE contacts2 (EmpId int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Description text,  ContactNo int, Image varchar(255));'
//     console.log("got to here");
//     let query = db.query(sql, (err,res) => {
        
//         if(err) throw err;
//         console.log("we have a problem");
//     });
    
//     res.render("createtable1");
//     console.log("first table created");
// });




////////////////////////////////////ROUTES////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// route to render create communication page
app.get('/communication', function(req, res){
res.render("communication");
console.log("welcome to the communication page");
});

//route to render create contact page
app.get('/contact', function(req, res){
res.render("contact");
 console.log("welcome to the contacts page");
 console.log(res);
 });

// route to render create communication page
app.get('/schedule', function(req, res){
res.render("schedule");
console.log("welcome to the schedule page");
});

// route to render create communication page
app.get('/assistance', function(req, res){
res.render("assistance");
console.log("welcome to the assistance page");
});

// route to render create communication page
app.get('/tasklist', function(req, res){
res.render("tasklist");
console.log("welcome to the task list page");
});

// route to render create training page
// app.get('/training', function(req, res){
// res.render("training");
// console.log("welcome to the training page");
// });

// route to render create communication page
app.get('/registration', function(req, res){
res.render("registration");
console.log("welcome to the registration page");
});

////////////////////////////////////////////SCHEDULE///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//*************Add Contact Details***************//


    // Write a function to find the max id in JSON file
    app.post('/addtask', function(req,res){
        
    function getMax(tasks, id) {
        var max;
        var tasks;
        
        for (var i=0; i<tasks.length; i++) {
            if(!max || parseInt(tasks[i][id]) > parseInt(max[id]));
            max = tasks[i];
        }
        console.log("The max id is " + max);
        return max;
}
   var tasks;
   var maxCid = getMax(tasks, "id");
   var newId = maxCid.id + 1; // make a new variable for id which is 1 larger than the current max
    
    console.log("New id is: " + newId);
    // creating a new JSON object
    
    var contactsx = {
        id: newId,
        type: req.body.type,
        description: req.body.description,
        priority: req.body.priority,
        time: req.body.time
    };
    var json = JSON.stringify(tasks); // we tell the application to get our JSON readdy to modify
    // Push the data back to the JSON file
    
    fs.readFile('./model/tasks.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err);
            
        } else {
            
          tasks.push(contactsx);  // add the new contact to the JSON file
          json = JSON.stringify(tasks, null, 4); // structure the new data nicely in the JSON file
          fs.writeFile('./model/tasks.json', json, 'utf8');
        }
    });
    console.log(tasks);
    res.redirect('/tasklist', { tasks: tasks});
    //res.render("tasklist", { tasks: tasks});
});









// //the schedule page with the task choices
// var task = ["do node practise", "do your paperwork", "contact your service provider", "Schedule a meeting with HR"];
// //post route for adding new task
// app.post('/addtask', function (req, res) {
//     var newTask = req.body.newtask;
// //add the new task from the post route into the array
//     task.push(newTask);
// //after adding to the array go back to the root route
//     res.redirect("schedule");
// });
// //render the ejs and display added task, task(index.ejs) = task(array)
// app.get("schedule", function(req, res) {
//     res.render("schedule", { task: task});
// });

// //post route for adding new task 
// app.post("/addtask", function(req, res) {
//     var newTask = req.body.newtask;
//     //add the new task from the post route
//     task.push(newTask);
//     res.redirect("schedule");
// });

// app.post("/removetask", function(req, res) {
//     var complete;
//     var completeTask = req.body.check;
//     //check for the "typeof" the different completed task, then add into the complete task
//     if (typeof completeTask === "string") {
//         complete.push(completeTask);
//         //check if the completed task already exits in the task when checked, then remove it
//         task.splice(task.indexOf(completeTask), 1);
//     } else if (typeof completeTask === "object") {
//         for (var i = 0; i < completeTask.length; i++) {
//             complete.push(completeTask[i]);
//             task.splice(task.indexOf(completeTask[i]), 1);
//         }
//     }
//     res.redirect("schedule");
// });

// //render the ejs and display added task, completed task
// app.get("schedule", function(req, res) {
//     var complete;
//     res.render("schedule", { task: task, complete: complete });
// });


///////////////////////////////////////////TRAINING////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR SHOWING THE TRAINING OPTIONS ON THE TRAINING PAGE



// Route to show all training details from database 
app.get('/training', function(req, res){
    
    let sql = 'SELECT * FROM training';
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
        res.render('training', {res1});
        console.log(res1);
    });
    
});

//route for showing all the training for the accountancy Department
app.get('/accountancytraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="a" ORDER by toDate';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
});  

//route for showing all the training for the customer service Department
app.get('/customerservicetraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="b" ORDER by toDate';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
}); 

//route for showing all the training for the customer service Department
app.get('/marketingtraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="c" ORDER by toDate';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
}); 

//route for showing all the training for the customer service Department
app.get('/salestraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="d" ORDER by toDate';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
}); 

//route for showing all the training for the customer service Department
app.get('/softwaretraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="e" ORDER by toDate';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
}); 




//  // function to clear training selection
// app.get('/clearDisplay', function(req, res){
    
// // });




///////////////////////////////////////////ASSISTANCE//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR THE ASSISTANCE CHAT




///////////////////////////////////////////COMMUNICATION//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR THE CHAT ROOM











///////////////////////////////////////////CONTACTS////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR SHOWING THE CONTACT OPTIONS ON THE CONTACTS PAGE

//display the contacts selection
// app.get("contact", function(req, res) {
//     res.render("contact");
// });




// Route to show all information from users 
app.get('/contact', function(req, res){
    
        let sql = 'SELECT * FROM users';
        
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
      res.render('contact', {res1});
        console.log(res1);
    });
   // console.log(res);
});


// // Route to show all details for the contacts
// app.get('/contact', function(req, res){
    
//     let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="a" ORDER by LName asc';
//     let query = db.query(sql, (err,res) => {
        
//         if(err) throw err;
        
//         res.render('contact', {res});
//         console.log(res);
//     });
//     console.log(res);
// });

// //route for showing all the contacts for the accountancy Department
app.get('/accountancycontact', function(req, res){
    let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="b" ORDER by LName asc';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
        res.render('contact', {res});
        
        
    }); 
       
 
});  

// //route for showing all the contacts for the customer service Department
app.get('/customerservicecontact', function(req, res){
    let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="c" ORDER by LName asc';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
        res.render('contact', {res});
        console.log(res);
        
    }); 
         
 
}); 

// //route for showing all the contacts for the customer service Department
app.get('/marketingcontact', function(req, res){
    let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="d" ORDER by LName asc';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
        res.render('contact', {res});
        console.log(res);
        
    }); 
         
 
}); 

// //route for showing all the contacts for the customer service Department
app.get('/salescontact', function(req, res){
    let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="e" ORDER by LName asc';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
        res.render('contact', {res});
        console.log(res);
        
    }); 
         
 
 }); 

//route for showing all the contacts for the customer service Department
app.get('/softwarecontact', function(req, res){
      let sql = 'SELECT deptId, catId,FName, LName, Description, Email, PhoneNo FROM users WHERE deptId="e" ORDER by LName asc';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
        res.render('training', {res});
        console.log(res);
        
    }); 
         
 
}); 

//  // function to clear contact selection
// app.get('/clearDisplay', function(req, res){
    
 // });

//}); 



//////////////////////////////////////////////AUTHENTICATE/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
	// ===============================================================================================================
	// show the login form
// 	app.get('/login', function(req, res) {

// 		// render the page and pass in any flash data if it exists
// 		res.render('login.ejs', { message: req.flash('loginMessage') });
// 	});

	// process the login form
// 	app.post('/login', passport.authenticate('local-login', {
//             successRedirect : '/profile', // redirect to the secure profile section
//             failureRedirect : '/login', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
// 		}),
//         function(req, res) {
//             console.log("hello");

//             if (req.body.remember) {
//               req.session.cookie.maxAge = 1000 * 60 * 3;
//             } else {
//               req.session.cookie.expires = false;
//             }
//         res.redirect('/');
//     });

	// =====================================
	////////////////////////////////////////////////////// SIGNUP ///////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// =====================================
	// show the signup form
// 	app.get('/signup', function(req, res) {
// 		// render the page and pass in any flash data if it exists
// 		res.render('signup.ejs', { message: req.flash('signupMessage') });
// 	});

// 	// process the signup form
// 	app.post('/signup', passport.authenticate('local-signup', {
// 		successRedirect : '/profile', // redirect to the secure profile section
// 		failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 		failureFlash : true // allow flash messages
// 	}));

	// =====================================
	////////////////////////////// PROFILE SECTION //////////////////////////////////////////////////////////////
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
// 	app.get('/profile', isLoggedIn, function(req, res) {
// 		res.render('profile', {
// 			user : req.user // get the user out of session and pass to template
// 		});
// 	});

// 	// =====================================
// 	// LOGOUT ==============================
// 	// =====================================
// 	app.get('/logout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});


// route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }


// // see are they admin
// function isAdmin(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.user.admin)
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect('/');
// }




//module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    // passport.serializeUser(function(user, done) {
    //     done(null, user.Id); // Very important to ensure the case if the Id from your database table is the same as it is here
    // });

    // // used to deserialize the 
    // passport.deserializeUser(function(Id, done) {    // LOCAL SIGNUP ============================================================

    //   db.query("SELECT * FROM users WHERE Id = ? ",[Id], function(err, rows){
    //         done(err, rows[0]);
    //     });
    // });

    // =========================================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

//   passport.use(
//         'local-signup',
//         new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password, done) {
//             // find a user whose email is the same as the forms email
//             // we are checking to see if the user trying to login already exists
//             db.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
//                 if (err)
//                     return done(err);
//                 if (rows.length) {
//                     return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
//                 } else {
//                     // if there is no user with that username
//                     // create the user
//                     var newUserMysql = {
//                         username: username,
//                         email: req.body.email,
//                         password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
//                     };

//                     var insertQuery = "INSERT INTO users ( username, email, password ) values (?,?,?)";

//                     db.query(insertQuery,[newUserMysql.username, newUserMysql.email, newUserMysql.password],function(err, rows) {
//                         newUserMysql.Id = rows.insertId;

//                         return done(null, newUserMysql);
//                     });
//                 }
//             });
//         })
//     );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

//     passport.use(
//         'local-login',
//         new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password, done) { // callback with email and password from our form
//             db.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
//                 if (err)
//                     return done(err);
//                 if (!rows.length) {
//                     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//                 }

//                 // if the user is found but the password is wrong
//                 if (!bcrypt.compareSync(password, rows[0].password))
//                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

//                 // all is well, return successful user
//                 return done(null, rows[0]);
//             });
//         })
//     );
// //};







app.listen(process.env.PORT || 3000, process.env.IP || "0,0,0,0", function(){
    
    console.log("well done");
    
});