
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