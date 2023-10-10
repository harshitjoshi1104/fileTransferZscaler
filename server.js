const express=require('express')
const app=express()
const port=5000
const multer = require('multer')
app.use(express.json())
const path=require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'/uploads')); // The destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp
    },
  });
  
const upload = multer({ storage });

app.get('/',(req,res)=>{
    res.status(200).json({
        "message":"Server running successfully"
    })
})

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // File uploaded successfully
    res.send('File uploaded!');
});
      



app.listen(port, ()=>{
    console.log("Server started ")
})