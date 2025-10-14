const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary storage for multiple files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'edumind_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'doc', 'docx', 'txt'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  // Allow images, documents, and text files
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'text/plain'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF, DOC, DOCX, and TXT files are allowed.'), false);
  }
};

const uploadMultiple = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit per file
  }
});

module.exports = uploadMultiple;