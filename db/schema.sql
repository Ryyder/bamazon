CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id integer not null auto_increment,
	product_name varchar(50),
	department_name varchar(50),
    price decimal(10,2),
    stock_quantity integer,
    product_sales decimal(10,2),
    primary key (item_id)
);

CREATE TABLE departments (
	id integer not null auto_increment,
	department_name varchar(50),
	overhead_cost decimal(10,2),
    primary key (id)
);