import path from 'path'
import recCopy from 'recursive-copy'
import chalk from 'chalk'
import rimraf from 'rimraf'

export default function copy(additionalPath="") {
  console.log(chalk.yellow('Copying directory...'))
  recCopy(path.join(additionalPath), `${global.build_dir}/${global.main_dir}`, (err, results) => {
    if (err) throw err
    console.log(chalk.green(`Directory copied`))
    rimraf.sync(`${global.build_dir}/${global.main_dir}/${global.build_dir}`)
  })
}
