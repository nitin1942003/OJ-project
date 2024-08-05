import generateFile from "../helpers/generateFile.js"
import executeCpp from "../helpers/executeCpp.js"
import executePy from "../helpers/executePy.js"
import executeJava from "../helpers/executeJava.js"
import generateInputFile from "../helpers/generateInputFile.js"

const run = async (req, res) => {
  const { language = 'cpp', code, input } = req.body // If lang not provided by user, treat the code as cpp type by default

  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty"})
  }

  try {
    const filePath = await generateFile(language, code)
    const inputFilePath = await generateInputFile(input)
    let output
    switch (language) {
      case 'cpp':
        output = await executeCpp(filePath, inputFilePath)
        break
      case 'py':
        output = await executePy(filePath, inputFilePath)
        break
      case 'java':
        output = await executeJava(filePath, inputFilePath)
        break
    }
    console.log(filePath)
    console.log(inputFilePath)
    console.log(output)
    res.json({filePath, inputFilePath, output})
  } catch (error) {
    console.log(error)
    res.json({ output: error.stderr })

  }
}

export default run