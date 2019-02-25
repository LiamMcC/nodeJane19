var express = require("express"); // This line calls the express framework to action
// invoke the express package into action from here
var app = express();
// *********** Never write anything above the express call line ****************
app.set("view engine", "ejs");  // set default view engine

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














// Now we set up a way for our application to run whe we need it to

// ********************* NEVER WRITE BELOW THIS LINE .... EVER  ...... EVER  *************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    
  console.log("Well Done! Your first app is now live!")  
    
    
});