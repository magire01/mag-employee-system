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

const viewEmployees = () => {
    const query = ("SELECT * FROM info");
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("id   |   first_name   |   last_name   |   title   |   department   |   salary   |   manager   ");
        console.log("--   |   ----------   |   ---------   |   -----   |   ----------   |   ------   |   -------   ");
        console.log(res[0].id + "   " + res[0].first_name + "   " + res[0].last_name + "   " + res[0].title + "   " + res[0].department + "   " + res[0].salary + "   " + res[0].manager);
    });
}

//Start beginning prompt
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
                // addEmployee(); - call function
                break;
            case "Remove Employee":
                console.log("Remove Employee SELECTED");
                // removeEmployee(); - call function
                break;
            default:
                console.log("Exit SELECTED");
                // exitApp(); - call function
        }
    });
}

startApp();