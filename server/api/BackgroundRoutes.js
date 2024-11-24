import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const apiRouter = express.Router();

// Helper to manage file paths 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../src/assets/'), 
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'login-bg' + ext); 
  }
});

// File filter to allow only jpg 
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg') {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only JPG files are allowed.'), false); 
  }
};

// Initialize upload with size limit (5MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: fileFilter 
}).single('backgroundImage');

// Route to handle background image upload
apiRouter.post('/upload-background', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    } else if (err) {
      console.error('Error uploading file:', err);
      return res.status(400).json({ error: err.message }); 
    }
    const file = req.file;
    // No change in background image, return to default
    if (!file) {
      console.log('No file uploaded, returning default image');
      return res.status(200).json({ 
        message: 'No file uploaded, using default background image',
        backgroundImage: 'src/assets/bb-bg-blurred.png' 
      });
    }
    console.log('Background image uploaded successfully');
    const imagePath = `/assets/login-bg${path.extname(file.originalname)}`; 
    res.status(200).json({ message: 'Background image updated successfully', backgroundImage: imagePath });
  });
});

// Route to retrieve the background image
apiRouter.get('/get-background', (req, res) => {
  const jpgImagePath = path.join(__dirname, '../../src/assets/login-bg.jpg'); 
  
  if (fs.existsSync(jpgImagePath)) {
    return res.json({ backgroundImage: '../../src/assets/login-bg.jpg' }); 
  } else {
    return res.json({ backgroundImage: '../../src/assets/bb-bg-blurred.png' }); 
  }
});
export default apiRouter;