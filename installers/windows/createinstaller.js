const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creando instalador de inleggo.io')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join(outPath, 'inleggo.io-win32-ia32'),
       authors: 'Inleggo.io Inc.',
       noMsi: true,
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'Inleggo.io.exe',
       setupExe: 'Inleggo.exe',
       setupIcon: 'logo.ico'
   })
}
