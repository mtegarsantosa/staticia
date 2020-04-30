import figlet from 'figlet'
import chalk from 'chalk'
export default function splash(){
  let header = figlet.textSync('static-dir', {font:"epic",horizontalLayout:"full"})+" by arsan (https://github.com/arsandev)"
  console.log(chalk.green(header))
  console.log()
  console.log("static-dir -help")
}
