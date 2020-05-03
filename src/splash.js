import figlet from 'figlet'
import chalk from 'chalk'
export default function splash(){
  let header = figlet.textSync('Staticia', {font:"bell",horizontalLayout:"full"})
  console.log(chalk.yellow(header))
  console.log(chalk.yellow("by arsan (https://github.com/arsandev)"))
  console.log()
  console.log("try:")
  console.log("> staticia -help")
}
