CREATE TABLE Users(
    User_Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Name VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BIT NOT NULL DEFAULT 0,
    User_role VARCHAR(50) DEFAULT 'User' NOT NULL
);

-- UPDATE Users
-- SET User_role = 'Admin'
-- WHERE User_Id = 1

CREATE TABLE Product(
    Product_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Category_id INT NOT NULL FOREIGN KEY REFERENCES ProductCategory(Category_id),
    Product_image  VARCHAR(MAX) NOT NULL DEFAULT 'http://blog.aspneter.com/Images/no-thumb.jpg',
    Product_name  VARCHAR(255) NOT NULL,
    Product_description VARCHAR(6000) NOT NULL,
    Product_price INT NOT NULL,
    Quantity INT NOT NULL,
    Discount INT,
    Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    IsAvailable BIT NOT NULL DEFAULT 0
);

CREATE TABLE ProductCategory(
    Category_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Categroy_name VARCHAR(6000)
);


-- SELECT * FROM Users WHERE IsDeleted = 0