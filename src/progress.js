import copy from '../lib/copy'
import generateJson from '../lib/generateJson'
import generateIndex from '../lib/generateIndex'
import fs from 'fs'
import rimraf from 'rimraf'

export default function progress(src, template="just-listed") {
  fs.mkdirSync(global.build_dir)
  generateJson(src).then((obj) => {
    generateIndex(obj, template)
  }).catch(err => {
    console.log(err)
  })
  copy(src)

  process.on('uncaughtException', function(err) {
    console.log("Progress Aborted!")
    rimraf.sync(global.build_dir)
    process.exit(1)
  })
}
