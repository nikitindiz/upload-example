const createError = require('http-errors');
const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const uploadFolderPath = path.join(__dirname, '..', 'public', 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(uploadFolderPath);

        cb(null, uploadFolderPath);
    },

    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const fileExtension = path.extname(originalName);

        const { fileName } = req.body;

        // Name your file here
        const destinationFileName = fileName + '-' + Date.now() + fileExtension;

        cb(null, destinationFileName);
    }
})

const multerMiddlewareCreator = multer({
    // instead of "dest" we ar using custom storage now:
    storage,

    fileFilter: (req, file, cb) => {
        const listOfAllowedExtensions = [
            '.png',
            '.jpg',
            '.jpeg'
        ];

        const receivedFileExt = path.extname(file.originalname);

        if (listOfAllowedExtensions.includes(receivedFileExt)) {
            cb(null, true);
        } else {
            req.fileUploadError = 'Wrong file type';
            cb(null, false)
        }
    },
});

router.post('/',
    multerMiddlewareCreator.single('profile_pic'),

    (req, res, next) => {
        if (!req.file) {
            res.end();
        } else {
            next()
        }
    },

    (req, res) => {
        console.log('test 2');

        if (!req.file) {
            res.send({ error: 'Wrong file type' });
        } else {
            res.send({ file: req.file });
        }
    });

module.exports = router;