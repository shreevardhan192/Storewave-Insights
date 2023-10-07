// output.js
// Function to parse query parameters from the URL
function parseQueryParameters() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const traffic = JSON.parse(decodeURIComponent(urlParams.get('traffic')));
  const sales = JSON.parse(decodeURIComponent(urlParams.get('sales')));
  return { traffic, sales };
}

// Get data from query parameters and process it
const { traffic, sales } = parseQueryParameters();

// Initialise Association array to zeros
const Association_list = Array(25).fill(0);

// Association Data Generating Function
function Association(i, j, Tr_Data, Sales_Data) {
  if (Sales_Data >= 1.5 || Tr_Data > 5) {
    Association_list[j] = Sales_Data / Tr_Data;
  }
}

// Association Data Generating Process
let j = 0;
for (let i = 0; i < 5; i++) {
  while (j < (i + 1) * 5) {
    Association(i, j, traffic[i], sales[j]);
    j++;
  }
}

// Association Data Analysis
j = 0;
let output = '';

for (let i = 0; i < 5; i++) {
  let groupOutput = '';

  while (j < (i + 1) * 5) {
    let rackColor = '';

    if (!(sales[j] >= 1.5 || traffic[i] > 5)) {
      rackColor = 'gray';
      groupOutput += `<div class="grid-item ${rackColor}">Move Item ${j + 1} to Rack ${i} as it has low Sales and low Traffic OR to Rack ${i+2} under discount rates </div>`;
    } else if (Association_list[j] <= 0.2) {
      rackColor = 'red';
      let count = i === 0 ? 1 : i;
      groupOutput += `<div class="grid-item ${rackColor}">Move Item ${j + 1} to Rack ${count} due to Less Sales Rate despite High Traffic</div>`;
    } else if (Association_list[j] >= 1.2) {
      rackColor = 'blue';
      groupOutput += `<div class="grid-item ${rackColor}">Move Item ${j + 1} to Rack ${i + 2} for better sales since it has less Traffic Flow</div>`;
    } else {
      rackColor = 'green';
      groupOutput += `<div class="grid-item ${rackColor}">Item ${j + 1} is placed in correct position/rack</div>`;
    }
    j++;

    if (j < (i + 1) * 5) {
      groupOutput += '<hr>';
    }
  }

  if (groupOutput !== '') {
    output += `<div class="output-group">${groupOutput}</div>`;
  }
}

document.getElementById('output').innerHTML = output;
