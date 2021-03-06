#!/usr/bin/env node

var shell = require('shelljs')
var readlineSync = require('readline-sync')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

// App Name
var appName = readlineSync.question('May I have your App name? ')
console.log('Hello ' + appName + '!')

// Git repo url
var gitUrl = readlineSync.question(
  'What is your git repo url? (or just type enter) ',
  {
    hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
  }
)

shell.echo('make dir at : ' + appName)
shell.mkdir(appName)
shell.cd(appName)

// Run external tool synchronously
if (
  shell.exec('git clone https://github.com/ruucm/react-gui-builder.git .')
    .code !== 0
) {
  shell.echo('Error: Git clone failed')
  shell.exit(1)
} else {
  shell.rm('-rf', '.git')

  // npm install
  if (shell.exec('npm install').code !== 0) {
    shell.echo('Error: npm install failed')
    shell.exit(1)
  } else {
    // Init New Git, when npm installed successfully
    if (gitUrl) {
      if (shell.exec('git init').code !== 0) {
        shell.echo('Error: Git init failed')
        shell.exit(1)
      }

      if (shell.exec('git remote add origin ' + gitUrl).code !== 0) {
        shell.echo('Error: Git remote add origin failed')
        shell.exit(1)
      }

      if (
        shell.exec(
          'git add --all && git commit -m "Init 🎉" && git push origin master'
        ).code !== 0
      ) {
        shell.echo('Error: Git push failed')
        shell.exit(1)
      } else {
        // Run react-gui-builder
        if (shell.exec('npm run dev').code !== 0) {
          shell.echo('Error: npm run dev failed')
          shell.exit(1)
        }
      }
    } else {
      // Run react-gui-builder
      if (shell.exec('npm run dev').code !== 0) {
        shell.echo('Error: npm run dev failed')
        shell.exit(1)
      }
    }
  }
}
