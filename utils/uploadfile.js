// require('dotenv').config()
// const multer = require('multer')
// const multers3 = require('multer-s3')
// const { S3Client } = require('@aws-sdk/client-s3')
// const path = require('path')

// const s3 = new S3Client({
// 	endpoint: process.env.S3_ENDPOINT,
// 	region: process.env.S3_REGION,
// 	credentials: {
// 		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 	},
// })

// const upload = multer({
// 	storage: multers3({
// 		s3: s3,
// 		bucket: process.env.BUCKET_NAME,
// 		contentType: multers3.AUTO_CONTENT_TYPE,
// 		acl: 'public-read',
// 		metadata: async (req, file, cb) => {
// 			cb(null, {
// 				fieldname: file.fieldname,
// 			})
// 		},
// 		key: async (req, file, cb) => {
// 			cb(null, file.originalname)
// 		},
// 	}),
// 	fileFilter: function (req, file, callback) {
// 		try{
// 		var ext = path.extname(file.originalname)

// 		req.extension = ext

// 		if (
// 			ext !== '.png' &&
// 			ext !== '.jpg' &&
// 			ext !== '.jpeg' &&
// 			ext !== '.pdf' &&
// 			ext !== '.mp4' &&
// 			ext !== '.mp3' &&
// 			ext !== '.MP3' &&
// 			ext !== '.aac' &&
// 			ext !== '.amr' &&
// 			ext !== '.wav' &&
// 			ext !== '.ogg' &&
// 			ext !== '.avi' &&
// 			ext !== '.mkv' &&
// 			ext !== '.doc' &&
// 			ext !== '.docx' &&
// 			ext !== '.xls' &&
// 			ext !== '.xlsx' &&
// 			ext !== '.ppt' &&
// 			ext !== '.pptx' &&
// 			ext !== '.txt' &&
// 			ext !== '.rtf' &&
// 			ext !== '.csv' &&
// 			ext !== '.key' &&
// 			ext !== '.gif' &&
// 			ext !== '.bmp'
// 		) {
// 			return callback(new Error('Unsupported file format'))
// 		}
// 		callback(null, true)
// 	} catch (error) {
// 		callback(error);
// 	}
// },
// 	// limits: {
// 	// 	fileSize: 20 * 1024 * 1024,
// 	// },
// }).single('file')

// module.exports = upload
require('dotenv').config();
const multer = require('multer');
const multers3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const storage = multers3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multers3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: async (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: async (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

module.exports = {
    uploadSingle: upload.single("file"),  // ✅ For single file upload
    uploadMultiple: upload.array("files", 2) // ✅ For multiple file uploads
};

