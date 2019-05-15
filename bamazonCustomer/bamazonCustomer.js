var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jaeger18121!",
  database: "bamazon"
});

//open our connection to the sql database
connection.connect(function(err) {
  if (err) throw err;
  prompts();
});


//prompts for our user to enter in data
const prompts = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Browse an item by ID. Please enter the item ID.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "units",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var newStock = 0;
      var itemID = answer.id - 1;
      var itemName = res[itemID].product_name;
      var quantity = answer.units;
      var price = res[itemID].price.toPrecision(3);
      var grandTotal;
        

      //if the user's choice is > than the stock quantity, give them an error or user tries to purchase a product with 0 quantity. return flow to the top of the program
      if((answer.units > res[itemID].stock_quantity) || (res[itemID.stock_quantity] == 0)) {
        console.log("Insufficient quantity!");
        prompts();
      }
      else {

      //subtracing current stock quantity - the amount user entered
      newStock = parseInt(res[itemID].stock_quantity) - parseInt(answer.units);

      console.log("old stock quantity: " + parseInt(res[itemID].stock_quantity));

      console.log("new stock quantity: " + newStock);

      grandTotal = parseFloat(total(quantity, price));
      console.log("total price is: " + grandTotal);

        //update the database with the new quantity
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              product_sales: grandTotal,
              stock_quantity: newStock
            },
            {
              product_name: itemName
            }
          ],
          function(err) {
            if (err) throw err;
            console.log(query.sql); 
            connection.end();
          }
        );
      }

    });
  });
}

//function to calculate the total price of item item and quantity purchased
const total = (quantity, price) => {
  var calc;
  calc = quantity * price;
  return calc.toPrecision(3);
}