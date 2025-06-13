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

// Function to extract class name from Java file content
const extractClassName = (filepath) => {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    console.log('Java file content:', content);
    // Match both public and non-public classes
    const classMatch = content.match(/(?:public\s+)?class\s+(\w+)/);
    console.log('Class match:', classMatch);
    if (classMatch && classMatch[1]) {
      const className = classMatch[1];
      console.log('Extracted class name:', className);
      return className;
    }
    throw new Error('Could not find class in Java file');
  } catch (error) {
    console.error('Error reading or parsing Java file:', error);
    throw error;
  }
};

// Function to make class non-public
const makeClassNonPublic = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  // Replace 'public class' with just 'class'
  const modifiedContent = content.replace(/public\s+class/, 'class');
  fs.writeFileSync(filepath, modifiedContent);
};

// Function to execute a Java file and capture its output
const executeJava = (filepath, input_filePath) => {
  console.log('Executing Java file:', filepath);
  const className = extractClassName(filepath);
  console.log('Using class name:', className);

  // Make the class non-public to avoid filename requirement
  makeClassNonPublic(filepath);

  return new Promise((resolve, reject) => {
    const compileAndRunCommand = `javac "${filepath}" -d "${outputPath}" && java -cp "${outputPath}" ${className} < "${input_filePath}"`;
    console.log('Executing command:', compileAndRunCommand);

    exec(
      compileAndRunCommand,
      (error, stdout, stderr) => {
        if (error) {
          console.error('Execution error:', error);
          console.error('stderr:', stderr);
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
