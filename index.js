const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/resume', resumeRoutes);
app.use('/templates', templateRoutes);
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
	console.log('SERVER STARTED 💐 ')

	mongoose
		.connect(
			'mongodb+srv://sona:sona2872@development.vhaae.mongodb.net/resumes',
			{}
		)
		.then(() => {
			conn = mongoose.connection
			console.log('Connected to MongoDB')
		})
		.catch((error) => {
		//	console.log('Error connecting to MongoDB:', error)
		})
})
