var express = require('express')
var multer  = require('multer')
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime()+file.originalname)
    }
  })
   
var upload = multer({ storage })
var app = express()
app.use('/download',express.static(path.join(__dirname,'uploads')));
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    res.send('Uploaded');
})
 
app.get('/download/:filename', function (req, res) {
  res.download('uploads/'+req.params.filename);
});
 
app.listen(3000);