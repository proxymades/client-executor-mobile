const fs = require('node:fs')
const path = require('node:path')
const parser = require('@babel/parser')
const root = path.resolve(__dirname, '..')
const aliases = require('../babel.config').plugins[0][1].alias
function files(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(dir, entry.name)
        return entry.isDirectory() ? files(file) : file.endsWith('.js') ? [file] : []
    })
}
const sourceFiles = [...files(path.join(root, 'src')), path.join(root, 'App.js'), path.join(root, 'index.js')]
for (const file of sourceFiles) {
    const ast = parser.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] })
    for (const node of ast.program.body) {
        if (node.type !== 'ImportDeclaration') continue
        const specifier = node.source.value
        const alias = Object.keys(aliases).find(key => specifier === key || specifier.startsWith(`${key}/`))
        if (!alias && !specifier.startsWith('.')) continue
        const base = alias ? path.resolve(root, aliases[alias], specifier.slice(alias.length + 1)) : path.resolve(path.dirname(file), specifier)
        if (![base, `${base}.js`, `${base}.json`, path.join(base, 'index.js')].some(candidate => fs.existsSync(candidate))) {
            throw new Error(`${path.relative(root, file)}: missing import ${specifier}`)
        }
    }
}
for (const name of ['default.json', 'local.json']) {
    const config = JSON.parse(fs.readFileSync(path.join(root, 'config', name), 'utf8'))
    for (const [key, value] of Object.entries(config)) {
        const url = new URL(value)
        if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error(`Invalid URL in ${name}: ${key}`)
    }
}
console.log(`Mobile syntax, local imports and endpoint configuration checked (${sourceFiles.length} files)`)
