const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data/products.js');
let data = fs.readFileSync(file, 'utf8');

// Elastic
data = data.replace(
  /(title:\s*"Elastic",[\s\S]*?description:\s*)"([^"]+)"/,
  '$1"100% polyester"'
);

// Drawstring
data = data.replace(
  /(title:\s*"Drawstring",[\s\S]*?description:\s*)"([^"]+)"/,
  '$1"100% polyester and cotton"'
);

// Sewing Thread
data = data.replace(
  /(title:\s*"Sewing Thread",[\s\S]*?description:\s*)"([^"]+)"/,
  '$1"100% spun polyester"'
);
data = data.replace(
  /{ label:\s*"Count",\s*value:\s*"10s – 120s"\s*}/,
  '{ label: "Count", value: "20/2, 20/3, 40/2, 40/3, etc." }'
);

// Twill Tape
data = data.replace(
  /(title:\s*"Twill Tape",[\s\S]*?description:\s*)"([^"]+)"/,
  '$1"100% Cotton/ Nylon/ 100% Polyester"'
);

// Tips
data = data.replace(
  /(title:\s*"Tips",[\s\S]*?description:\s*)"([^"]+)"/,
  '$1"Metal/Plastic/Silica Gel"'
);

fs.writeFileSync(file, data, 'utf8');
console.log("Updated data/products.js successfully.");
