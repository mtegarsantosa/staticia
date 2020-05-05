import path from 'path'
import fs from 'fs'
import recCopy from 'recursive-copy'

export default function generateIndex(template) {
  return new Promise((resolve) => {
    /* Create default folder `js` */
    if (!fs.existsSync(path.join(global.build_dir, 'js'))) {
      fs.mkdirSync(path.join(global.build_dir, 'js'))
    }

    /* Copying `script/staticia.js` to `js/staticia.js` */
    fs.copyFile(`${__dirname}/../builder/scripts/staticia.js`, path.join(global.build_dir, 'staticia', 'staticia.js'), (err) => {
      if (err) throw err
    })

    /* Copying `script/hbs.js` to `js/hbs.js` */
    fs.copyFile(`${__dirname}/../builder/scripts/hbs.js`, path.join(global.build_dir, 'staticia', 'hbs.js'), (err) => {
      if (err) throw err
    })

    /* Copying selected template to Build Directory */
    recCopy(path.join(__dirname, '..', 'builder','templates', template), global.build_dir, (err, results) => {
      if (err) throw err
    })
    resolve()
  })
}
