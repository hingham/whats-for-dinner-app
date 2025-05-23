/* eslint-disable no-param-reassign */
const fs = require('fs');

// Path to the JSON file
const filePath = './fresh.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON content
    const jsonData = JSON.parse(data);

    // Function to recursively update "id" fields
    const addPrefixToIds = (d) => {
      d.forEach((item) => {
        item.id = `freshRecipes#${item.id}`; // Add prefix to the "id" field
      });
    };

    // Update the "id" fields in the JSON data
    addPrefixToIds(jsonData);

    // Write the updated JSON back to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }
      console.log('Successfully updated the "id" fields with the prefix.');
    });
  } catch (parseErr) {
    console.error('Error parsing the JSON:', parseErr);
  }
});