

-- Insert major states
INSERT INTO LocationState(name) VALUES ('California');
INSERT INTO LocationState(name) VALUES ('Texas');
INSERT INTO LocationState(name) VALUES ('Florida');
INSERT INTO LocationState(name) VALUES ('New York');
INSERT INTO LocationState(name) VALUES ('Illinois');

-- Insert major cities for each state
-- California (id assumed to be 1)
INSERT INTO LocationCity(locationStateId, name) VALUES 
(11, 'Los Angeles'),
(1, 'San Diego'),
(1, 'San Jose'),
(1, 'San Francisco'),
(1, 'Long Beach'),
(1, 'Fresno'),
(1, 'Sacramento'),
(1, 'Oakland'),
(1, 'Santa Ana'),
(1, 'Anaheim');

-- Texas (id assumed to be 2)
INSERT INTO LocationCity(locationStateId, name) VALUES 
(2, 'Houston'),
(2, 'San Antonio'),
(2, 'Dallas'),
(2, 'Austin'),
(2, 'Fort Worth'),
(2, 'El Paso'),
(2, 'Arlington'),
(2, 'Corpus Christi'),
(2, 'Plano'),
(2, 'Laredo');

-- Florida (id assumed to be 3)
INSERT INTO LocationCity(locationStateId, name) VALUES 
(3, 'Jacksonville'),
(3, 'Miami'),
(3, 'Tampa'),
(3, 'Orlando'),
(3, 'St. Petersburg'),
(3, 'Hialeah'),
(3, 'Tallahassee'),
(3, 'Fort Lauderdale'),
(3, 'Port St. Lucie'),
(3, 'Cape Coral');

-- New York (id assumed to be 4)
INSERT INTO LocationCity(locationStateId, name) VALUES 
(4, 'New York City'),
(4, 'Buffalo'),
(4, 'Rochester'),
(4, 'Yonkers'),
(4, 'Syracuse'),
(4, 'Albany'),
(4, 'New Rochelle'),
(4, 'Mount Vernon'),
(4, 'Schenectady'),
(4, 'Utica');

-- Illinois (id assumed to be 5)
INSERT INTO LocationCity(locationStateId, name) VALUES 
(5, 'Chicago'),
(5, 'Aurora'),
(5, 'Naperville'),
(5, 'Joliet'),
(5, 'Rockford'),
(5, 'Springfield'),
(5, 'Elgin'),
(5, 'Peoria'),
(5, 'Champaign'),
(5, 'Waukegan');


--DELETE FROM AppUser
--Modify the locationCityId if it doesn't match an existing id in your locationCity table
INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender) VALUES ('User1', 'Last1', 'user1', '1234', '330 DeNeve Dr', 116, 'u1@test.com', '3101112222', '1983-06-08', 'M')
INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender) VALUES ('User2', 'Last2', 'user2', '1234', '330 DeNeve Dr', 116, 'u2@test.com', '3101113333', '1983-06-08', 'F')
INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender) VALUES ('User3', 'Last3', 'user3', '1234', '330 DeNeve Dr', 116, 'u3@test.com', '3101114444', '1983-06-08', 'M')
INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender) VALUES ('User4', 'Last4', 'user4', '1234', '330 DeNeve Dr', 116, 'u4@test.com', '3101115555', '1983-06-08', 'F')

INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender) VALUES ('Admin', 'Last1', 'admin', '1234', '330 DeNeve Dr', 116, 'admin@test.com', '3101119999', '1983-06-08', 'M')
--SELECT * FROM AppUser

--DELETE FROM AppRole
INSERT INTO AppRole (name, description, enabled) VALUES ('admin', 'No restrictions', 1)
INSERT INTO AppRole (name, description, enabled) VALUES ('user', 'Normal user restrictions', 1)
--SELECT * FROM AppRole