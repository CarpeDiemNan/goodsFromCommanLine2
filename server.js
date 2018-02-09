var mysql = require("mysql");
var inquirer = require("inquirer");

var glbItem = "";
var glbDept = "";
var glbQuan = "";
var glbItemPrice = 1;
var glbTotal = 1;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Crayons23",
    database: "bamazondb"
});

connection.connect(function(err) {
    if(err) throw err;
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        console.log("Items for SALE!");
        console.log("******************************");
        console.log("******************************");
        for (var i = 0; i < results.length; i++) {
            console.log("id: " +  results[i].id);
            console.log("name: " +  results[i].product_name);
            console.log("department: " +  results[i].department_name);
            console.log("price: " +  results[i].price);
            console.log("items left in stock: " +  results[i].stock_quantity);
            console.log("**************************");
        }
        // run the start function after the connection is made to prompt the user
    start();
    })
   
});
// Prompt the user for what they want to buy
function start() {
    inquirer
      .prompt({
        name: "item",
        type: "input",
        message: "What item would you like to buy?"         
      })
      .then(function(answer) {
         // global var item
        glbItem = answer.item;
        console.log(glbItem); 
        
         // call function to prompt user for how many items to buy
         howMany(); 
        //  console.log("when does this run?");        
      });
  }
       

  // function which prompts user for how many items they want to buy
  function howMany() {
      inquirer
        .prompt({
            name: "howMany",
            type: "input",
            message: "How many do you want?"
        })
        .then(function(answer){
            glbQuan = answer.howMany;
            console.log(glbQuan);
            // call function to get price of item - 
            // connection.query("SELECT price FROM products WHERE product_name: glbItem");
            getPrice();
        });
     }
  // function to prompt user to enter item's price 
   function getPrice() {
       inquirer
        .prompt({
            name: "howMuch",
            type: "input",
            message: "Kindly enter the price (since my database query is not working)"
        })
        .then(function(answer){
            glbItemPrice = answer.howMuch;
            console.log("cost of item is ");
            console.log(glbItemPrice);
            // call function to calculate user's total price
            getTotal();
        });
    }
    // function to calculate user's total
   function getTotal() {
    inquirer
     .prompt({
         name: "howMuch",
         type: "input",
         message: "Please press enter to get your total :) "
     })
     .then(function(answer){
         glbTotal= glbItemPrice * glbQuan;          
         console.log(glbTotal + " dollars, please");
         // call function to update quantity after x-number of y-items are bought
        updateQuantity();
     });
 }
    function updateQuantity() {
        console.log("updating new inventory quantity for " + glbItem + "'s");
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: 100 //("stock_quantity" - glbQuan)
              },
              {
                product_name: glbItem
              }
            ],
            function(err, res) {
              console.log(res.affectedRows + " products updated!\n");
               
            }
          );
    }
