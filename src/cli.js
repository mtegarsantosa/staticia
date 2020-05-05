import progress from './progress'
import cmdCheck from './check'
import './config'
import yargs from 'yargs'

const argv = yargs
    .command('{directory}', 'Generate static file html from specific directory')
    .option('template', {
        description: 'Change template on build',
        type: 'string',
    })
    .option('list', {
        description: 'See all available templates',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv

// console.log(argv)
// process.exit(1)

export function cli() {
    const args = argv['_']
    cmdCheck({
      src: args,
      template: argv['template'],
      list:argv['list']
    }, progress)
}
