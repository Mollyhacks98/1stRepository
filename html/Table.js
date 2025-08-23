// Select the table element
const table = document.querySelector("table");

// Function to print all table data in console (just as a static example)
function printTableData() {
  const rows = table.querySelectorAll("tbody tr");
  console.log("Programming Languages Table Data:\n");

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll("td");
    const rowData = Array.from(cells).map(cell => cell.textContent).join(" | ");
    console.log(`Row ${index + 1}: ${rowData}`);
  });
}

// Call the function immediately
printTableData();

// Optional: Add a static message
console.log("Table loaded successfully with no active listeners.");
