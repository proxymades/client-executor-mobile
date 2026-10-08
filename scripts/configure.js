const fs = require('node:fs')
const path = require('node:path')
const file = path.resolve(__dirname, '../config/local.json')
if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '{}\n')
    console.log('Created config/local.json. Set LAN addresses for a physical device.')
}
