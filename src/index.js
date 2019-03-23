module.exports = function solveSudoku(matrix) {
        solveSudokuHelper(matrix, row = 0, column = 0);
        return matrix;
      };
      
      
      
      
      
      function solveSudokuHelper(matrix, row, column) {
        
        //find 0 cell in matrix
        let cell = getEmptyCell(matrix, row, column);
        
        //install coordinates of empty (0) cell
        row = cell[0];
        column = cell[1];
        
        //base case for recursion if there are no 0 cells
        if (row === -1) {
          return true;
        }
        
        //iterate numbers and put them in empty cell
        for (let number = 1; number <= 9; number ++) {
          if (isAllowed(matrix, row, column, number)) {
            matrix[row][column] = number;
            
            //recursion
            if (solveSudokuHelper(matrix, row, column)) {
              return true;
            }
            
            //if there are no solution reset the cell and try next number
            matrix[row][column] = 0;
          }
          
        }
      
        //if there are no solutions - point of backtracking
       return false; 
      };
        
        
        
        //function for finding 0 cells in matrix
        function getEmptyCell(matrix, row, column) {
          let isDone = false;
          let cellLocation = [-1, -1];
          
          while (!isDone) {
            
            //case in which all strings are iterated, max number of row is 8
            if (row > 8) {
              isDone = true;
              
            } else if (matrix[row][column] === 0) {
              //case in which cell is empty
                cellLocation[0] = row;
                cellLocation[1] = column;
                isDone = true;
                
              } else  if (column < 8) {
              //if cell is full, iterate cells in current row
                column++;
              } else {
                //if row ended, iterate next row
                row ++;
                column = 0;
              }
          };
          return cellLocation;
        };
      
      //function for checking conflicts 
      function isAllowed(matrix, row, column, number) {
        return isRowAllowed(matrix, row, number) && isColumnAllowed(matrix, column, number) && isBoxAllowed(matrix, row, column, number);
      }
      
      //function for checking conflicts in row
      function isRowAllowed(matrix, row, number) {
        for (let i = 0; i < 9; i ++) {
          if (matrix[row][i] === number) {
            return false;
          }
        }
        return true;
      }
      
      
            //function for checking conflicts in column
      function isColumnAllowed(matrix, column, number) {
        for (let i = 0; i < 9; i ++) {
          if (matrix[i][column] === number) {
            return false;
          }
        }
        return true;
      }
      
      //function for checking conflicts in box 3x3
      function isBoxAllowed(matrix, row, column, number) {
        
        //this code make 9 boxes with same (initial) values for rows and cols in each
        //for rows 0, 1, 2 value is 0 etc.
        row = Math.floor(row / 3) * 3;
        column = Math.floor(column / 3) * 3;
        
        for (let i = 0; i < 3; i ++) {
          for (let j = 0; j < 3; j ++) {
            if (matrix[row + i][column + j] === number) {
              return false;
            }
          }
        }
        return true;
      }
        
