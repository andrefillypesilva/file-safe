const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '../src/assets/uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files'), (_req, res) => {
  res.send({ message: 'success' });
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
