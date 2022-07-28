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

SELECT *
FROM users

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
--     Discount INT DEFAULT 0,
--     Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     IsAvailable BIT NOT NULL DEFAULT 1,
--     isDeleted BIT NOT NULL DEFAULT 0,
-- );
-- DROP TABLE Product

-- CREATE TABLE ProductCategory(
--     Category_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
--     Categroy_name VARCHAR(6000)
-- );

-- CREATE TABLE Orders(
--     Order_id VARCHAR(255) NOT NULL PRIMARY KEY,
--     User_Id INT NOT NULL  FOREIGN KEY REFERENCES Users(User_Id),
--     Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     IsCanceled BIT DEFAULT 0
-- )

-- CREATE TABLE OrderDetails(
--     Order_id VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Orders(Order_id),
--     Product_id INT NOT NULL FOREIGN KEY REFERENCES Product(Product_id),
--     Quantity INT NOT NULL,
--     Total INT NOT NULL,
--     IsCanceled BIT DEFAULT 0
-- )
-- GO



DELETE
FROM Orders

-- INSERT INTO ProductCategory VALUES ('Kitchen and Dining');
-- INSERT INTO ProductCategory VALUES ('Living Room')
-- INSERT INTO ProductCategory VALUES ('Bedroom')
-- INSERT INTO ProductCategory VALUES ('Lighting')

SELECT *FROM ProductCategory
SELECT *FROM Product
SELECT *FROM Users
SELECT *FROM Orders
SELECT *FROM OrderDetails

SELECT *
FROM ProductCategory
WHERE (Categroy_name) LIKE ''
-- JOIN Product
-- ON  Category_id = Category_id 

-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80', 'Simpleware - Cutlery', ' Cutlery, anyone? This simple and minimal wooden cutlery set is great for your kitchen and is what you need at every stage of your life. Don’t worry about wasting another dollar, our beautiful utensils are made for you to use again and again!', 125, 20 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1518882095374-cf178783cdc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Trueceramic - Cup', 'The Cup is an elegant and sophisticated addition to any personal care routine. The silicone rubber body material is easy to grip, creating a sturdy and secure hold without being too heavy or bulky to use. It is an ideal vessel for coffee, tea, and other hot or cold drinks. Its slim look and portability creates beauty for wherever it is used.', 150, 10 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1, 'https://images.unsplash.com/photo-1615659080593-2248cc4213fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGN1cHMlMjBhbmQlMjBtdWdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Peakceramic - Cup', 'Wrap your favorite beverage in luxury unaltered by the outside world. You deserve the best and so does your drink. Pressed without the use of chemicals or synthetic materials, the purest stainless steel doesn’t corrode and won’t change color molds or mildews to change the taste of the drink.', 140, 80 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1610726390560-49954c8cb752?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGxhdGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Aviblack - Plate', 'This simple and modern plate is beautiful and elegant and very affordable and comes with the beautiful spoons. The are so simple to clean and they also make your food look amazing.Forget trying to juggle plates, salt, pepper and a fork and knife. Perfect for serving, this is dishwasher and microwave safe too.', 100, 20 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1462015679637-c0c320830925?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYXRlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Highand - Dinnerware set', 'Every home needs a dining set that fits its style and decor. This beautiful multi colured dining set is just gorgeous and perfect for any style. It is also a chic, sophisticated set made with high quality materials.', 200, 90 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1545874239-30867bd8f206?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBsYXRlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Whiteline - Dinnerware set', 'We can assure that the Dining Set is the perfect addition to your home or for gifting.This dining set is white, sleek, and aesthetic and will match any style of decoration.This ensemble is the perfect size that it’s compact and easy to store when not in use. It is a lovely set to be displayed on a dining table or even in the living room. It is exquisite and it looks great with every color.', 350, 67 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1554671557-0def73b2e67e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80', 'Upwooden - Dining Table', 'This amazing new product is perfect for families who like to have time to spend with each other in their homes. The design features a large natural wood table with a 3 long banquette on the right side and the left side boasts a pull out banquette with two chairs. The chairs are made out of natural wooden material which are one of the only materials that can be described as sustainable and eco-friendly. The table comes with a natural wood top and square shaped ends.', 600, 10 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Outdining - Dining Table', 'This amazing family table with minimal black chairs and a gray top with a black bottom is perfect for dinner parties or just everyday family fun!', 705, 17 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Diningdash - Dining Table', 'The beautifully minimal white table for two is elegant and easy to blend with your home. The chairs can be adjusted to your personal liking, featuring a stylish pattern on the back of each seat. It seats two (or two people), making it the perfect dining spot in your home.', 550, 55 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1618733103584-be6b3ffd26b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', 'Woodenscope - Dining Table', 'Get the stylish and durable Wooden Table, perfect for entertaining at home. Made of MDF, this solid and sturdy design is built to last, with unique seats available in a variety of colors. Black resin chairs are a personal choice as a relaxing place to grab a drink, use as a coffee table, or as an accent piece.', 890, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', 'Sparkset - Dining Table', 'Our glass dining sets are designed to contain the food safely and prevent any bacteria, dirt, or other particulates from entering the food.', 899, 5 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (1 , 'https://images.unsplash.com/photo-1580047953685-a23d5cf51f54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Woodenup - Dining Table', 'The popular family table features a geometric design in a beautiful light grey color. It can seat 4 children with no problems. The family table has four adjustable chairs with beautiful sage green fabric on the seat and back. It can be used in the dining room or elsewhere in the house. The low height makes it easy for the kids to eat on their seats. This is definitely a great family table for your home.', 999, 13 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Artscope - Wall Art', 'Every room needs a touch of life, whether it is  a quick impulse buy or something that creates a new home for your furniture. This wall art goes from neutral to chic in seconds and can be as simple or ornate as you desire, with a dash of white paint in the middle and a touch of gold paint around the side.', 499, 58 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Artboost - Wall Art', 'Flying through the air, effortlessly floating around the room. It is the perfect size to hang in a small hallway. This wall hanging has a natural beauty with its scattered leaves.', 399, 11 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/flagged/photo-1551373916-bdaddbf4f881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHdhbGwlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 'Wallture - Wall Art', 'Get your minimal, modern wall art with our most extensive collection of vinyl wall decals. The classic design will look as good as new for years!', 259, 8 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1616952391192-d8bc85de60d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Everwarm - Couch', 'You will never be cold sitting in EverWarms armchair. The chairs circular body and brushed steel legs set the stage for a contemporary and traditional design. Its fabric cover adds a lovely touch and is machine washable. The chairs steel base is sturdy and can withstand up to 250 pounds.', 1199, 5 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1631701601945-414a32dbef47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Couchstripe - Couch', 'The Couch is a statement piece for your living room. With its sleek lines and unbelievable comfort, it is a must have!', 509, 17 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Cocouch - Couch', 'Effortlessly comfortable and put together in a perfect room-pleasing combination, this all-natural wood mattress, wood frame, and wood seat cushion setup is both durable and attractive.', 450, 18 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1509512693283-8178ed23e04c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'PeakWarm - Couch', 'For comfortable, beautiful living room furniture, choose the Couch by Roxannett. We designed a chrome-finished, over-stuffed, comfortable couch for a forever place that leaves you relaxed and ready to enjoy every part of your home.', 1499, 15 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Accentsync - Couch', 'The Couch is a plush, comfortable and beautiful couch. A fun and different look in your living room.', 999, 20 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1534889156217-d643df14f14a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGxpdmluZyUyMHJvb20lMjBjb3VjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', 'Accentrise - Couch', 'The sturdy wood and strong design of this beautiful couch is perfect addition for your living room. Modern and extremely comfortable, this couch is what you have been waiting for!', 999, 10 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2 , 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y291Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 'The No-Sag Velvet Sofa - Couch', 'This ergonomic, low-profile velvet sofa perfectly fits your living room. The no-sag seating, with plush cushions and deep, supportive seats, will keep you comfortable and cozy all evening, whether you are watching a movie or hanging out with friends. It also has a couple of extra zippers for drinks and snacks.', 1099, 5 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60 ', 'Eliza the couch - Couch ', ' This is the couch for you! Lovingly crafted and then hand-stitched with a trait of utmost love for all products, it is a perfect fit for any room. This is the couch for you.', 369, 7 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1604061986761-d9d0cc41b0d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60 ', ' Interstellar - Couch', 'If you are looking for a stylish but comfy couch and matching coffee table, look no further. This modern, supersonic couch has a high back and wide arms to offer plenty of support and make you feel high in the sky. With both pieces available here, you will get it at your door in just a week. ', 439, 21 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1510877073473-6d4545e9c2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60 ', ' Induco Coffee Table', ' With its modern and stylish design, the coffee table is sleek yet still has a minimal design that can be used to fit your personality as well as your needs. With its steel frame and wooden top, the coffee table is stylish and functional and is suitable for a variety of rooms of your home or office spaces. Take advantage of the modern and stylish coffee table that is available in three different colors to suit your personality.', 469, 14 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, ' https://images.unsplash.com/photo-1616873424982-e406f6af8eef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Sky Couch ', 'This sleek and stylish couch is sure to be the center of any living room. The tan leather upholstery will keep you looking and feeling at home while the extra wide cushions give you plenty of room to kick back and relax. Add your favorite modern style coffee table, complete with a chrome frame and sticky rubber feet, and you will have the perfect place to unwind. ', 349, 10 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60 ', ' NordicSlab - Coffee Table', ' Made of 100% Wood (specifically, Brazilian Rosewood) this slab coffee table is as modern and stylish as it is natural Down To Earth. Its smooth and shiny polish ensures that the wood grain is not only still visible but also enhanced. It slips into your music room, living room or wherever you would like your tray to be for the perfect homage to rustic, natural charm.', 579, 23 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60 ', ' Shekara - Coffee Table', ' This is a unique table with a wonderful vintage vibe. The lid opens up and there are lots of room for a different activity such as a game or a dresser. The top is made of solid wood, it is stained nicely and has a beautiful dark finish as well as a carved design that looks a little like a treasure chest.  The bottom has a solid platform to keep your feet from scratching them. In order to help the table maintain a tidy look to the room.', 159, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, ' https://images.unsplash.com/photo-1603204077167-2fa0397f591f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Steppal - Coffee Table', 'If your home could use an update, this modern and sleek coffee table will provide a wonderful addition. Made for modern living the Asymmetrical table features a natural finished veneer and comes in a light brown finish, which will complement any room. Accent your living room, kitchen, or bedroom, with this modern and sleek coffee table. ', 259, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, 'https://images.unsplash.com/photo-1617638924751-cc232f82ecf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60 ', ' EmpireLift - Coffee Table', 'Enhance your home with this beautiful coffee table! With a vintage vibe this table is a lovely addition to your living area. Bring this amazing piece of furniture with you wherever you go! ', 199, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, ' https://images.unsplash.com/photo-1588622673923-83a6e5fe723d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'Jenny coffee table ', ' Small and compact but decidedly spacious, the Jenny coffee table offers a modern take on modern design. With its large, honed mirror faceted top, the Jenny is an intriguing addition to any room. Jennys sleek curved legs boast a sleek modern feel. From its three-legged base to its mirrored top and curved legs, the Jenny offers a surprisingly spacious and stylish addition to any room.', 155, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, ' ', ' ', ' ', 959, 9 );
-- INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (2, ' ', ' ', ' ', 890, 12 );
-- GO
