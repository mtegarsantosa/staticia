import fs from 'fs'
import path from 'path'

const sorting = (obj) => {
  const operator = {
    ordered: {},
    run: (obj) => {
      Object.keys(obj).sort().forEach(function(key) {
        operator.ordered[key] = obj[key]
      })
      return operator
    }
  }
  return operator.run(obj)
}

export default function objectResult(obj) {
  fs.writeFile(path.join(global.build_dir, 'data.js'), `var data = ${JSON.stringify(sorting(obj).ordered)}`, function (err) {
    if (err) throw err
  })
}
