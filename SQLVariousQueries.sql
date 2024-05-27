
-- Para insertar un nuevo usuario
INSERT INTO AppUser (firstName, lastName, username, password, address, locationCityId, email, phoneNumber, birthDate, gender, registrationDate, enabled)
VALUES (@id, @firstName, @lastName, @username, @password, @address, @locationCityId, @email, @phoneNumber, @birthDate, @gender, @registrationDate, @enabled)

-- Actualizar
UPDATE AppUser SET firstName = @firstName, lastName = @lastName, username = @username, password = @password, address = @address, locationCityId = @locationCityId, email = @email, phoneNumber = @phoneNumber, birthDate = @birthDate, gender = @gender, enabled = @enabled WHERE id = @id

--Eliminar
DELETE FROM AppUser WHERE id = @id