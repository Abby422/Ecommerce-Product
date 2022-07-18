
CREATE OR ALTER PROCEDURE [dbo].[RegisterUser]
(@userName VARCHAR(255), @email VARCHAR(255), @name VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    INSERT INTO Users(Username, Email, Name, Password) 
    VALUES (@userName, @email , @name , @password)
END
GO

CREATE OR ALTER PROCEDURE [dbo].[LoginUser]
(@email VARCHAR(255),  @password VARCHAR(255))
AS
BEGIN
    SELECT *FROM Users WHERE Email = @email
END
GO 

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
    INSERT INTO Orders
    (User_Id, Quantity, total) 
    VALUES 
    (@UserId, @Quantity, @total)

END
GO

CREATE OR ALTER PROCEDURE [dbo].[SelectOrder]
( @UserId INT)
AS
BEGIN
    SELECT Order_id FROM Orders WHERE User_Id = @UserId
END
GO

-- EXEC dbo.SelectOrder 3

CREATE OR ALTER PROCEDURE [dbo].[EnterOrderDetails]
(@OrderId INT, @ProductId INT)
AS
BEGIN
    INSERT INTO OrderDetails
    (Order_id, Product_id) 
    VALUES (@OrderId, @ProductId)
END
GO

