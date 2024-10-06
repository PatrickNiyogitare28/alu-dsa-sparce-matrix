# Matrix Calculator

This project is a command-line Matrix Calculator that performs operations on sparse matrices.

## Author

Patrick Niyogitare ([p.niyogitar@alustudent.com](https://github.com/patrickniyogitare28))

## Description

The Matrix Calculator is a Node.js application that allows users to perform various operations on sparse matrices. It can add, subtract, and multiply matrices, as well as transpose them. The program reads matrix data from text files and presents an interactive console interface for users to choose operations.

## Features

- Import sparse matrices from text files
- Add two matrices
- Subtract one matrix from another
- Multiply two matrices
- Transpose a matrix
- Interactive console interface

## Prerequisites

Before running this application, make sure you have Node.js installed on your system. You can download and install Node.js from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory in your terminal.

## Usage

To run the Matrix Calculator, use the following command in your terminal:

```
node index.js
```

Once the program starts, it will:

1. Import matrices from `matrixfile1.txt` and `matrixfile2.txt`.
2. Present you with a menu of operations:
   1. Add
   2. Subtract
   3. Multiply
   4. Quit
3. Enter the number corresponding to the operation you want to perform.
4. View the result of the operation.
5. The program will continue to prompt for operations until you choose to quit.

## Input File Format

The input files (`matrixfile1.txt` and `matrixfile2.txt`) should follow this format:

```
rows=<number_of_rows>
cols=<number_of_columns>
(<row>, <column>, <value>)
(<row>, <column>, <value>)
...
```

For example:

```
rows=3
cols=3
(0, 0, 1)
(1, 1, 2)
(2, 2, 3)
```

This represents a 3x3 sparse matrix with non-zero values at positions (0,0), (1,1), and (2,2).

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/patrickniyogitare28/matrix-calculator/issues) if you want to contribute.

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.