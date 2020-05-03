import figlet from 'figlet'
import chalk from 'chalk'
export default function splash(){
  let header = figlet.textSync('Staticia', {font:"bell",horizontalLayout:"full"})
  console.log(chalk.yellow("Welcome to"))
  console.log(chalk.yellow(header))
  console.log()
  console.log("try:")
  console.log("> staticia -help")
}
