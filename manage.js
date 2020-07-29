const inquirer = require("inquirer");


inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        choices: ["View All Employees", "View Employees By Department", "View Employees By Manager", "Add Employee","Remove Employee", "Exit"],
        name: "action"
    }
]).then(answer => {
    console.log(answer);
})