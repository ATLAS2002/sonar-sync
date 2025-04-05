// Example of unused variables (SonarQube will flag this as a code smell)
const unusedVariable = 42;

// Example of a hardcoded password (SonarQube will flag this as a security issue)
const password = "12345";

// Example of a function with no return type and poor naming conventions
function doSomething(a: any, b: any) {
  if (a == b) {
    // Non-strict equality (SonarQube will flag this)
    console.log("Equal");
  } else {
    console.log("Not equal");
  }
}

// Example of a function with too many parameters (SonarQube will flag this as a maintainability issue)
function processData(
  param1: any,
  param2: any,
  param3: any,
  param4: any,
  param5: any,
  param6: any
) {
  console.log(param1, param2, param3, param4, param5, param6);
}

// Example of a function with duplicate code (SonarQube will flag this as a code smell)
function duplicateCodeExample() {
  console.log("This is duplicate code");
  console.log("This is duplicate code");
}

// Example of a function with high cyclomatic complexity (SonarQube will flag this as a maintainability issue)
function complexFunction(x: number) {
  if (x > 0) {
    if (x > 10) {
      if (x > 20) {
        console.log("x is greater than 20");
      } else {
        console.log("x is between 10 and 20");
      }
    } else {
      console.log("x is between 0 and 10");
    }
  } else {
    console.log("x is less than or equal to 0");
  }
}

// Example of a function with no error handling (SonarQube will flag this as a reliability issue)
function riskyOperation() {
  const result = JSON.parse("{ invalidJson }"); // This will throw an error
  console.log(result);
}

// Example of commented-out code (SonarQube will flag this as a code smell)
// function unusedFunction() {
//   console.log("This function is commented out");
// }

// Example of a function with a security vulnerability (SQL injection)
function insecureSQL(query: string) {
  const db = require("mysql").createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });
  db.query(
    "SELECT * FROM users WHERE name = '" + query + "'",
    (err: any, results: any) => {
      if (err) throw err;
      console.log(results);
    }
  );
}
