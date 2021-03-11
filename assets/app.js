// Starter file provided by Instructor (03/09/2021) AC
const Employee = require('./lib/Employee.js')
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const arr = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function managerPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the team manager\'s name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is the team manager\'s employee ID?',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is the team manager\'s email address?',
                name: 'email'
            },
            {
                type: 'input',
                message: 'What is the team manager\'s office number?',
                name: 'number'
            },
            {
                type: 'rawlist',
                message: 'Add engineer, intern, or quit?',
                name: 'continue',
                choices: [
                    { value: 'Add engineer'},
                    { value: 'Add intern'},
                    { value: 'Quit'}
                ]
            }
        ])
        .then((response) => {
            
            arr.push(new Manager(response.name, response.id, response.email, response.number));
            switch (JSON.stringify(response.continue)) {
                case '"Add engineer"':
                    engineerPrompt();
                    break;
                case '"Add intern"':
                    internPrompt();
                    break;
                case '"Quit"':
                    console.log('quit');
                    console.log(arr);
                    render(arr);
                    break;
                default:
                    console.log('Error');
                    break;
            }
        })
}

function engineerPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the engineer\'s name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is the engineer\'s employee ID?',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is the engineer\'s email address?',
                name: 'email'
            },
            {
                type: 'input',
                message: 'What is the engineer\'s GitHub username?',
                name: 'username'
            },
            {
                type: 'rawlist',
                message: 'Add engineer, intern, or quit?',
                name: 'continue',
                choices: [
                    { value: 'Add engineer'},
                    { value: 'Add intern'},
                    { value: 'Quit'}
                ]
            }
        ])
        .then((response) => {
            Employee.name = response.name;
            Employee.id = response.id;
            Employee.email = response.email;
            Engineer.github = response.username;
            switch (JSON.stringify(response.continue)) {
                case '"Add engineer"':
                    engineerPrompt();
                    break;
                case '"Add intern"':
                    internPrompt();
                    break;
                case '"Quit"':
                    console.log('quit');
                    render(Employee);
                    break;
                default:
                    console.log('Error');
                    break;
            }
        })
}

function internPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the intern\'s name?',
                name: 'name'
            },
            {
                type: 'input',
                message: 'What is the intern\'s employee ID?',
                name: 'id'
            },
            {
                type: 'input',
                message: 'What is the intern\'s email address?',
                name: 'email'
            },
            {
                type: 'input',
                message: 'What is the intern\'s school?',
                name: 'school'
            },
            {
                type: 'rawlist',
                message: 'Add engineer, intern, or quit?',
                name: 'continue',
                choices: [
                    { value: 'Add engineer'},
                    { value: 'Add intern'},
                    { value: 'Quit'}
                ]
            }
        ])
        .then((response) => {
            Employee.name = response.name;
            Employee.id = response.id;
            Employee.email = response.email;
            Intern.school = response.school;
            switch (JSON.stringify(response.continue)) {
                case '"Add engineer"':
                    engineerPrompt();
                    break;
                case '"Add intern"':
                    internPrompt();
                    break;
                case '"Quit"':
                    console.log('quit');
                    render(Employee);
                    break;
                default:
                    console.log('Error');
                    break;
            }
        })
}

managerPrompt();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
