import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 300000000,
    }
});

export default upload
