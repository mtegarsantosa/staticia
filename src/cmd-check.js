import path from 'path'
import fs from 'fs'
import recDir from 'recursive-readdir'
import chalk from 'chalk'

const pathTemplate = './builder/templates'
const executedDir = process.cwd()
const exit = () => process.exit(1)
const templateList = fs.readdirSync(path.join(pathTemplate))

export default function({ src, template, list }, callback) {
    if (typeof callback !== 'function') throw "Callback must be an function"
    if (!fs.existsSync(path.join(executedDir, src))) return console.log(chalk.yellow(`Error: Directory of {${src}} is not exist`)), exit()
    if (list) {
        console.log('List of templates: ');
        templateList.forEach(template => {
            console.log('- ' + template)
        })
        exit()
    }

    if (template && !fs.existsSync(pathTemplate + '/' + template)) {
        console.log(chalk.red(`Error: Template of ${template} is not exist, try another template`, '\n'))
        console.log('To look available themplate :')
        console.log('staticia --list            list of template')
        console.log('or')
        console.log('staticia --help            help')
        exit()
    }

    callback(src, template)
}