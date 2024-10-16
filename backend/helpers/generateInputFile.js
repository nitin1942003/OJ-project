import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dirInputs = path.join(__dirname, 'inputs') 

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, {recursive: true}) //also create any parent directories if they dont exist
}

const generateInputFile = async (input) => {
  const jobId = uuid() //helps create unique filenames
  const filename = `${jobId}.txt`
  const filePath = path.join(dirInputs, filename)

  fs.writeFileSync(filePath, input)

  return filePath
}

export default generateInputFile