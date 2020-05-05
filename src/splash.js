import figlet from 'figlet'
import chalk from 'chalk'
export default function splash() {
    const header = figlet.textSync('Staticia', { font: "Bell", horizontalLayout: "full" })
    console.log(chalk.yellow("Welcome to"))
    console.log(chalk.yellow(header))
    console.log('- A CLI to Generate Static Index Directory Html -')
    console.log()
    console.log("usage: staticia <dir>")
    console.log();
    console.log('More command: ');
    console.log("> staticia --help")
}
