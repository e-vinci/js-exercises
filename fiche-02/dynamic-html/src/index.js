// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Custom styles
import "./stylesheets/main.css";

// This is the entry point to your app : add all relevant import and custom code

function createTableWithInitString(
  lineCount = 1,
  columnCount = 1,
  startString = "Cell"
) {
  var myTab = [];
  for (let x = 0; x < lineCount; x++) {
    myTab.push([]);
    for (let y = 0; y < columnCount; y++) {
      myTab[x].push(startString + "[" + x + "][" + y + "]");
    }
  }
  return myTab;
}

function createDynamicHtmlTableWithCreateElement(
  containerSelector,
  arrayToDisplay
) {
  // access to the div container where we want to create a dynamic html table
  const divContainer = document.querySelector(containerSelector);
  // Clear any table from the div_container
  divContainer.innerHTML = "";
  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered text-nowrap";
  // append the new empty table element to the div container
  divContainer.appendChild(myTable);

  for (let x = 0; x < arrayToDisplay.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element
    for (let y = 0; y < arrayToDisplay[0].length; y++) {
      const myCell = document.createElement("td");
      myCell.innerHTML = arrayToDisplay[x][y];
      myLine.appendChild(myCell);
    }
  }
}

const createDynamicHtmlTableWithInnerHtml = (
  containerSelector,
  arrayToDisplay
) => {
  // access to the div container where we want to create a dynamic html table
  const divContainer = document.querySelector(containerSelector);
  // Neat way to loop through all data in the array, create a new array of string elements (HTML tr/td tags)
  // with map(), and create one string from the resulting array with join(''). '' means that the separator is a void string.
  let linesHtml = arrayToDisplay
    .map(
      (line) =>
        `<tr>${line.map((column) => `<td>${column}</td>`).join("")}</tr>`
    )
    .join("");
  const tableHtml = `<table class="table table-bordered text-nowrap">
                        ${linesHtml}
                    </table>`;
  divContainer.innerHTML = tableHtml;
};

const myForm = document.querySelector("form");
const btnCreateElement = document.querySelector("#btn1");
const btnInnerHtml = document.querySelector("#btn2");
const linesInput = document.getElementById("lines");
const columnsInput = document.getElementById("columns");
const startStringInput = document.getElementById("startString");

btnCreateElement.addEventListener("click", function (e) {
  // check the validation constraint (not necessary if we deal with a "submit" event on the form)
  if (!myForm.checkValidity()) return;
  console.log("submit from ", e.target.id, this.id);
  e.preventDefault();
  const myArr = createTableWithInitString(
    linesInput.value,
    columnsInput.value,
    startStringInput.value
  );
  createDynamicHtmlTableWithCreateElement("#tableContainer", myArr);
});

btnInnerHtml.addEventListener("click", function (e) {
  // check the validation constraint (not necessary if we deal with a "submit" event on the form)
  if (!myForm.checkValidity()) return;
  console.log("submit from ", e.target.id, this.id);
  e.preventDefault();
  const myArr = createTableWithInitString(
    linesInput.value,
    columnsInput.value,
    startStringInput.value
  );
  createDynamicHtmlTableWithInnerHtml("#tableContainer", myArr);
});
