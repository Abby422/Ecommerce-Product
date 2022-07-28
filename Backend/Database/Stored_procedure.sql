SELECT *FROM Users
GO
CREATE OR ALTER PROCEDURE [dbo].[RegisterUser]
(@userName VARCHAR(255), @email VARCHAR(255), @name VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    INSERT INTO Users(Username, Email, Name, Password) 
    VALUES (@userName,@email ,@name , @password)
END
GO

CREATE OR ALTER PROCEDURE [dbo].[LoginUser]
(@email VARCHAR(255))
AS
BEGIN
    SELECT *FROM Users WHERE Email = @email
END
GO

CREATE OR ALTER PROCEDURE [dbo].[UpdateUser]
( @userName VARCHAR(255), @name VARCHAR(255), @email VARCHAR(255))
AS
BEGIN
    UPDATE Users SET Username = '@userName ', Name = ' @name' WHERE Email = '@email'
END
GO
-- SELECT *FROM Users
-- EXEC dbo.LoginUser 'abbyuri22@gmail.com'

CREATE OR ALTER PROCEDURE [dbo].[SearchProduct]
( @Search VARCHAR(255) = NULL)
AS
BEGIN
    SELECT * FROM Product WHERE
    @Search IS NULL
    OR Product_name LIKE '%' + @Search + '%'
END
GO

-- EXEC dbo.SearchProduct 'Cou'

CREATE OR ALTER PROCEDURE [dbo].[CreateOrder]
(@Order_id VARCHAR(255), @UserId INT, @Json VARCHAR(MAX))
AS
BEGIN
    INSERT INTO Orders(Order_id,User_Id) 
    VALUES ('@Order_id', @UserId)

    INSERT INTO OrderDetails (Order_id, Product_id, Quantity, Total)
    SELECT * FROM
    OPENJSON(@Json)
    WITH(Order_id VARCHAR(255), Product_id INT, Quantity INT, Total INT )

END
GO

-- EXEC dbo.CreateOrder '5uw78632', 2, '[{"Order_id": "5uw78632", "Product_id": 7, "Quantity": 1, "Total": 100},{"Order_id": "5uw78632", "Product_id": 5, "Quantity": 1, "Total": 150}]';



    ----Product Count sp------
CREATE OR ALTER PROC spCount(
    @productID INT,
    @count INT

)
AS
BEGIN
DECLARE @checkCount INT
SET @checkCount = (SELECT Quantity FROM Product WHERE Product_id = @productID)

    UPDATE Product
    SET  Quantity = @checkCount - @count
    WHERE Product_id  = @productID; 

END
GO

------End of Count Sp -------

----Add Category ID of product to product table with Category Name -----
CREATE OR ALTER PROC spAddProduct
(@categoryName VARCHAR(255), @productName VARCHAR(255), @productDesc VARCHAR(255), @productImg VARCHAR(255), @productPrice INT, @quantity INT)
AS
BEGIN
DECLARE @categoryID INT
SET @categoryID = (SELECT Category_id FROM ProductCategory WHERE Categroy_name= @categoryName)

INSERT INTO Product(Category_id, Product_image, Product_name, Product_description, Product_price, Quantity) VALUES (@categoryID , @productImg, @productName, @productDesc, @productPrice, @quantity );

END
GO

spAddProduct 'Bedroom', 'http://blog.aspneter.com/Images/no-thumb.jpg', 'mirror', 'Can see into your soul', 1400, 30 
GO
------End of spAddProduct --------

----Delete product from Product table-------
    CREATE OR ALTER PROC spDeleteProduct(@productID INT)
    AS
    BEGIN
    DELETE FROM Product WHERE Product_id = @productID
    END
    GO
---- End of spDeleteProduct --------

----Update product from Product table-------
    CREATE OR ALTER PROC spUpdateProduct(
        @productID INT,
        @productName VARCHAR(255),
        @productDesc VARCHAR(MAX),
        @productPrice INT,
        @quantity INT,
        @discount INT = 0
        )
    AS
    BEGIN
    DECLARE @newPrice INT = @productPrice - @discount
    UPDATE Product
    SET  Product_name = @productName, Product_description = @productDesc, Product_price = @newPrice, Quantity = @quantity, Discount = @discount
    WHERE Product_id  = @productID;   

    END
    GO
---- End of spUpdateProduct --------


-----Get all Products ------
CREATE OR ALTER PROC spGetAllProduct
AS
BEGIN
SELECT * FROM Product 
END
GO

------ End of all Products -----

-----Create Admin -----
CREATE OR ALTER PROC spAdmin(
    @userID INT
)
AS
BEGIN
    UPDATE Users
    SET User_role = 'Admin'
    WHERE User_Id = @userID

END
GO
-- spAdmin 3
----End of Create Admin------


EXEC spOneProduct 2
GO
-----End of get product by id---


----Delete product-----
CREATE OR ALTER PROC spDeleteProduct(@productID INT)
AS
BEGIN
        UPDATE Product
    SET  isDeleted = 0
    WHERE Product_id  = @productID;
END
GO

-----end of Delete product----


----- http://blog.aspneter.com/Images/no-thumb.jpg ------

------https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg-----