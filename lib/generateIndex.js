import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import Handlebars from 'handlebars'

require.extensions['.hbs'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
}

export default function generateIndex(obj, template) {
  var templateDir = `${__dirname}/../templates/${template}.hbs`
  fs.access(templateDir, fs.F_OK, (err) => {
    if (err) {
      throw "err"
      return
    }
  })
  var source = require(templateDir)
  var template = Handlebars.compile(source)
  var data = { "dirs": obj}
  var result = template(data)

  console.log(chalk.yellow("Generating index.html file..."))
  fs.writeFile(path.join(global.build_dir, 'index.html'), result, function (err) {
    if (err) throw err
    console.log(chalk.green("index.html generated"))
  })
}
