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

//our starting prompts for the user
const managerStart = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
    .then(function(answer) {
      //logic to determine which function to call, based on user input
      if (answer.choice == "View Products") {
        console.log("Viewing products");
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
      //end our connection when the user selects exit
      else{
        connection.end();
      }
    });
}

//simple select * from products function that queries our database
const selectAll = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    //start our prompt
    managerStart();
    });
}

//simple query that shows the user if there is any item quantity below 5
const lowInv = () => {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.table(res);
    //take us back to our prompt
    managerStart();
  });

}

//updates our database depending on the item they select in the db
const addInv = () => {
  //prompt user for the item name
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the item you would like to add more quantity to"
      },
      {
      //prompt user for quantity they want to add
      name: "add",
      type: "input",
      message: "How many items would you like to add?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
      }
  ])
  .then(function(answer) {
    //query our database to get stock quantity from our products table where product name = whatever the user entered
    connection.query("SELECT stock_quantity FROM products WHERE ?", [
      {
        product_name: answer.name
      }
    ],function(err, res) {
      if(err) throw err;
      //increase the stock quantity amount according to what the user entered
      var itemAdd = parseInt(res[0].stock_quantity) + parseInt(answer.add);
      //our update query, update our stock_quantity according to what the user entered, where the product_name set to what the user entered
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: itemAdd
          },
          {
            product_name: answer.name
          }
        ],
        function(err) {
          if (err) throw err;
          console.log(query.sql);
          //take us back to our prompt
          managerStart();
        }
      )

    });

  });
}


const addProd = () => {

}

