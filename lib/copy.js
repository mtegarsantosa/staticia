import path from 'path'
import recCopy from 'recursive-copy'
import rimraf from 'rimraf'

export default function copy(additionalPath="") {
  return new Promise((resolve) => {
    recCopy(path.join(additionalPath), `${global.build_dir}/${global.main_dir}`, (err, results) => {
      if (err) throw err
      resolve()
    })
  })
}
