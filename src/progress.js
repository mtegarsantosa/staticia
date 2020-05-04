import copy from '../lib/copy'
import generateData from '../lib/data'
import generatePage from '../lib/page'
import fs from 'fs'
import chalk from 'chalk'
import rimraf from 'rimraf'
import cliProgress from 'cli-progress'

const bar = new cliProgress.SingleBar({
    format: 'Compiling... |' + chalk.yellow('{bar}') + '| {percentage}% || {value}/{total} Chunks'
}, cliProgress.Presets.shades_classic);

export default function progress(src, template = "starter") {
    src = src.trimRight('/')

    if (fs.existsSync(global.build_dir)) rimraf.sync(global.build_dir)

    fs.mkdirSync(global.build_dir)

    if (!template) template = 'starter'
    console.log(`Starting build static web with template ${template}`);

    bar.start(200, 0)
    generateData(src).then(() => {
        bar.update(50)
        generatePage(template).then(() => {
            bar.update(150)
        })
        copy(src).then(() => {
            bar.update(200)
            bar.stop()
            console.log()
            console.log()
            console.log(chalk.yellow(`cd "${global.build_dir}"`))
        })
    }).catch(err => {
        console.log(err)
    })

    process.on('uncaughtException', function(err) {
        console.log(err)
        rimraf.sync(global.build_dir)
        process.exit(1)
    })
}