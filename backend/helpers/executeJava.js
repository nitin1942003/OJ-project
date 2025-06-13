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

// Function to execute a Java file and capture its output
const executeJava = (filepath, input_filePath) => {
  const jobId = path.basename(filepath).split(".")[0]; // Get the filename without extension
  const className = jobId.replace(/-/g, '_'); // Replace dashes with underscores to match the generated class name

  return new Promise((resolve, reject) => {
    exec(
      // First compile the Java code, then run the class
      `javac "${filepath}" -d "${outputPath}" && java -cp "${outputPath}" ${className} < "${input_filePath}"`,
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

export default executeJava;
