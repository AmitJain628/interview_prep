// Write a function to create a dynamic table based on JSON input and apply styles dynamically.
const jsonData = [
    { "Name": "John", "Age": 30, "City": "New York" },
    { "Name": "Jane", "Age": 25, "City": "Los Angeles" },
    { "Name": "Sam", "Age": 35, "City": "Chicago" },
    { "Name": "Anna", "Age": 28, "City": "Miami" }
  ];

  // Call the function to create the table
  createDynamicTable(jsonData);

  function createDynamicTable(jsonData) {
   
    const tableElement = document.createElement('table')
    let cols = [];
    if (jsonData.length) {
        cols = Object.keys(jsonData[0]);
    }

    let headerElement = document.createElement('tr');
    for (let col of cols) {
        const colElement = document.createElement('th');
        colElement.innerText = col;
        headerElement.appendChild(colElement);
    }

    tableElement.appendChild(headerElement);

    for(let obj of jsonData) {
        let headerElement = document.createElement('tr');
        for(let key in obj) {
            if (obj.hasOwnProperty(key)) {
                 let rowElement = document.createElement('td');
                 rowElement.innerText = obj[key];
                 headerElement.appendChild(rowElement)
            }
        }

       tableElement.appendChild(headerElement); 
    }

    
  }

  <table>
    <tr></tr>
  </table>