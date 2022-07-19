
CREATE OR ALTER PROCEDURE [dbo].[RegisterUser]
(@userName VARCHAR(255), @email VARCHAR(255), @name VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    INSERT INTO Users(Username, Email, Name, Password) 
    VALUES ('@userName','@email ','@name ', '@password')
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
( @UserId INT, @Quantity INT, @total INT)
AS
BEGIN
    INSERT INTO Orders(User_Id, Quantity, total) 
    VALUES ('@UserId', '@Quantity', '@total')

END
GO

EXEC dbo.CreateOrder    2,1,125
GO
-- SELECT *FROM Orders
-- DELETE 
-- FROM
-- Orders
-- WHERE
-- Order_id = 2

CREATE OR ALTER PROCEDURE [dbo].[EnterProducts]
( @ProductId INT)
AS
BEGIN
    INSERT INTO Temp_Orders
    VALUES (@ProductId)
END

INSERT INTO Temp_Orders ()
    VALUES (1,2,3)
GO




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
        @discount INT
        )
    AS
    BEGIN
    UPDATE Product
    SET  Product_name = @productName, Product_description = @productDesc, Product_price = @productPrice, Quantity = @quantity, Discount = @discount
    WHERE Product_id  = @productID;   

    END
    GO
---- End of spUpdateProduct --------


-----Get all Products ------
CREATE OR ALTER PROC spGetAllProduct(
    @productID INT
)
AS
BEGIN
SELECT * FROM Product WHERE Product_id = @productID
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

----End of Create Admin------




----- http://blog.aspneter.com/Images/no-thumb.jpg ------

------https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg-----