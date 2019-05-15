# bamazon

## Overview:

We have built a database called Bamazon. Based on this database, we have developed 3 small apps to interact with it. bamazonCustomer.js, bamazonManager.js, bamazonSupervisor.js

When the user uses bamazonCustomer.js, they will be prompted with two messages. 

- First will ask them for the item ID of the product they would like to buy. 

- The second, will ask the user how many units they would like to buy. If the database, has enough of the item the user wants to buy, the total will be output to the user, and the database will update it's quantity values for whatever item(s) were bought.

Upon starting bamazonManager.js, the user will be prompted with a few choices (View Products for Sale, View Low Inventory, Add to Inventory, Add New Product). 

- Selecting View Products for Sale, will allow the user to see the item ID's, names, prices, and quantities.

- Selecting View Low Inventory, will allow the user to see all the items with an inventory count lower than five.

- Selecting Add to Inventory, will allow the user to add more quantity of any items in the store.

- Selecting Add New Product, will allow the user to add a new product to the products database.

Using bamazonSupervisor.js allows the user to view product sales, overhead costs, and profit of each department. There are a couple of menu options (View Product Sales by Department, Create New Department).

- View Product Sales by Department allows the user to see the department ID, department name, overhead cost, total sales of each department, and profit of each department.

- Create New Department will allow the user to add a new department into the departments database.

### Technologies Used

- node
- javascript
- mysql

## Dependencies

- inquirer (used for prompts on the command-line)
- mysql (allows us to connect to our db and use sql style queries in node)
- console.table (outputs our database tables in a nice format)

## Installation

> git clone `https://github.com/Ryyder/bamazon.git`

> select which app you want to use (bamazonCustomer.js, bamazonManager.js, bamazonSupervisor.js)

> npm i

## Examples

Here are some video recorded samples with each app

- bamazonCustomer.js
- `https://drive.google.com/file/d/1KVfwUqGy_kUQloFAnkEMxwjWP6V-e1lQ/view`


- bamazonManager.js
- `https://drive.google.com/file/d/18PVIMd-vdeDo_gNOhQczwEaczafbz5am/view`



- bamazonSupervisor.js
- `https://drive.google.com/file/d/1Vqubl3IgTijxHqH0EcU5R9AagNG-35gr/view`





