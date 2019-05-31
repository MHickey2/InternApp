var express = require("express");

var app = express();

var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

//call sql into action
var mysql = require('mysql');

app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));
app.use(express.static("public"));
app.set("view engine", "ejs");

// app.get('/', function(req,res){

// app.use(express.static(__dirname + '/node_modules'));
// app.get('communication', function(req, res,next) {
//     res.sendFile(__dirname + '/communication.ejs');
// });

//**************************Database section****************//

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



 

//**************Sql details***************//
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


// Route to show all characters from database 
app.get('/contact', function(req, res){
    
    let sql = 'SELECT * FROM contacts2';
    let query = db.query(sql, (err,res) => {
        
        if(err) throw err;
        
        res.render('contact', {res});
        console.log(res);
        
    });
    
});


// route to render create communication page
app.get('/communication', function(req, res){
res.render("communication");
console.log("welcome to the communication page");
});

//route to render create contact page
app.get('/contact', function(req, res){
res.render("contact");
console.log("welcome to the contacts page");
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
app.get('/training', function(req, res){
res.render("training");
console.log("welcome to the training page");
});


//the task array with initial placeholders for added task
var task = ["do node practise", "do your paperwork", "contact your service provider"];
//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
//add the new task from the post route into the array
    task.push(newTask);
//after adding to the array go back to the root route
    res.redirect("schedule");
});
//render the ejs and display added task, task(index.ejs) = task(array)
app.get("schedule", function(req, res) {
    res.render("schedule", { task: task});
});

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("schedule");
});

app.post("/removetask", function(req, res) {
    var complete;
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("schedule");
});

//render the ejs and display added task, completed task
app.get("schedule", function(req, res) {
    var complete;
    res.render("schedule", { task: task, complete: complete });
});


app.listen(process.env.PORT || 3000, process.env.IP || "0,0,0,0", function(){
    
    console.log("well done");
    
});