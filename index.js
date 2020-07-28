const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const writeFileAsync = util.promisify(fs.writeFile);



function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please give a description of your project."
    },
    {
      type: "input",
      name: "installation",
      message: "Please give instructions on how to install your project?"
    },
    {
      type: "input",
      name: "usage",
      message: "Please inform users on how to use your project?"
    },
    {
      type: "input",
      name: "contribution",
      message: "Who helped to contribute to this project? May others contribute to this project?"
    },
    {
      type: "list",
      message: "Select your license of choice for this project",
      name: "license",
      choices: [ 
        { value: 'mit', },
        { value: 'gpl-3.0',},
        { value: 'agpl-3.0',},
      ],
      },
    {
        type: "input",
        name: "tests",
        message: "Are tests included in your project?"
    },
    {
        type: "input",
        name: "github",
        message: "Enter your Github profile address."
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email address."
    }
  ]);
}

function generateREADME(answers) {
  return `
  # ${answers.title} 
  ![license shield](https://img.shields.io/badge/License-${answers.license}-blueviolet.svg)
  ## Badges
  ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

## Description
  ${answers.description}
  

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [contribution](#contribution)
* [Tests](#tests)
* [Questions](#questions)


## Installation
${answers.installation} 

## Usage
${answers.usage} 

## Contribution
${answers.contributing}

##Tests
${answers.tests} 

## License
${answers.license}
  
## Questions
For additional information, please view my Github profile at ${answers.github}

For further information, you may contact me at ${answers.email}
  `;
}

promptUser()
  .then(function(answers) {
    const readme = generateREADME(answers);

    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });