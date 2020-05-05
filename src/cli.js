import progress from './progress'
import splash from './splash'
import cmdCheck from './cmd-check'
import './config'
import yargs from 'yargs'

const argv = yargs
    .command('{directory}', 'Generate static file html from specific directory')
    .option('template', {
        description: 'Change template on build',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv

// console.log(argv)
// process.exit(1)

export function cli() {
    const args = argv['_']
    let args0

    if (args.length > 0) {
        args0 = (args[0] === ".") ? "" : args[0]
        cmdCheck({
            src: args0,
            template: argv['template'],
            list: argv['list']
        }, progress)
    } else {
        splash()
    }
}