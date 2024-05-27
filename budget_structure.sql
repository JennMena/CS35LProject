drop database BUDGET
create database BUDGET
go

USE BUDGET
go

create table LocationState( -- Province
	id smallint IDENTITY PRIMARY KEY,
    name varchar(100) NOT NULL
)
insert into LocationState(name) values ('California')

create table LocationCity(
	id int IDENTITY PRIMARY KEY,
    locationStateId smallint NOT NULL,
    name varchar(100),
    CONSTRAINT fk_LocationCity_provinceId FOREIGN KEY (locationStateId) REFERENCES LocationState(id)
)
insert into LocationCity(locationStateId, name) values 
(1, 'Los �ngeles'),
(1, 'San Diego'),
(1, 'San Jos�'),
(1, 'San Francisco'),
(1, 'Long Beach'),
(1, 'Fresno'),
(1, 'Sacramento'),
(1, 'Oakland'),
(1, 'Santa Ana'),
(1, 'Anaheim')


CREATE TABLE AppUser(
	id bigint IDENTITY PRIMARY KEY,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(500) NOT NULL, -- In case they want to store encrypted
    address varchar(200),
    locationCityId int NOT NULL,
    email varchar(200),
    phoneNumber varchar(50),
    birthDate date,
    gender varchar(1), -- Just the initial, to avoid duplicating values in the database
    registrationDate datetime DEFAULT(GETDATE()),
    enabled bit DEFAULT(1),
	CONSTRAINT fk_AppUser_locationCityId FOREIGN KEY (locationCityId) REFERENCES LocationCity(id)
)

CREATE TABLE AppRole(
	id int IDENTITY PRIMARY KEY,
    name varchar(100) NOT NULL,
    description varchar(500),
    enabled bit DEFAULT(1)
)

CREATE TABLE Permission(
	id bigint IDENTITY PRIMARY KEY,
    name varchar(100) NOT NULL,
    description varchar(500),
    enabled bit DEFAULT(1)
)

CREATE TABLE AppRolePermission(
    appRoleId int NOT NULL,
    permissionId bigint NOT NULL,
    CONSTRAINT fk_AppRolePermission_roleId FOREIGN KEY (appRoleId) REFERENCES AppRole(id),
    CONSTRAINT fk_AppRolePermission_permissionId FOREIGN KEY (permissionId) REFERENCES Permission(id)
)


CREATE TABLE AppUserAppRole(
	appUserId bigint NOT NULL,
    appRoleId int NOT NULL,
    CONSTRAINT fk_AppUserAppRole_appUserId FOREIGN KEY (appUserId) REFERENCES AppUser(id),
    CONSTRAINT fk_AppUserAppRole_roleId FOREIGN KEY (appRoleId) REFERENCES AppRole(id)
)

CREATE TABLE Category(
	id bigint IDENTITY PRIMARY KEY,
    appUserId bigint NOT NULL,
    name varchar(100) NOT NULL,
    type varchar(1) NOT NULL, -- Income[I] or expense[E]
    description varchar(500),
    enabled bit DEFAULT(1),
    CONSTRAINT fk_Category_userId FOREIGN KEY (appUserId) REFERENCES AppUser(id)
)

CREATE TABLE FinancialTransaction (
	id bigint IDENTITY PRIMARY KEY,
	appUserId bigint NOT NULL,
	categoryId bigint NOT NULL,
	amount money NOT NULL,
	transactionDate datetime DEFAULT(GETDATE()),
	description varchar(500),
	canceled bit DEFAULT(0),
	CONSTRAINT fk_FinancialTransaction_appUserId FOREIGN KEY (appUserId) REFERENCES AppUser(id),
	CONSTRAINT fk_FinancialTransaction_categoryId FOREIGN KEY (categoryId) REFERENCES Category(id)
)

CREATE TABLE FinancialTransactionFixed(
	id bigint IDENTITY PRIMARY KEY,
    appUserId bigint NOT NULL,
    categoryId bigint NOT NULL,
    amount money NOT NULL,
    registrationDate datetime DEFAULT(GETDATE()),
    frequency varchar(20) NOT NULL, -- To determine if it is weekly, monthly, etc.
    dayOfMonth tinyint, -- To set a specific day of the month these fixed should be loaded into the budget
    description varchar(500),
    enabled bit DEFAULT(1),
    CONSTRAINT fk_FinancialTransactionFixed_appUserId FOREIGN KEY (appUserId) REFERENCES AppUser(id),
    CONSTRAINT fk_FinancialTransactionFixed_categoryId FOREIGN KEY (categoryId) REFERENCES Category(id)
)

CREATE TABLE Budget(
	id bigint IDENTITY PRIMARY KEY,
    userId bigint NOT NULL,
    amount money NOT NULL,
    month tinyint NOT NULL,
    year smallint NOT NULL,
    registrationDate datetime DEFAULT(GETDATE()),
    CONSTRAINT fk_Budget_userId FOREIGN KEY (userId) REFERENCES AppUser(id)
)
