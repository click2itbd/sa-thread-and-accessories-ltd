const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Extract MONGODB_URI manually to avoid dotenv dependency
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const mongoUriMatch = envFile.match(/MONGODB_URI=(.*)/);
const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim() : null;

if (!MONGODB_URI) {
  console.error("No MONGODB_URI found.");
  process.exit(1);
}

// Define schemas to interact with the DB
const clientSchema = new mongoose.Schema({
  name: String,
  logo: String,
  isActive: Boolean,
  displayOrder: Number
});
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  specifications: [{ label: String, value: String }]
}, { strict: false });
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const teamSchema = new mongoose.Schema({
  name: String,
  email: String
}, { strict: false });
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // 1. Add Clients
    const newClients = [
      { name: "Aba Group", logo: "", isActive: true, displayOrder: 100 },
      { name: "Day Group", logo: "", isActive: true, displayOrder: 101 },
      { name: "Saturn Textile Ltd", logo: "", isActive: true, displayOrder: 102 },
      { name: "Alfa Patterns ltd", logo: "", isActive: true, displayOrder: 103 },
    ];
    for (let c of newClients) {
      const exists = await Client.findOne({ name: c.name });
      if (!exists) {
        await Client.create(c);
        console.log(`Added client: ${c.name}`);
      } else {
        console.log(`Client already exists: ${c.name}`);
      }
    }

    // 2. Update Products
    const updates = [
      { title: "Elastic", desc: "100% polyester" },
      { title: "Drawstring", desc: "100% polyester and cotton" },
      { title: "Sewing Thread", desc: "100% spun polyester" },
      { title: "Tips", desc: "Metal/Plastic/Silica Gel" },
      { title: "Twill Tape", desc: "100% Cotton/ Nylon/ 100% Polyester" }
    ];

    for (let u of updates) {
      const prod = await Product.findOne({ title: u.title });
      if (prod) {
        prod.description = u.desc;
        if (u.title === "Sewing Thread") {
          // Update Count spec
          if (prod.specifications) {
             const specIndex = prod.specifications.findIndex(s => s.label === "Count");
             if (specIndex !== -1) {
               prod.specifications[specIndex].value = "20/2, 20/3, 40/2, 40/3, etc.";
             }
          }
        }
        await prod.save();
        console.log(`Updated product: ${u.title}`);
      } else {
        console.log(`Product not found: ${u.title}`);
      }
    }

    // 3. Update Team Emails
    const md = await Team.findOne({ name: "Mohammed Shahidul Islam" });
    if (md) {
      md.email = "sathread@gmail.com";
      await md.save();
      console.log(`Updated MD email`);
    }

    const ed = await Team.findOne({ name: "Asif Abdullah" });
    if (ed) {
      ed.email = "asif.sathread@gmail.com";
      await ed.save();
      console.log(`Updated ED email`);
    }

    console.log("All updates completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
