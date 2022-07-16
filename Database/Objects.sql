-- CREATE TABLE Users(
--     User_Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--     Username VARCHAR(255) NOT NULL UNIQUE,
--     Email VARCHAR(255) NOT NULL UNIQUE,
--     Name VARCHAR(255) NOT NULL UNIQUE,
--     Password VARCHAR(255) NOT NULL,
--     Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     IsDeleted BIT NOT NULL DEFAULT 0,
--     User_role VARCHAR(50) DEFAULT 'User' NOT NULL
-- );

SELECT * FROM users

-- UPDATE Users
-- SET User_role = 'Admin'
-- WHERE User_Id = 1

-- CREATE TABLE Product(
--     Product_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--     Category_id INT NOT NULL FOREIGN KEY REFERENCES ProductCategory(Category_id),
--     Product_image  VARCHAR(MAX) NOT NULL,
--     Product_name  VARCHAR(255) NOT NULL,
--     Product_description VARCHAR(6000) NOT NULL,
--     Product_price INT NOT NULL,
--     Quantity INT NOT NULL,
--     Discount INT,
--     Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     IsAvailable BIT NOT NULL DEFAULT 0
-- );
DROP TABLE Product
-- CREATE TABLE ProductCategory(
--     Category_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--     Categroy_name VARCHAR(6000)
-- );

-- SELECT * FROM Users WHERE IsDeleted = 0

INSERT INTO ProductCategory VALUES ('Kitchen and Dining');
INSERT INTO ProductCategory VALUES ('Living Room')
INSERT INTO ProductCategory VALUES ('Bedroom')
INSERT INTO ProductCategory VALUES ('Lighting')

SELECT *FROM ProductCategory
SELECT *FROM Product

INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80', 'Simpleware', ' Cutlery, anyone? This simple and minimal wooden cutlery set is great for your kitchen and is what you need at every stage of your life. Don’t worry about wasting another dollar, our beautiful utensils are made for you to use again and again!
', '125', '20' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1518882095374-cf178783cdc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Trueceramic', 'The Cup is an elegant and sophisticated addition to any personal care routine. The silicone rubber body material is easy to grip, creating a sturdy and secure hold without being too heavy or bulky to use. It is an ideal vessel for coffee, tea, and other hot or cold drinks. Its slim look and portability creates beauty for wherever it is used.
', '150', '10' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1615659080593-2248cc4213fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGN1cHMlMjBhbmQlMjBtdWdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Peakceramic', 'Wrap your favorite beverage in luxury unaltered by the outside world. You deserve the best and so does your drink. Pressed without the use of chemicals or synthetic materials, the purest stainless steel doesn’t corrode and won’t change color molds or mildews to change the taste of the drink.', '140', '80' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1610726390560-49954c8cb752?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGxhdGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Aviblack', 'This simple and modern plate is beautiful and elegant and very affordable and comes with the beautiful spoons. The are so simple to clean and they also make your food look amazing.Forget trying to juggle plates, salt, pepper and a fork and knife. Perfect for serving, this is dishwasher and microwave safe too.
', '100', '20' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1462015679637-c0c320830925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYXRlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Highand', 'Every home needs a dining set that fits its style and decor. This beautiful multi colured dining set is just gorgeous and perfect for any style. It is also a chic, sophisticated set made with high quality materials.', '200', '90' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1545874239-30867bd8f206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBsYXRlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Whiteline', 'We can assure that the Dining Set is the perfect addition to your home or for gifting.This dining set is white, sleek, and aesthetic and will match any style of decoration.This ensemble is the perfect size that it’s compact and easy to store when not in use. It is a lovely set to be displayed on a dining table or even in the living room.\nIt is exquisite and it looks great with every color.', '350', '67' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1554671557-0def73b2e67e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80', 'Upwooden', 'This amazing new product is perfect for families who like to have time to spend with each other in their homes. The design features a large natural wood table with a 3 long banquette on the right side and the left side boasts a pull out banquette with two chairs. The chairs are made out of natural wooden material which are one of the only materials that can be described as sustainable and eco-friendly. The table comes with a natural wood top and square shaped ends.', '600', '10' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Outdining', 'This amazing family table with minimal black chairs and a gray top with a black bottom is perfect for dinner parties or just everyday family fun!', '705', '17' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Diningdash', 'The beautifully minimal white table for two is elegant and easy to blend with your home. The chairs can be adjusted to your personal liking, featuring a stylish pattern on the back of each seat. It seats two (or two people), making it the perfect dining spot in your home.
', '550', '55' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1618733103584-be6b3ffd26b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', 'Woodenscope', 'Get the stylish and durable Wooden Table, perfect for entertaining at home. Made of MDF, this solid and sturdy design is built to last, with unique seats available in a variety of colors. Black resin chairs are a personal choice as a relaxing place to grab a drink, use as a coffee table, or as an accent piece.
', '890', '9' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', 'Sparkset', 'Our glass dining sets are designed to contain the food safely and prevent any bacteria, dirt, or other particulates from entering the food.', '899', '5' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('1' , 'The popular family table features a geometric design in a beautiful sage green color. It can seat 4 children with no problems. The family table has four adjustable chairs with beautiful sage green fabric on the seat and back. It can be used in the dining room or elsewhere in the house. The low height makes it easy for the kids to eat on their seats. This is definitely a great family table for your home.', 'Woodenup', 'The popular family table features a geometric design in a beautiful sage green color. It can seat 4 children with no problems. The family table has four adjustable chairs with beautiful sage green fabric on the seat and back. It can be used in the dining room or elsewhere in the house. The low height makes it easy for the kids to eat on their seats. This is definitely a great family table for your home.', '999', '13' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Artscope', 'Every room needs a touch of life, whether it is  a quick impulse buy or something that creates a new home for your furniture. This wall art goes from neutral to chic in seconds and can be as simple or ornate as you desire, with a dash of white paint in the middle and a touch of gold paint around the side.', '499', '58' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Artboost', 'Flying through the air, effortlessly floating around the room. It is the perfect size to hang in a small hallway. This wall hanging has a natural beauty with its scattered leaves.', '399', '11' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/flagged/photo-1551373916-bdaddbf4f881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHdhbGwlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 'Wallture', 'Get your minimal, modern wall art with our most extensive collection of vinyl wall decals. The classic design will look as good as new for years!', '259', '8' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1616952391192-d8bc85de60d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Everwarm', 'You will never be cold sitting in EverWarms armchair. The chairs circular body and brushed steel legs set the stage for a contemporary and traditional design. Its fabric cover adds a lovely touch and is machine washable. The chairs steel base is sturdy and can withstand up to 250 pounds.', '1199', '5' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1631701601945-414a32dbef47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Couchstripe', 'The Couch is a statement piece for your living room. With its sleek lines and unbelievable comfort, it is a must have!', '509', '17' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Cocouch', 'Effortlessly comfortable and put together in a perfect room-pleasing combination, this all-natural wood mattress, wood frame, and wood seat cushion setup is both durable and attractive.', '450', '18' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1509512693283-8178ed23e04c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'PeakWarm', 'For comfortable, beautiful living room furniture, choose the Couch by Roxannett. We designed a chrome-finished, over-stuffed, comfortable couch for a forever place that leaves you relaxed and ready to enjoy every part of your home.', '1499', '15' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Accentsync', 'The Couch is a plush, comfortable and beautiful couch. A fun and different look in your living room.', '999', '20' );
INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES ('2' , 'https://images.unsplash.com/photo-1534889156217-d643df14f14a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Accentrise', 'The sturdy wood and strong design of this beautiful couch is perfect addition for your living room. Modern and extremely comfortable, this couch is what you have been waiting for!', '999', '10' );
