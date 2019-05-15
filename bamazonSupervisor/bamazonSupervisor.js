
//requires for our node app
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
  supervisor();
})

//prompts for our user
const supervisor = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Product Sales by Department", "Create a New Department", "Exit"]
    })
    .then(function(answer) {
      if (answer.choice == "View Product Sales by Department") {
        console.log("Product Sales");
        prodSales();
      }
      else if (answer.choice == "Create a New Department") {
        newDept();
      }
      else {
        connection.end()
      }
    });
}

//our query for product sales
const prodSales = () => {
  //this query joins the products and departments table on department_name (identical column names in both tables). From there, we sum the total of the product_sales from the products table and subtract that value from the overhead_cost from departments table
  var query = "select departments.id, departments.department_name, departments.overhead_cost as overhead_cost, sum(products.product_sales) as product_sales, sum(product_sales) - overhead_cost as total_profit from departments inner join products on departments.department_name = products.department_name group by departments.department_name";

  //our query
  connection.query(query, function(err, res) {
    if (err) throw err;
    //output our query
    console.table(res);
    //return to our prompts for the user
    supervisor();
  });
}

//our new department function
const newDept = () => {
  //prompt user for department name and overhead cost associated with the department
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Enter the Department you want to add"
      },
      {
        name: "cost",
        type: "input",
        message: "Enter the Overhead Cost of the Department",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      //save our user input into variables
      var deptName = answer.deptName;
      var cost = answer.cost;
      //our query to insert the user inputs into our database
      var query = connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: deptName,
          overhead_cost: cost
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department inserted");
          //take user back to the initial prompts
          supervisor();
          }
      );
      
      console.log(query.sql);
    });
}