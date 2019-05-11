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
  managerStart();
});

const managerStart = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
    .then(function(answer) {
      
      if (answer.choice == "View Products") {
        selectAll();
      }
      else if (answer.choice == "View Low Inventory") {
        lowInv();
      }
      else if (answer.choice == "Add to Inventory") {
        addInv();
      }
      else if (answer.choice == "Add New Product") {
        addProd();
      }
      else{
        connection.end();
      }
    });
}

