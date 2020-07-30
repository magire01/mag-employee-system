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

DELETE FROM info WHERE first_name = "Mark";

SELECT * FROM info;