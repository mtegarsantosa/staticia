import figlet from 'figlet'
import chalk from 'chalk'
export default function splash() {
    const header = figlet.textSync('Staticia', { font: "Bell", horizontalLayout: "full" })
    console.log(chalk.yellow("Welcome to"))
    console.log(chalk.yellow(header))
    console.log('- One command to convert directory to a directory web -')
    console.log()
    console.log("usage: staticia <dir> --template <template-name>")
    console.log();
    console.log('More command: ');
    console.log("> staticia -help")
}