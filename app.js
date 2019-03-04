var express = require("express"); // This line calls the express framework to action
// invoke the express package into action from here
var app = express();
// *********** Never write anything above the express call line ****************
app.set("view engine", "ejs");  // set default view engine
var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var contact = require("./model/contact.json"); // This declares the content of the contact.json file as a variable called contact
var product = require("./model/product.json");

// Call the access to the views folder and allow content to be rendered
app.use(express.static("views"));

// Call the access to the script folder and allow content to be rendered
app.use(express.static("script"));

// Call the access to the images folder and allow content to be rendered
app.use(express.static("images"));

app.get('/', function(req, res){ // this line will call a grt request on the / url of our application
  // Now we need the function to actually do something  
    //res.send("Hello January Class") // We will send a string response to the browser
    res.render("index")
    // We should get into the habbit of keeping track of our progress
    
    console.log("The Message was sent and you made an app")
    
});

// route to get comments page

app.get('/contacts', function(req, res){
      res.render("contacts", {contact})
     console.log("You are on the way to the contacts page")
    
  
});


app.get('/products', function(req, res){
      res.render("products", {product})
     console.log("You are on the way to the contacts page")
    
  
});

// =####### Functions to add a contact #############

app.get('/add', function(req, res){
      res.render("add")
     console.log("Welcome to leave comment page")
    
  
});



app.post('/add', function(req,res){
    // Write a function to find the max id in my JSON file
 
    function getMax(contacts, id) {
        var max
        for (var i=0; i<contacts.length; i++) {
            if(!max || parseInt(contact[i][id]) > parseInt(max[id]))
            max = contacts[i];
        }
        console.log("The max id is " + max)
        return max;

    }
  

    maxCid = getMax(contact, "id")
    
   var newId = maxCid.id + 1; // make a ne variable for id which is 1 larger than the current max
    
    console.log("New id is: " + newId);
    var json = JSON.stringify(contact) // we tell the application to get our JSON readdy to modify
    // Now we will create a new JSON object
    
    var contactsx = {
        
        name: req.body.name,
        Comment: req.body.comment,
        id: newId,
        email: req.body.email
        
        
    }
    
    
    // Now we push the data back to the JSON file
    
    fs.readFile('./model/contact.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err)
            
        } else {
            
          contact.push(contactsx)  // add the new contact to the JSON file
          json = JSON.stringify(contact, null, 4) // structure the new data nicely in the JSON file
          fs.writeFile('./model/contact.json', json, 'utf8')
        }
        
        
    })
    
    res.redirect('/contacts')
    
});



//// ########## Function to delete a contact ####

app.get('/deletecontact/:id', function(req,res){
    
     var json = JSON.stringify(contact);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
    var data = contact // Declare the json file as a variable called data
    
    // lets map the data and find the information we need
    var index = data.map(function(contact){return contact.id;}).indexOf(keyToFind)
    
    // JavaScript allows us to splice our JSON data
    
    contact.splice(index, 1); // delete only one item from the position of the index variable above
    
      
          json = JSON.stringify(contact, null, 4) // structure the new data nicely in the JSON file
          fs.writeFile('./model/contact.json', json, 'utf8')

console.log("Ha Ha ....... its gone!")    
res.redirect('/contacts')

});









// Now we set up a way for our application to run whe we need it to

// ********************* NEVER WRITE BELOW THIS LINE .... EVER  ...... EVER  *************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    
  console.log("Well Done! Your first app is now live!")  
    
    
});