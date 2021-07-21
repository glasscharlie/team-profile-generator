const Employee = require('../lib/Employee')
const Manager = require('../lib/Manager')
const Engineer = require('../lib//Engineer')
const Intern = require('../lib/Intern')
const inquirer = require('inquirer')
const fs = require('fs')
let teamMembers = []


function getManager() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name',
          },
        {
          type: 'input',
          name: 'id',
          message: 'What is your employee id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email adress?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?',
        },
        {
          type: 'rawlist',
          name: 'teamMember',
          message: 'Do you want to add an Employee?',
          choices:['Engineer', 'Intern', 'No']
        },
    
      ])
      .then((answers) => {
        teamMembers.push(new Manager(answers.name,answers.id,answers.email, answers.officeNumber))
        
        switch(answers.teamMember) {
            case 'Engineer':
              getEngineer()
              break;
            case 'Intern':
              getIntern()
              break;
            default:
                generateHTML()
          }
})
}

function getEngineer() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is their name',
          },
        {
          type: 'input',
          name: 'id',
          message: 'What is your their id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email adress?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their Github?',
        },
        {
          type: 'rawlist',
          name: 'teamMember',
          message: 'Do you want to add another Employee?',
          choices:['Engineer', 'Intern', 'No']
        },
    
      ])
      .then((answers) => {
        teamMembers.push(new Engineer(answers.name,answers.id,answers.email, answers.github))
        switch(answers.teamMember) {
            case 'Engineer':
              getEngineer()
              break;
            case 'Intern':
              getIntern()
              break;
            default:
              generateHTML()
          }
})
}

function getIntern() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is their name',
          },
        {
          type: 'input',
          name: 'id',
          message: 'What is your their id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email adress?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school do they go to?',
        },
        {
          type: 'rawlist',
          name: 'teamMember',
          message: 'Do you want to add another Employee?',
          choices:['Engineer', 'Intern', 'No']
        },
    
      ])
      .then((answers) => {
        teamMembers.push(new Intern(answers.name,answers.id,answers.email, answers.school))
        switch(answers.teamMember) {
            case 'Engineer':
              getEngineer()
              break;
            case 'Intern':
              getIntern()
              break;
            default:
              generateHTML()
          }

})
}

function generateHTML() {
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <title>Document</title>
    </head>
    <body>`
    for (let i = 0; i < teamMembers.length; i++) {
        if(teamMembers[i].getRole() === 'Manager') {
        const card = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${teamMembers[i].name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].getRole()}</h6>
          <br>
          <a href="mailto: ${teamMembers[i].email}" class="card-link">Email: ${teamMembers[i].email}</a>
          <p class="card-link">Office Number: ${teamMembers[i].officeNumber}</p>
        </div>
      </div>`
        
      const newhtml = html + card
      html = newhtml
    }
    else if(teamMembers[i].getRole() === 'Engineer') {
        const card = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${teamMembers[i].name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].getRole()}</h6>
          <br>
          <a href="mailto: ${teamMembers[i].email}" class="card-link">Email: ${teamMembers[i].email}</a>
          <a href="${teamMembers[i].github}" target="_blank" class="card-link">Github: ${teamMembers[i].github}</a>
        </div>
      </div>`
        
      const newhtml = html + card
      html = newhtml
    }
    else {
        const card = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${teamMembers[i].name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${teamMembers[i].getRole()}</h6>
          <br>
          <p class="card-link">School: ${teamMembers[i].school}</p>
        </div>
      </div>`
        
      const newhtml = html + card
      html = newhtml
    }
        
    }
        fs.writeFile(`../../index.html`, html, (err) =>
            err ? console.log(err) : console.log('Woohoo')
        );
}

getManager()