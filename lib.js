const fileSystem = require("fs");

class SparseMatrixProcessor {
  static importFromTextFile(path) {
    const data = { rows: 0, cols: 0, data: [] };
    
    try {
      const content = fileSystem.readFileSync(path, "utf-8").split("\n");
      data.rows = Number(content[0].split("=")[1]);
      data.cols = Number(content[1].split("=")[1]);
      
      const validateEntry = /^\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+\s*\)$/;
      
      for (let lineNum = 2; lineNum < content.length; lineNum++) {
        const currentLine = content[lineNum].trim();
        if (!currentLine) continue;
        
        if (validateEntry.test(currentLine)) {
          const [x, y, val] = currentLine
            .slice(1, -1)
            .split(",")
            .map(str => parseInt(str.trim()));
          
          data.data.push({ x, y, val });
        } else {
          throw new Error(`Malformed entry at line ${lineNum + 1}`);
        }
      }
      
      return data;
    } catch (err) {
      console.error(`Failed to process file: ${err.message}`);
      throw new Error("Unable to process matrix file");
    }
  }

  static combine(first, second, operation) {
    if (first.rows !== second.rows || first.cols !== second.cols) {
      throw new Error("Matrix dimensions must match");
    }

    const result = {
      rows: first.rows,
      cols: first.cols,
      data: []
    };

    const secondMap = new Map(
      second.data.map(item => [`${item.x},${item.y}`, item.val])
    );

    const processEntry = (entry, isFromFirst = true) => {
      const key = `${entry.x},${entry.y}`;
      const otherVal = isFromFirst ? (secondMap.get(key) || 0) : 0;
      const calculatedVal = isFromFirst 
        ? operation(entry.val, otherVal)
        : operation(0, entry.val);
      
      if (calculatedVal !== 0) {
        result.data.push({
          x: entry.x,
          y: entry.y,
          val: calculatedVal
        });
      }
      
      if (isFromFirst) {
        secondMap.delete(key);
      }
    };

    first.data.forEach(entry => processEntry(entry));
    
    second.data.forEach(entry => {
      if (secondMap.has(`${entry.x},${entry.y}`)) {
        processEntry(entry, false);
      }
    });

    return result;
  }

  static sum(first, second) {
    return SparseMatrixProcessor.combine(first, second, (a, b) => a + b);
  }

  static difference(first, second) {
    return SparseMatrixProcessor.combine(first, second, (a, b) => a - b);
  }

  static product(first, second) {
    if (first.cols !== second.rows) {
      throw new Error("First matrix columns must match second matrix rows");
    }

    const output = {
      rows: first.rows,
      cols: second.cols,
      data: []
    };

    const secondByRow = second.data.reduce((acc, item) => {
      if (!acc[item.x]) acc[item.x] = {};
      acc[item.x][item.y] = item.val;
      return acc;
    }, {});

    const resultMap = new Map();

    first.data.forEach(item1 => {
      const rowVals = secondByRow[item1.y];
      if (rowVals) {
        Object.entries(rowVals).forEach(([col, val2]) => {
          const key = `${item1.x},${col}`;
          const current = resultMap.get(key) || 0;
          resultMap.set(key, current + (item1.val * val2));
        });
      }
    });

    resultMap.forEach((val, key) => {
      if (val !== 0) {
        const [x, y] = key.split(",").map(Number);
        output.data.push({ x, y, val });
      }
    });

    return output;
  }

  static flip(matrix) {
    return {
      rows: matrix.cols,
      cols: matrix.rows,
      data: matrix.data.map(({ x, y, val }) => ({ x: y, y: x, val }))
    };
  }
}

module.exports = {
  importMatrix: SparseMatrixProcessor.importFromTextFile,
  addMatrices: SparseMatrixProcessor.sum,
  subtractMatrices: SparseMatrixProcessor.difference,
  multiplyMatrices: SparseMatrixProcessor.product,
  transposeMatrix: SparseMatrixProcessor.flip
};