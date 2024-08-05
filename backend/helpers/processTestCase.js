import generateInputFile from './generateInputFile.js';
import executeCpp from './executeCpp.js';
import executePy from './executePy.js';
import executeJava from './executeJava.js';

const processTestCase = async (language, codeFilePath, input, expectedOutput) => {
    try {
        const inputFilePath = await generateInputFile(input);
        let userOutput;

        switch (language) {
            case 'cpp':
                userOutput = await executeCpp(codeFilePath, inputFilePath);
                break;
            case 'py':
                userOutput = await executePy(codeFilePath, inputFilePath);
                break;
            case 'java':
                userOutput = await executeJava(codeFilePath, inputFilePath);
                break;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }

        const isCorrect = userOutput.trim() === expectedOutput.trim();
        return { input, expectedOutput, userOutput, isCorrect };
    } catch (error) {
        return { input, expectedOutput, error: error.message || error, isCorrect: false };
    }
};

export default processTestCase;
