import progress from './progress'
import splash from './splash'
import './config'
import yargs from 'yargs'
const argv = yargs
.command('{folder}', 'Generate static file html from spesific directory')
.option('template', {
    description: 'Change template on build',
    type: 'string',
})
.help()
.alias('help', 'h')
.argv

export function cli(){
  var args = argv["_"]
  if (args.length > 0) {
    var args0 = args[0] === "." ? "" : args[0]
    progress(args0, argv["template"])
  }
  else
    splash()
}
