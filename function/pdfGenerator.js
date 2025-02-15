const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const TemplateModel = require('../schema/templateModel'); // ✅ Import Template Model

const generatePDF = async (resumeData) => {
    console.log("Generating PDF for:", resumeData.name);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // ✅ Fetch template from MongoDB
        const template = await TemplateModel.findOne({ name: resumeData.templatename });
        if (!template) throw new Error(`Template "${resumeData.templatename}" not found in database`);

        // ✅ Replace placeholders with user data
        let htmlContent = template.content;
        Object.keys(resumeData).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            htmlContent = htmlContent.replace(regex, resumeData[key] || '');
        });

        await page.setContent(htmlContent, { waitUntil: 'load', timeout: 10000 });

        // ✅ Store PDFs in /public/pdfs/
        const pdfDir = path.join(__dirname, '../public/pdfs');
        if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

        const fileName = `${resumeData.name.replace(/\s/g, '_')}.pdf`;
        const pdfPath = path.join(pdfDir, fileName);
        console.log("PDF Path:", pdfPath);

        await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

        await browser.close();

        // ✅ Return a **downloadable link**
        return `http://localhost:5000/pdfs/${fileName}`;
    } catch (error) {
        console.error("Error in PDF Generation:", error);
        await browser.close();
        throw error;
    }
};

module.exports = generatePDF;
