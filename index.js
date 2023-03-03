const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const watch = require('recursive-watch')

process.argv[3] = process.argv[3] ? process.argv[3] : ''

const dirToWatch = process.argv[2]
const hostname = process.argv[3].split(':')[0]
const whereToCopy = process.argv[3].substring(process.argv[3].indexOf(':') + 1)

if (!dirToWatch || hostname === '' || whereToCopy === '') {
  console.error(
    `Usage : ${
      process.argv[1].split('\\')[process.argv[1].split('\\').length - 1]
    } SRC_DIR HOST:DEST_DIR`,
  )
  return
}

console.clear()
console.warn('info : This script cannot create any directories !')
console.log('\n')
console.log(" # Watching directory : '" + dirToWatch + "'")
console.log(' # Changes will overwrite the files at "' + hostname + '" in : "' + whereToCopy + '"')

/**
 * @param {String} eventType ["rename" = created or removed | "change" : exist and changed]
 */
watch(dirToWatch, (_filePath) => {
  let filePath = _filePath.substr(dirToWatch.length)
  console.log(filePath)
  fs.access(path.join(dirToWatch, filePath), fs.F_OK, (err) => {
    if (err) {
      console.log('Is removed !')
      removeFile(filePath)
      return
    }

    console.log('Is changed ')
    addOrChangeFile(filePath)
  })
})

function addOrChangeFile(filePath) {
  console.log(
    `scp -r  ${path.join(dirToWatch, filePath)} ${hostname}:${path.join(
      whereToCopy,
      filePath,
    )}`,
  )
  exec(
    `scp -r "${path.join(dirToWatch, filePath)}" ${hostname}:"${path.join(
      whereToCopy,
      filePath,
    )}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      if (stdout) {
        console.log(`${stderr}`)
        return
      }
    },
  )
}

function removeFile(filePath) {
  exec(
    `ssh ${hostname} "rm -f ${path.join(dirToWatch, filePath)}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }

      console.log(`stdout: ${stdout}`)
    },
  )
}
