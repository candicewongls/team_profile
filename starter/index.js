const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];


async function promptUser() {
  let finished = false; 
  let firstPass = true; 
  let roleChoice = ['Add an Engineer', 'Add an Intern', 'Done building the team'];

  while (!finished) {
    let role = ''; 

    if (!firstPass) {
      const {action}  = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you like to do?',
        choices: roleChoice,
      });
      switch (action) {
        case 'Add an Engineer': {
          role = 'Engineer';
          break;
        }
        case 'Add an Intern': {
          role = 'Intern';
          break;
        }
        case 'Done building the team': {
          finished = true;
          break;
        }
      }
    } else {
      firstPass = false;
      role = 'Manager';
    }

    if (!finished) { 
      const questions = [
        {
          type: 'input',
          name: 'name',
          message: `What is the ${role}'s name?`,
          validate: (value) => { 
            if (value.trim().length === 0) {
              return 'Please enter a name.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'id',
          message: `What is the ${role}'s ID?`,
          validate: (value) => { 
            const valid = !isNaN(parseInt(value));
            return valid || 'Please enter a number.';
          },
        },
        {
          type: 'input',
          name: 'email',
          message: `What is the ${role}'s email address?`,
          validate: (value) => { 
            const valid = /\S+@\S+\.\S+/.test(value);
            return valid || 'Please enter a valid email address.';
          },
        },
      ];

      if (role === 'Manager') {
        questions.push({
          type: 'input',
          name: 'officeNumber',
          message: 'What is the manager\'s office number?',
          validate: (value) => {
            const valid = !isNaN(parseInt(value));
            return valid || 'Please enter a number.';
          },
        });
      } else if (role === 'Engineer') {
        questions.push({
          type: 'input',
          name: 'github',
          message: 'What is the engineer\'s GitHub username?',
          validate: (value) => {
            if (value.trim().length === 0) {
              return 'Please enter a GitHub username.';
            }
            return true;
          },
        });
      } else if (role === 'Intern') {
        questions.push({
          type: 'input',
          name: 'school',
          message: 'What school/college/university is the intern attending?',
          validate: (value) => {
            if (value.trim().length === 0) {
              return 'Please enter the school/college/university\'s name.';
            }
            return true;
          },
        });
      }

      
      const { name, id, email, officeNumber, github, school } = await inquirer.prompt(questions);

      try {
        switch (role) {
          case 'Manager':
            employees.push(new Manager(name, id, email, officeNumber));
            break;
          case 'Engineer':
            employees.push(new Engineer(name, id, email, github));
            break;
          case 'Intern':
            employees.push(new Intern(name, id, email, school));
            break;
        }
        console.log('Employee added!');
      } catch (error) {
        console.error(error.message); 
      }
    }
  }
}


async function init() {
  console.log('Please enter information about each employee. Press Ctrl+C at any time to quit the site.');

  try {
    await promptUser();
  } catch (error) {
    console.error(error);
  }

  const html = render(employees);
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log('Congrats! Team page generated, check out team.html in the output folder to see it.');
  });
}


init();