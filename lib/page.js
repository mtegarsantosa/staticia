import path from 'path'
import fs from 'fs'
import recCopy from 'recursive-copy'
import rimraf from 'rimraf'

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
      recCopy(path.join(__dirname, '..', 'builder','templates', template), global.build_dir, (err, results) => {
        if (err) throw err

        /* Delete index.hbs */
        fs.unlink(path.join(global.build_dir, 'index.hbs'), (err) => {
          if (err) throw err
        })

        /* Checking README.md file (from github template) */
        if (fs.existsSync(path.join(global.build_dir, 'README.md'))) {

          /* Remove README.md */
          fs.unlink(path.join(global.build_dir, 'README.md'), (err) => {
            if (err) throw err
          })
        }

        /* Checking GITHUB folder (from github template) */
        fs.access(path.join(global.build_dir, 'GITHUB'), function(err) {
          if (!err) {
            /* Remove GITHUB folder */
            rimraf.sync(path.join(global.build_dir, 'GITHUB'))
          }
        })
      })
    })
    resolve()
  })
}
