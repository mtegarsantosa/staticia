import path from 'path'
import fs from 'fs'
import recCopy from 'recursive-copy'

export default function generateIndex(template) {
  return new Promise((resolve) => {
    if (!fs.existsSync(path.join(global.build_dir, 'js'))) {
      fs.mkdirSync(path.join(global.build_dir, 'js'))
    }
    var templateDir = `${__dirname}/../builder/templates/${template}/index.hbs`
    fs.readFile(`${__dirname}/../builder/templates/${template}/index.hbs`, 'utf8', function(err, html){
      if (err) throw err
      fs.writeFile(path.join(global.build_dir, 'index.html'), html, function (err) {
        if (err) throw err
      })
      fs.copyFile(`${__dirname}/../builder/scripts/staticia.js`, path.join(global.build_dir, 'js', 'staticia.js'), (err) => {
        if (err) throw err
      })
      fs.copyFile(`${__dirname}/../builder/scripts/hbs.js`, path.join(global.build_dir, 'js', 'hbs.js'), (err) => {
        if (err) throw err
      })
      recCopy(path.join(__dirname, '..', 'builder','templates', template), global.build_dir, (err, results) => {
        if (err) throw err
        fs.unlink(path.join(global.build_dir, 'index.hbs'), (err) => {
          if (err) throw err
        });
      })
    })
    resolve()
  })
}
