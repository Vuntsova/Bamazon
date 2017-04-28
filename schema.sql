CREATE SCHEMA Bamazon;
USE Bamazon;

CREATE TABLE products(
  item_id id MEDIUMINT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(150),
  department_name VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(100),
  PRIMARY KEY (item_id)
);

ALTER TABLE products ADD COLUMN `currency` VARCHAR(6) AFTER `department_name`;
ALTER TABLE products AUTO_INCREMENT = 78546;

ALTER TABLE products
DROP COLUMN $;

update products
	set product_name="Boots"
	where item_id=78550;


insert products(product_name, department_name, currency, price, stock_quantity)
value
('Polo Ralph Lauren',"Clothes","$", 49.15, 48),
('Beats by Dr. Dre',"Electronics","$", 299.29, 280),
('Apple Watch',"Electronics","$", 499.99, 565),
('Polished Bismark Link Bracelet In 14k Rose Gold',"Jewelry","$", 889.44, 2),
('Karen Scott Dresses',"Clothes","$", 395.56, 86),
('Birkenstock Mayari',"Shoes","$", 151.55, 206),
('SONY 60"',"Electronics","$", 779, 4200),
('Nike Kids Free RN',"Kids","$", 139.56, 16);



SELECT * FROM Bamazon.products;
