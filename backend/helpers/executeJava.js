import { exec } from 'child_process'
const executeJava = async (filepath, inputFilePath) => {//D:\CodeCognizance\backend\helpers\codes\bc4dc755-716d-4083-88e9-a5a42cbf4e58.java
    return new Promise((resolve, reject) => {
        exec(`java "${filepath}" < ${inputFilePath}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr })
                }
                if (stderr) {
                    reject(stderr)
                }
                resolve(stdout)
            }
        )
    })
}

export default executeJava