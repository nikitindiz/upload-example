const express = require('express');
const multer = require('multer');

const router = express.Router();
const multerMiddlewareCreator = multer({ dest: 'uploads/' });

router.post('/', multerMiddlewareCreator.single('profile_pic'), (req, res) => {
    console.log(req.file);

    res.send(req.file);
});

module.exports = router;