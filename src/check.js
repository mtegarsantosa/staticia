import path from 'path'
import fs from 'fs'
import recDir from 'recursive-readdir'
import chalk from 'chalk'
import splash from './splash'

const pathTemplate = __dirname+'/../builder/templates'
const executedDir = process.cwd()
const exit = () => process.exit(1)
const templateList = fs.readdirSync(path.join(pathTemplate))

export default function({ src, template, list }, callback) {
    if (typeof callback !== 'function') throw "Callback must be a function"
    if (src[0]) {
      var args0 = (src[0] === ".") ? "" : src[0]
      if (!fs.existsSync(path.join(executedDir, args0))) return console.log(chalk.yellow(`Error: Directory {${args0}} doesn't exist`)), exit()
    }
    if (list) {
        console.log()
        console.log(chalk.yellow('List of templates: '));
        templateList.forEach(template => {
            console.log('- ' + template)
        })
        exit()
    }

    if (template && !fs.existsSync(pathTemplate + '/' + template)) {
        console.log(chalk.red(`Error: Template ${template} doesn't exist, try another template`, '\n'))
        console.log('See available template :')
        console.log('staticia --list            list of template')
        console.log('or')
        console.log('staticia --help            help')
        exit()
    }

    if (!src[0]) {
      splash()
    }
    else{
      callback(args0, template || undefined)
    }
}
