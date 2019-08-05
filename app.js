var express = require("express");
var app = express();
var flash    = require('connect-flash');

//passport
var passport = require('passport');
var myObj = {"name": "Adam"};


var LocalStrategy = require('passport-local').Strategy;
var localStorage = require('node-localstorage');
var session  = require('express-session');
var cookieParser = require('cookie-parser');

//var tasks;
let res1;
var training;
var users;

var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


var bcrypt = require('bcrypt-nodejs');

app.use(cookieParser()); // read cookies (needed for auth)


// // required for passport
 app.use(session({
 	secret: 'ihaveasecret',
	resave: true,
 	saveUninitialized: true
  } )); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions
 app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./app/routes.js')(app, passport); //  pass into app and fully configure passport


//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation
const io = require("socket.io")(server);


// enables the use of the body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


var tasks = require("./model/tasks.json");


//const http = require('http').createServer(app);
//var io = require('socket.io')(http);

//calls the sql into action
var mysql = require('mysql');

app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));
app.use(express.static("public"));
app.set("view engine", "ejs");
const fileUpload = require('express-fileupload');
app.use(fileUpload());


//////////////////////////////////////////////////DATABASE SECTION//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//connectivity to sql database: connection details have been added in the final report after table of contents


 db.connect(function (err){
 if(!err){
  console.log("DB connected");
  //wstream.write('\Connected to gearhost DB...');
 }
 else{
  console.log("Error in connecting DB");
  //wstream.write('\error connecting to gearhost db');
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

// to render create communication page
// app.get('/communication', function(req, res){
// res.render("communication");
// console.log("welcome to the communication page");
// });

// app.get('/communication', function(req, res){
//   res.sendFile(__dirname + 'communication');
//   console.log("welcome to the communication page");
// });


//route to render create contact page
// app.get('/contact', function(req, res){
// res.render("contact");
//  console.log("welcome to the contacts page");
//  console.log(res);
//  });

// route to render create scheduling page
app.get('/schedule', isLoggedIn, function(req, res){
res.render("schedule");
console.log("welcome to the schedule page");
});

// route to render assistance page
app.get('/assistance', isLoggedIn, function(req, res){
res.render("assistance");
console.log("welcome to the assistance page");
});

// route to render tasklist page
app.get('/tasklist', isLoggedIn, function(req, res){
res.render("tasklist", {tasks:tasks}); // res.render command to display the contact.json file in fanclub page
console.log("welcome to the stored tasks page");

});

// route to render onetask page
app.get('/onetask', isLoggedIn, function(req, res){
    res.render("onetask", {tasks:tasks}); // res.render command to display the contact.json file in fanclub page
    console.log('welcome to that one task');

});

// route to render training page
// app.get('/training', function(req, res){
// res.render("training");
// console.log("welcome to the training page");
// });

// route to render communication page
// app.get('/registration', function(req, res){
// res.render("registration.ejs");
// console.log("welcome to the registration page");
// });

// route to render edit training page
app.get('/edit', function(req, res){
    res.render("edit.ejs");
    console.log("welcome to the editing page");
});

// route to render edit contact page
app.get('/editcontact', function(req, res){
    res.render("editcontact.ejs");
    console.log("welcome to the editing contact page");
});

//route to render the register page
app.get('/register', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('register.ejs');
});

//route to render the profile page
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass it to template
    });
});


//route to render the login page
app.get('/login', function(req, res) {

   // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

//route to render the upload page
app.get('/upload', isLoggedIn, function(req, res){
    res.render("upload");
});

//route to render the logout page
app.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
});


////////////////////////////////////////////SCHEDULE///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//*************Add task Details***************//
fs.readFile = function (s, utf8, readfileCallback) {

}
// Write a function to find the max id in JSON file
app.post('/addtask', function(req,res){

    function getMax(tasks, id) {
        var max;

        for (var i=0; i<tasks.length; i++) {
            if(!max || parseInt(tasks[i][id]) > parseInt(max[id]));
            max = tasks[i];
        }
        console.log("The max id is " + max);
        return max;
    }

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

    fs.readFile('./model/tasks.json', 'utf8', function readfileCallback(err,data){
        if(err){
            throw(err);

        } else {

            tasks.push(contactsx);  // add the new contact to the JSON file
            json = JSON.stringify(tasks, null, 4); // structure the new data nicely in the JSON file
            fs.writeFile('./model/tasks.json', json, 'utf8');
        }
    });
    console.log(tasks);
    res.redirect('/tasklist');

});
console.log(tasks);
console.log(tasks.length);



// // the function to find the max id in JSON file
//     app.post('/addtask',  function(req,res){
//
//     function getMax(tasks, id) {
//         var max;
//
//         for (var i=0; i<tasks.length; i++) {
//             if(!max || parseInt(tasks[i][id]) > parseInt(max[id]));
//             max = tasks[i];
//         }
//         console.log("The max id is " + max);
//         return max;
// }
//
//    var maxCid = getMax(tasks, "id");
//    var newId = maxCid.id + 1; // make a new variable for id which is 1 larger than the current max
//
//     console.log("New id is: " + newId);
//     // creating a new JSON object
//
//     var contactsx = {
//         id: newId,
//         type: req.body.type,
//         description: req.body.description,
//         priority: req.body.priority,
//         time: req.body.time
//     };
//
//     var json = JSON.stringify(tasks); // we tell the application to get our JSON readdy to modify
//     // Pushing the data back to the JSON file
//
//     fs.readFile('./model/tasks.json', 'utf8', function readfileCallback(err, data){
//         if(err){
//             throw(err);
//
//         } else {
//
//           tasks.push(contactsx);  // add the new contact to the JSON file
//           json = JSON.stringify(tasks, null, 4); // structure the new data nicely in the JSON file
//           fs.writeFile('./model/tasks.json', json, 'utf8');
//         }
//     });
//     console.log(tasks);
//     res.redirect('/tasklist');
//
// });
// console.log(tasks);
// console.log(tasks.length);
//

//*********** Function to delete a task **************//

app.get('/deleteTask/:id', isLoggedIn, function(req,res) {

    var json = JSON.stringify(tasks);
    // Get the id we want to delete from the URL parameter
    var keyToFind = parseInt(req.params.id);

    var data = tasks; // Declare the json file as a variable called data

    // maps the data and find relevant information
    var index = data.map(function (tasks) {
        return tasks.id;
    }).indexOf(keyToFind);

    // JavaScript allows the splicing of the JSON data

    tasks.splice(index, 1); // delete only one item from the position of the index variable above


    json = JSON.stringify(tasks, null, 4); // structure the new data nicely in the JSON file

    fs.writeFile('./model/tasks.json', json, function () {
        console.log("the task has been removed!");
        res.redirect('/tasklist');

    });

});

//***************** render route to edit task *************// 
//function to add task update page
app.get('/taskupdate/:id', isLoggedIn, function(req,res){
    console.log("task update page rendered");
    function chooseTask(indOne){
        return indOne.id === parseInt(req.params.id);
    }
    
    var indOne = tasks.filter(chooseTask);
        res.render('taskUpdate', {indOne:indOne});
        console.log(indOne);
});


//************* post request to update a task ***************//

app.post('/taskupdate/:id', isLoggedIn, function(req,res){
    
    var json = JSON.stringify(tasks);
    var keyToFind = parseInt(req.params.id);  // Find the data we need to edit
    var data = tasks; // Declare the json file as a variable called data
    var index = data.map(function(tasks){return tasks.id;}).indexOf(keyToFind); // map out data and find what we need
    
      
        var n = req.body.newType;
        var i = parseInt(req.body.newId);
        var c = req.body.newDescription;
        var e = req.body.newPriority;
        var r = req.body.newTime;
         
         tasks.splice(index, 1, {id: i, type: n, description: c, priority: e, time: r} ); 
         json = JSON.stringify(tasks, null, 4);
         fs.writeFile("./model/tasks.json", json, function() {
             console.log("success");
         } );
    
    console.log(i,n,c,e,r);
    res.redirect("/tasklist");
    console.log("tasklist page is rendered");
});



//*************function to see individual tasks**************//

app.get('/onetask/:id', isLoggedIn, function(req, res) {
  var json = JSON.stringify(tasks);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
     var data = tasks;
      // lets map the data and find the information we need
    var t=index1;
    var index1 = data.map(function(tasks){return tasks.id;}).indexOf(keyToFind);
   
  
  console.log(req.params.id);
  res.render("onetask", {tasks: tasks, t: index1});
  console.log("individual task page has now been rendered");    // the log function outputs data to the terminal. 
});



///////////////////////////////////////////TRAINING////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR SHOWING THE TRAINING OPTIONS ON THE TRAINING PAGE

// Route to show all training details from database
app.get('/training', isLoggedIn, function(req, res){
    
    let sql = 'SELECT * FROM training';
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
        res.render('training', {res1});
        console.log(res1);
    });
    
});

//route for showing all the training for the accountancy Department
app.get('/accountancytraining', function(req, res){
    let sql = 'SELECT * FROM training where deptId="a"';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;

        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
});  

//route for showing all the training for the customer service Department
app.get('/customerservicetraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="b"';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 
         
 
}); 

//route for showing all the training for the Marketing Department
app.get('/marketingtraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="c"';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);
        
    }); 

}); 

//route for showing all the training for the Sales Department
app.get('/salestraining', function(req, res){
    let sql = 'SELECT * FROM training WHERE deptId ="d"';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1} );
        console.log(res1);
        
    }); 
         
 
}); 

//route for showing all the training for the Software Development Department
app.get('/softwaretraining', function(req, res){
   //let sql= 'SELECT date_format(fromDate,'%W, %M, %d,%Y') AS fromDate';
    let sql = 'SELECT * FROM training WHERE deptId ="e"';

    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('training', {res1});
        console.log(res1);

    }); 
         
 
}); 



///////////////////////////////////editing details in the training page/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//route for editing training

app.get('/edit/:trainingRef', isLoggedIn, isAdmin, function(req, res){
    let sql = 'SELECT * FROM training WHERE trainingRef = "'+req.params.trainingRef+'" ';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        console.log(res1);
       // setTimeout(function(){ res.render('edit', {res1}); }, 3000);
       res.render('edit', {res1});
        console.log("that worked");

    });

});


// Post request URL to edit  training, only available to admin
app.post('/edit/:trainingRef',  isLoggedIn, isAdmin, function(req, res){
    let sql = 'UPDATE training SET deptId = "'+req.body.deptId+'", type = "'+req.body.type+'", location = "'+req.body.location+'", fromDate = "'+req.body.fromDate+'", todate = "'+req.body.todate+'" WHERE trainingRef= "'+req.params.trainingRef+'"';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        //res.render('/training' ,{res1});

    });
    res.redirect("/training");
    console.log("training has been updated");
});

// route to delete training class, only available to admin

app.get('/delete/:trainingRef', isLoggedIn, isAdmin, function(req, res){
    let sql = 'DELETE FROM training WHERE trainingRef = "'+req.params.trainingRef+'"' ;
    let query = db.query(sql,(err, res1 ) => {
        if(err) throw err;
        console.log(res1);
        res.redirect('/training');
        console.log("class deleted");
    });


});




///////////////////////////////////////////ASSISTANCE//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR THE ASSISTANCE CHAT


//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.sockets.on("connection", function(socket) {

    socket.on("chat-message", function(message) {
        io.sockets.emit("chat-message", message);
    });

});


io.sockets.on('connection', function (socket) {

    socket.on('adduser', function (user) {
        socket.user = user;
        users.push(user);
        updateClients();
    });

    // socket.on('disconnect', function () {
    //     for(var i=0; i<users.length; i++) {
    //         if(users[i] == socket.user) {
    //             delete user[users[i]];
    //         }
    //     }
    //     updateClients();
    // });

    function updateClients() {
        io.sockets.emit('update', users);

    }

});
///////////////////////////////////////////COMMUNICATION//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// to render create communication page
app.get('/communication', isLoggedIn, function(req, res){
    res.render("communication");
    console.log("welcome to the communication page");
});


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');

    var userCount = 0;

    io.sockets.on('connection', function (socket) {
        userCount++;
        io.sockets.emit('userCount', { userCount: userCount });
        socket.on('disconnect', function() {
            userCount--;
            io.sockets.emit('userCount', { userCount: userCount });
        });
        console.log(userCount);
    });

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    });

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
});

// app.use(function (req, res, next) {
//     res.locals.users = {
//              res:locals.users = {users: req.username}
//     };
//     next();
// });
//
// {{user}}

///////////////////////////////////////////CONTACTS////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR SHOWING THE CONTACT OPTIONS ON THE CONTACTS PAGE


// Route to show all information from users/contacts
app.get('/contact', isLoggedIn, function(req, res){
    
        let sql = 'SELECT * FROM users where admin=0';
        
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
      res.render('contact', {res1});
        console.log(res1);
    });
    
});



// //route for showing all the contacts for the accountancy Department
app.get('/accountancycontact', function(req, res){
    let sql = 'SELECT empId, deptId, image, catId,FName, LName, Description, email, PhoneNo FROM users WHERE deptId="a" ORDER by catId ASC';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('contact', {res1});
        console.log(res);
        
    }); 
       
 
});  

// //route for showing all the contacts for the customer service Department
app.get('/customerservicecontact', function(req, res){
    let sql = 'SELECT empId, deptId, image, catId,FName, LName, Description, email, PhoneNo FROM users WHERE deptId="b" ORDER by catId ASC';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('contact', {res1});
        console.log(res);
        
    }); 
         
 
}); 

// //route for showing all the contacts for the Marketing Department
app.get('/marketingcontact', function(req, res){
    let sql = 'SELECT empId, deptId, image, catId,FName, LName, Description, email, PhoneNo FROM users WHERE deptId="c" ORDER by catId ASC';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('contact', {res1});
        console.log(res);
        
    }); 
         
 
}); 

 //route for showing all the contacts for the Sales Department
app.get('/salescontact', function(req, res){
    let sql = 'SELECT empId, deptId, image, catId,FName, LName, Description, email, PhoneNo FROM users WHERE deptId="d" ORDER by catId ASC';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('contact', {res1});
        console.log(res);
        
    }); 
         
 
 }); 

//route for showing all the contacts for the Software Development Department
app.get('/softwarecontact', function(req, res){
      let sql = 'SELECT empId, deptId, image, catId,FName, LName, Description, email, PhoneNo FROM users WHERE deptId="e" ORDER by catId ASC';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        res.render('contact', {res1});
        console.log(res);
        
    }); 
         
 
}); 



///////////////////////////////////editing details in the contacts page/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//route for editing contacts
app.get('/editcontact/:empId', isLoggedIn, function(req, res){
    let sql = 'SELECT * FROM users WHERE empId = "'+req.params.empId+'" ';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        console.log(res1);
        res.render('editcontact', {res1});
        console.log(res1);
    });


});



// Post request URL to edit contacts
app.post('/editcontact/:empId', isLoggedIn, function(req, res){


    let sql = 'UPDATE  users SET deptId = "'+req.body.deptId+'", Fname = "'+req.body.FName+'", image = "'+req.body.image+'", Lname = "'+req.body.LName+'", catId = "'+req.body.catId+'", description = "'+req.body.description+'", email = "'+req.body.email+'", PhoneNo = "'+req.body.PhoneNo+'" WHERE empId="'+req.params.empId+'"';
    let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1)

    });

    res.redirect("/contact");
    console.log("contact has been updated");
});


// route to delete Contact, only available to admin

app.get('/deletecontact/:empId', isLoggedIn, isAdmin, function(req, res){

    let sql = 'DELETE FROM users WHERE empId = "'+req.params.empId+'" ';
    let query = db.query(sql, (err, res1 ) => {
        if(err) throw err;
        console.log(res1);
        res.redirect("/contact");
        console.log("contact has been deleted");

    });
});

///////////////////////////////////////////////upload images//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//to upload images in the upload page, after uploading image it redirects to contact page where you can manually insert the image name
app.post('/upload', isLoggedIn, function(req, res){

    //  need to get the image from the form

    let sampleFile = req.files.sampleFile;
    var filename = sampleFile.name;
    // use file upload to move the data from the form to the desired location
    sampleFile.mv('./images/' + filename, function(err){
        if(err)
            return res.status(500).send(err);
        console.log("Image is " + req.files.sampleFile);
        res.redirect("/contact");
    });
});

//////////////////////////////////////////////AUTHENTICATE/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////// LOGIN //////////////////////////////////////////////////////////
	// ===============================================================================================================


	//show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});



// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');

        });

	// =====================================
	////////////////////////////////////////////////////// Register ///////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// =====================================

	// show the Register form
	app.get('/register', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('register.ejs', { message: req.flash('signupMessage') });
	});

// 	// process the register form
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));




// =====================================
	////////////////////////////// PROFILE SECTION //////////////////////////////////////////////////////////////
	// =====================================
	// this needs to be protected so you have to be logged in to visit
	// Using route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});

	});


// 	// =====================================
// 	// LOGOUT ==============================
// 	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


// route middleware to make sure they are login in
 function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, this carries on
     if (req.isAuthenticated())
         return next();

// 	// if they aren't this redirects them to the home page
     res.redirect('/');

 };

// checks that they are admin
function isAdmin(req, res, next) {

// 	// if user is authenticated in the session, carry on
	if (req.user.admin)
		return next();

// 	// if they aren't this redirects them to the home page
	res.redirect('/');
}




//module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users when out of session

    // used to serialize the user for the session
     passport.serializeUser(function(user, done) {
        done(null, user.empId); // Very important to ensure the case if the Id from your database table is the same as it is here
     });

    // // used to deserialize
     passport.deserializeUser(function(empId, done) {    // LOCAL SIGNUP ============================================================

       db.query("SELECT * FROM users WHERE empId = ? ",[empId], function(err, rows){
             done(err, rows[0]);
        });
     });


    // =========================================================================
    // =========================================================================
    // using named strategies, one for login and one for register
    // if there was no name, this would just be called 'local'

   passport.use(
         'local-signup',
         new LocalStrategy({
                 // by default, local strategy uses username and password, adding email is overriding this
                 usernameField: 'username',
                 passwordField: 'password',
                 passReqToCallback: true // allows you to pass back the entire request to the callback
             },
        function(req, username, password, done) {
//             // find a user whose email is the same as the forms email
//             // checking to see if the user trying to login already exists
            db.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                 if (err)
                     return done(err);
                if (rows.length) {
                     return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                 } else {
                     // if there is no user with that username create the user

                     var newUserMysql = {
                         username: username,
                       email: req.body.email,
                         password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                     };

                    var insertQuery = "INSERT INTO users ( username, email, password ) values (?,?,?)";

                     db.query(insertQuery,[newUserMysql.username, newUserMysql.email, newUserMysql.password],function(err, rows) {
                        newUserMysql.empId = rows.insertId;

                         return done(null, newUserMysql);
                    });
                 }
             });
         })
     );


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================


    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from the form
            db.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);


            });
        })
    );



    //

    app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
        console.log("webpage is up");

    });
