DROP DATABASE IF EXISTS employee_system;
CREATE database employee_system;
USE employee_system;

CREATE TABLE info (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    title VARCHAR(20) NOT NULL,
    department VARCHAR(20) NOT NULL,
    salary INT NULL,
    manager VARCHAR(40) NULL
);

INSERT INTO info (id, first_name, last_name, title, department, salary, manager)
VALUES (1244, "Mark", "Gire", "Sales Lead", "Sales", 65000, "Sarah Cullen");
INSERT INTO info (id, first_name, last_name, title, department, salary, manager)
VALUES (1455, "Alex", "Gire", "Sales Associate", "Sales", 65000, "Sarah Cullen");
INSERT INTO info (id, first_name, last_name, title, department, salary, manager)
VALUES (1488, "Rich", "Gire", "Marketing Lead", "Marketing", 85000, "Marge Simpson");
INSERT INTO info (id, first_name, last_name, title, department, salary, manager)
VALUES (1135, "Jerry", "Morris", "Manager", "Customer Service", 85000, "John Denver");

UPDATE info SET title = "Manager" WHERE id = 1488;

SELECT department, id, first_name, last_name FROM info WHERE department = "Marketing";

SELECT * FROM info;