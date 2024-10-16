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

// Function to execute a Python file and capture its output
const executePython = (filepath, input_filePath) => {
    return new Promise((resolve, reject) => {
        // Command to execute the Python file
        exec(
            `python "${filepath}" < "${input_filePath}"`, // Use 'python3' for Linux/macOS if needed
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

export default executePython;
