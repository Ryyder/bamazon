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

connection.connect(function(err) {
  if (err) throw err;
  prompts();
  //connection.end();
});

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

      console.log("you chose item id: " + res[itemID].item_id);
      
      //subtracing current stock quantity - the amount user entered
      newStock = parseInt(res[itemID].stock_quantity) - parseInt(answer.units);

      console.log("old stock quantity: " + parseInt(res[itemID].stock_quantity));

      console.log("new stock quantity: " + newStock);

      //if the user's choice is > than the stock quantity, give them an error and return flow to the top of the program
      if(answer.units > res[itemID].stock_quantity) {
        console.log("Insufficient quantity!");
        /* prompts(); */
      }
      else {
        //update the database with the new quantity
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
              item_id: itemID
            }
          ],
          function(err) {
            if (err) throw err;
             console.log("hello"); 
             connection.end();
          }
        );
      }

    });
  });
}
