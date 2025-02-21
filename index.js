const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // ✅ Import CORS
const morgan = require('morgan'); // ✅ Import Morgan
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// ✅ Use CORS properly
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/resume', resumeRoutes);
app.use('/template', templateRoutes);
app.use("/users", userRoutes);
app.use("/job", jobRoutes);

app.get('/pdfs/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'public', 'pdfs', filename);

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading the file");
        }
    });
});

// Create pdfs directory if not exists
if (!fs.existsSync(path.join(__dirname, 'pdfs'))) {
    fs.mkdirSync(path.join(__dirname, 'pdfs'));
}

app.listen(PORT, () => {
    console.log('SERVER STARTED 💐 ');

    mongoose
        .connect(
            'mongodb+srv://sona:sona2872@development.vhaae.mongodb.net/resumes',
            {}
        )
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB:', error);
        });
});
