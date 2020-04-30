import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import recDir from 'recursive-readdir'

const obj = []

export default function generateJson(additionalPath="") {
  return new Promise((resolve,reject) => {
    console.log(chalk.yellow("Generating JSON data..."))
    recDir(path.join(additionalPath), function (err, files) {
      if (err) reject(err)
      else {
        files.map(x => {
          let fixUrl, type
          if (additionalPath) {
            let split = x.split(additionalPath)
            fixUrl = split[1]
          }
          else{
            fixUrl = x
          }
          fixUrl = "main\\"+fixUrl
          obj.push({src:fixUrl})
        })
        console.log(chalk.green("JSON generated"))
        resolve(obj)
      }
    })
  })
}
