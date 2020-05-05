import path from 'path'
import fs from 'fs'
import recDir from 'recursive-readdir'

const planjs = {
  results: {file:[]},
  convertToObject: (arr) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > 1) {
        var keyo = "", urlParams = ""
        for (var j = 0; j < arr[i].length-1; j++) {
          keyo += `['${arr[i][j]}']`
          if (eval(`!planjs.results${keyo}`)) eval(`planjs.results${keyo} = {file:[]}`)
        }
        let r = eval(`planjs.results${keyo}.file`)
        if (r) {
          r.push({
            name:arr[i].slice(-1)[0],
            ext:path.extname(`/${arr[i].slice(-1)[0]}`).toLowerCase()
          })
        }
        else {
          console.log()
          console.log()
          throw `Error: cannot copy this file: ${arr[i].join("\\")}`
        }
      }
      else {
        planjs.results.file.push({
          name:arr[i][0],
          ext:path.extname(`/${arr[i].slice(-1)[0]}`)
        })
      }
    }
    return planjs.results
  }
}

export default function generateJson(additionalPath="") {
  return new Promise((resolve,reject) => {
    recDir(path.join(additionalPath), function (err, files) {
      const arr = []
      if (err) reject(err)
      else {
        files.map(x => {
          let fixUrl, type
          if (additionalPath) {
            let splitUrl = x.split(additionalPath)
            fixUrl = splitUrl[1].charAt(0) === "\\" ? splitUrl[1].substring(1) : splitUrl[1]
          }
          else{
            fixUrl = x
          }
          let splitArr = fixUrl.split("\\")
          arr.push(splitArr)
        })
        let convert = planjs.convertToObject(arr)
        resolve(convert)
      }
    })
  })
}
