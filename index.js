const fs = require("fs");
const readline = require("readline");
const operations = require("./lib");

function printHeader() {
  console.log("==================================================");
  console.log("              THE MATRIX CALCULATOR               ");
  console.log("==================================================");
}

function printSeparator() {
  console.log("--------------------------------------------------");
}

function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log("\nChoose an operation:");
    console.log("1. Add");
    console.log("2. Subtract");
    console.log("3. Multiply");
    console.log("4. Quit");
    rl.question("Enter your choice (1-4): ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function printResult(operation, result) {
  console.log("\n**************** RESULT ****************");
  console.log(`Operation: ${operation.toUpperCase()}`);
  console.log("----------------------------------------");
  console.log(result);
  console.log("****************************************\n");
}

async function main() {
  printHeader();

  console.log("\nImporting matrices...");
  const matrix1 = operations.importMatrix("matrixfile1.txt");
  const matrix2 = operations.importMatrix("matrixfile2.txt");
  const matrix2Transposed = operations.transposeMatrix(matrix2);
  console.log("Matrices imported successfully!");

  while (true) {
    printSeparator();

    const choice = await getUserInput();

    printSeparator();

    let operation, result;
    switch (choice) {
      case "1":
        operation = "add";
        result = operations.addMatrices(matrix1, matrix2);
        break;
      case "2":
        operation = "subtract";
        result = operations.subtractMatrices(matrix1, matrix2);
        break;
      case "3":
        operation = "multiply";
        result = operations.multiplyMatrices(matrix1, matrix2Transposed);
        break;
      case "4":
        console.log("Thank you for using THE MATRIX CALCULATOR!");
        console.log("==================================================");
        return;
      default:
        console.error("Invalid choice. Please enter a number between 1 and 4.");
        continue;
    }

    console.log("Processing...");
    printResult(operation, result);
  }
}

main();