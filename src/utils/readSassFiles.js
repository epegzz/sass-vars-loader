import fs from 'fs'

export default function(files) {
  return files.reduce((vars, filepath) => {
    if (filepath.match(/\.s[ac]ss/)) {
      return [vars, fs.readFileSync(filepath, 'utf8')].join('\n')
    }
    return vars
  }, '')
}
