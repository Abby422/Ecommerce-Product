
CREATE OR ALTER PROCEDURE [dbo].[RegisterUser]
(@userName VARCHAR(255), @email VARCHAR(255), @name VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    INSERT INTO Users(Username, Email, Name, Password) 
    VALUES (@userName, @email , @name , @password)
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
( @UserId INT, @Quantity INT, @total INT, @ProductId INT)
AS
BEGIN
    INSERT INTO Orders(User_Id, Quantity, total) 
    VALUES ('@UserId', '@Quantity', '@total')

END
GO

EXEC dbo.CreateOrder    2,1,125,1
GO

CREATE OR ALTER PROCEDURE [dbo].[EnterOrderDetails]
(@OrderId INT, @ProductId INT)
AS
BEGIN
    INSERT INTO OrderDetails(Order_id, Product_id) 
    VALUES ('@OrderId', '@ProductId')

END

