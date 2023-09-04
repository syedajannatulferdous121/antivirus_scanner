const readline = require('readline');

// Simulated database of known malware signatures
const malwareDatabase = [
  "malware_signature_1",
  "malware_signature_2",
  // Add more malware signatures here
];

// Simulated database of quarantined files
const quarantineDatabase = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to scan a file for malware
function scanFile(fileName, fileContent) {
  for (const signature of malwareDatabase) {
    if (fileContent.includes(signature)) {
      quarantineFile(fileName, fileContent, signature);
      return `Malware found! Signature: ${signature}. File quarantined.`;
    }
  }
  return "File is clean.";
}

// Function to quarantine a file
function quarantineFile(fileName, fileContent, signature) {
  quarantineDatabase.push({ fileName, fileContent, signature, date: new Date() });
}

// Function to list quarantined files
function listQuarantinedFiles() {
  return quarantineDatabase;
}

// Function to remove a file from quarantine
function removeFromQuarantine(fileName) {
  const index = quarantineDatabase.findIndex((file) => file.fileName === fileName);
  if (index !== -1) {
    quarantineDatabase.splice(index, 1);
    return `${fileName} has been removed from quarantine.`;
  }
  return `${fileName} not found in quarantine.`;
}

function startScanner() {
  rl.question("Enter a file name: ", (fileName) => {
    rl.question("Enter the file content: ", (fileContent) => {
      const scanResult = scanFile(fileName, fileContent);
      console.log(scanResult);
      console.log("Quarantined files:");
      console.log(listQuarantinedFiles());

      rl.close();
    });
  });
}

// Start the scanner
startScanner();
