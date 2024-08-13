import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the output path for generated files
const outputPath = path.join(__dirname, 'outputs');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true }); // Also create any parent directories if they don't exist
}

// Function to execute a C++ file and capture its output
const executeCpp = (filepath, input_filePath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        // Command to compile and execute the C++ file
        exec(
            `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && ./${jobId}.exe < "${input_filePath}"`,//use .\\${jobId}.exe for windows
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                    return;
                }
                if (stderr) {
                    console.warn(`Warnings: ${stderr}`);
                }
                resolve(stdout);
            }
        );
    });
};

export default executeCpp;
