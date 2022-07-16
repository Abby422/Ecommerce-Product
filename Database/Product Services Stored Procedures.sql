----Product Count sp------



----Add Category ID of product to product table with Category Name -----
CREATE OR ALTER PROCEDURE spAddProduct
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
    CREATE OR ALTER PROC spUpdateProduct(@productID INT)
    AS
    BEGIN
    DELETE FROM Product WHERE Product_id = @productID
    END
    GO
---- End of spDeleteProduct --------




----- http://blog.aspneter.com/Images/no-thumb.jpg ------

------https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg-----