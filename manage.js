
//npms
const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");



//Create Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fortnoy4@@",
    database: "employee_system"
});

//functions

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter employee ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Please enter employee first name: ",
            name: "firstName"
        },
        {
            type: "input",
            message: "Please enter employee last name: ",
            name: "lastName"
        },
        {
            type: "list",
            message: "Please select employee title: ",
            choices: ["Sales Associate", "Sales Lead", "Marketing Assocaite", "Marketing Lead", "Customer Service Rep", "Customer Service Lead", "Manager"],
            name: "title"
        },
        {
            type: "list",
            message: "Please select employee department: ",
            choices: ["Sales", "Marketing", "Customer Service"],
            name: "department"
        },
        {
            type: "input",
            message: "Please enter employee salary: ",
            name: "salary"
        },
        {
            type: "input",
            message: "Please enter employee manager: ",
            name: "manager"
        },
    ]).then(({ id, firstName, lastName, title, department, salary, manager }) => {
        connection.query(
        `INSERT INTO info SET ?`,
        {
            id: id, 
            first_name: firstName, 
            last_name: lastName, 
            title: title, 
            department: department, 
            salary: salary, 
            manager: manager
        },
        (err, res) => {
            if (err) throw err;
            console.log(`Successfully Added employee ${firstName} ${lastName}!`);
            viewEmployees();
            startApp();
        }
    )
    });
}

const removeEmployee = () => {
    const id = []
    connection.query(`SELECT * FROM info`, (err, res) => {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            id.push(res[i].id);   
        }

        inquirer.prompt([
            {
                type: "list",
                message: "Select employee to delete",
                choices: id,
                name: "action"
            }
        ]).then(answer => {
            console.log(answer.action + " selected!");
            connection.query(
                `DELETE FROM info WHERE ?`,
                {
                    id: answer.action
                }
            )
            startApp();
        });
    
    })
}
    

const viewEmployees = () => {
    const query = ("SELECT * FROM info");
    connection.query(query, (err, res) => {
        if (err) throw err;
        
        // console.log("id   |   first_name   |   last_name   |   title   |   department   |   salary   |   manager   ");
        // console.log("--   |   ----------   |   ---------   |   -----   |   ----------   |   ------   |   -------   ");
        // for(var i = 0; i < res.length; i++) {
        //     // console.log(res[i].id + "   " + res[i].first_name + "   " + res[i].last_name + "   " + res[i].title + "   " + res[i].department + "   " + res[i].salary + "   " + res[i].manager);
        console.log("Result: ");
        console.table(res);

        
        startApp();
    });
        
}

const viewEmployeeDept = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select a department",
            choices: ["Sales", "Marketing", "Customer Service"],
            name: "action"
        }
    ]).then(answer => {
        connection.query(
            `SELECT department, id, first_name, last_name, title FROM info WHERE department = ?`, [answer.action], (err, res) => {
                console.log("Results")
                console.table(res);
        }
        )
        startApp();
    });
}

const viewEmployeeMgr = () => {
    const managerName = []
    connection.query(`SELECT DISTINCT manager FROM info`, (err, res) => {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            managerName.push(res[i].manager);   
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Please select a manager",
                choices: managerName,
                name: "action"
            }
        ]).then(answer => {
            connection.query(
                `SELECT manager, id, first_name, last_name, title, department FROM info WHERE manager = ?`, [answer.action], (err, res) => {
                    if (err) throw err;
                    console.log("Results: ")
                    console.table(res);
             
                    startApp();
                }
            )
        })
        
    })
    
}

const updateEmployeeRole = () => {
    const employeeID = []
    connection.query(`SELECT * FROM info`, (err, res) => {
        if (err) throw err;
        console.log(res);
        for(var i = 0; i < res.length; i++) {
            employeeID.push(res[i].id);   
        }
        console.log(employeeID);
        inquirer.prompt([
            {
                type: "list",
                message: "Please select an employee ID",
                choices: employeeID,
                name: "action"
            }
        ]).then(answer => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Please select a new Role",
                    choices: ["Sales Associate", "Sales Lead", "Marketing Assocaite", "Marketing Lead", "Customer Service Rep", "Customer Service Lead", "Manager"],
                    name: "roleAction"
                }
            ]).then(answer2 => {
                connection.query(`UPDATE info SET title = ? WHERE id = ?`,[answer2.roleAction, answer.action], (err, res) => {
                    console.log("Role updated to " + answer2.roleAction);
                });
                startApp();
            })
            
        });
    });
}

const updateEmployeeMgr = () => {
    const employeeID = [];
    connection.query(`SELECT * FROM info`, (err, res) => {
        if (err) throw err;
        console.log(res);
        for(var i = 0; i < res.length; i++) {
            employeeID.push(res[i].id); 
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Please select an employee ID",
                choices: employeeID,
                name: "action"
            }
        ]).then(answer => {
            const managerName = []
            connection.query(`SELECT DISTINCT manager FROM info`, (err, res) => {
                if (err) throw err;
                for(var i = 0; i < res.length; i++) {
                    managerName.push(res[i].manager);   
                }
                console.log(managerName);
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Please select a new Manager",
                        choices: managerName,
                        name: "mgrAction"
                    }
                ]).then(answer2 => {
                    connection.query(`UPDATE info SET manager = ? WHERE id = ?`,[answer2.mgrAction, answer.action], (err, res) => {
                        console.log("Manager updated to " + answer2.mgrAction);
                    });
                    startApp();
                })
            
            });
        });
    });
}

const startApp = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            choices: ["View All Employees", "View Employees By Department", "View Employees By Manager", "Add Employee","Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"],
            name: "action"
        }
    ]).then(answer => {
        switch(answer.action) {
            case "View All Employees":
                console.log("View All Employees SELECTED");
                viewEmployees();
                break;
            case "View Employees By Department":
                console.log("View Employees By Department SELECTED");
                viewEmployeeDept();
                break;
            case "View Employees By Manager":
                console.log("View Employees By Manager SELECTED");
                viewEmployeeMgr();
                break;
            case "Add Employee":
                console.log("Add Employee SELECTED");
                addEmployee();
                break;
            case "Remove Employee":
                console.log("Remove Employee SELECTED");
                removeEmployee();
                break;
            case "Update Employee Role":
                console.log("Update Employee Role SELECTED");
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                console.log("Update Employee Manager SELECTED");
                updateEmployeeMgr();
                break;
            default:
                console.log("Exit SELECTED");
                connection.end();
        }
    });
}
//Start beginning prompt
startApp();