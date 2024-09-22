const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files'), (_req, res) => {
  res.send({ message: 'success' });
});

app.get('/files', (_req, res) => {
  const folder = path.join(__dirname, 'uploads');

  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'fail' });
    }

    const filesDetails = files.map((file) => ({
      name: file,
      path: path.join(folder, file),
      size: fs.statSync(path.join(folder, file)).size,
    }));

    res.json(filesDetails);
  });
});

app.use('/uploaded-files', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
  console.log('Server on port 3000');
});
