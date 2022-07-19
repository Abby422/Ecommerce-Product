----Product Count sp------
CREATE OR ALTER PROCEDURE spAlterCount
(@productID INT, @count INT)
AS
BEGIN
DECLARE @checkCount INT
SET @checkCount = (SELECT Quantity FROM Product WHERE Product_id = @productID)

 UPDATE Product 
    SET 
    Quantity = @checkCount - @count
    WHERE
    Product_id = @productID;
    
END
GO

----- End of Count product ------


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
    CREATE OR ALTER PROC spUpdateProduct(@productID INT,
    @productName VARCHAR(255), @productDesc VARCHAR(255), @productImg VARCHAR(255), @productPrice INT, @discount INT
    )
    AS
    BEGIN
    SELECT Product_image, Product_name, Product_description, Product_price,
    Discount
    FROM Product WHERE Product_id = @productID

    UPDATE Product 
    SET 
    Product_image = @productImg,
    Product_name = @productName,
    Product_description = @productDesc,
    Product_price = @productPrice,
    Discount = @discount
    WHERE
    Product_id = @productID;
    END
    GO
---- End of spUpdateProduct --------


----- Get all Products ------
CREATE OR ALTER PROC spGetAllProducts
AS
BEGIN
SELECT * FROM Product
END
----- End of get all products -------




----- http://blog.aspneter.com/Images/no-thumb.jpg ------

------https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg-----