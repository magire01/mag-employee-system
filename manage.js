//npms
const inquirer = require("inquirer");
const mysql = require("mysql");


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
            type: "input",
            message: "Please enter employee title: ",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter employee department: ",
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
    const names = []
    connection.query(`SELECT * FROM info`, (err, res) => {
        if (err) throw err;
        for(var i = 0; i < res.length; i++) {
            names.push(res[i].first_name);
        }

        inquirer.prompt([
            {
                type: "list",
                message: "Select employee to delete",
                choices: names,
                name: "action"
            }
        ]).then(answer => {
            console.log(answer.action + " selected!");
            connection.query(
                `DELETE FROM info WHERE ?`,
                {
                    first_name: answer.action
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
        console.log("id   |   first_name   |   last_name   |   title   |   department   |   salary   |   manager   ");
        console.log("--   |   ----------   |   ---------   |   -----   |   ----------   |   ------   |   -------   ");
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].id + "   " + res[i].first_name + "   " + res[i].last_name + "   " + res[i].title + "   " + res[i].department + "   " + res[i].salary + "   " + res[i].manager);
        }
        startApp();
    });
        
}

const startApp = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            choices: ["View All Employees", "View Employees By Department", "View Employees By Manager", "Add Employee","Remove Employee", "Exit"],
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
                // viewEmployeeDept(); - call function
                break;
            case "View Employees By Manager":
                console.log("View Employees By Manager SELECTED");
                // viewEmployeeMgr(); - call function
                break;
            case "Add Employee":
                console.log("Add Employee SELECTED");
                addEmployee();
                break;
            case "Remove Employee":
                console.log("Remove Employee SELECTED");
                removeEmployee();
                break;
            default:
                console.log("Exit SELECTED");
                connection.end();
        }
    });
}
//Start beginning prompt
startApp();