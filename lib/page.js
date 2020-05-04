import path from 'path'
import fs from 'fs'
import recCopy from 'recursive-copy'

export default function generateIndex(template) {
  return new Promise((resolve) => {
    /* Create default folder `js` */
    if (!fs.existsSync(path.join(global.build_dir, 'js'))) {
      fs.mkdirSync(path.join(global.build_dir, 'js'))
    }

    /* Read `index.hbs` file to write */
    var templateDir = `${__dirname}/../builder/templates/${template}/index.hbs`
    fs.readFile(`${__dirname}/../builder/templates/${template}/index.hbs`, 'utf8', function(err, html){
      if (err) throw err

      /* Write `index.html` from `index.hbs` */
      fs.writeFile(path.join(global.build_dir, 'index.html'), html, function (err) {
        if (err) throw err
      })

      /* Copying `script/staticia.js` to `js/staticia.js` */
      fs.copyFile(`${__dirname}/../builder/scripts/staticia.js`, path.join(global.build_dir, 'js', 'staticia.js'), (err) => {
        if (err) throw err
      })

      /* Copying `script/hbs.js` to `js/hbs.js` */
      fs.copyFile(`${__dirname}/../builder/scripts/hbs.js`, path.join(global.build_dir, 'js', 'hbs.js'), (err) => {
        if (err) throw err
      })

      /* Copying selected template to Build Directory */
      recCopy(path.join(__dirname, '..', 'builder','templates', template), global.build_dir, {filter: ['!index.hbs','!README.md','!/GITHUB']}, (err, results) => {
        if (err) throw err
      })
    })
    resolve()
  })
}
