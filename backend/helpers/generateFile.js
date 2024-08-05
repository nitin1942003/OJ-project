import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dirCodes = path.join(__dirname, 'codes') //D:\CodeCognizance\backend\helpers\codes - path signifies my codes

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true }) //also create any parent directories if they dont exist
}

const generateFile = async (language, code) => {
    const jobId = uuid() //helps create unique filenames
    const filename = `${jobId}.${language}`
    const filePath = path.join(dirCodes, filename)

    fs.writeFileSync(filePath, code)

    return filePath
}
export default generateFile