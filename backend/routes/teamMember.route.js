const express = require('express');
const controller = require('../controllers/teamMember.controller');
const requireAdmin = require('../middlewares/auth.middleware');
const { uploadImage } = require('../helper/upload.helper');

const router = express.Router();

// Anyone can read; adding, editing and deleting need the admin API key.
// To include a photo, send the request as multipart/form-data with the image in a `photo` field.
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', requireAdmin, uploadImage.single('photo'), controller.create);
router.patch('/:id', requireAdmin, uploadImage.single('photo'), controller.update);
router.delete('/:id/photo', requireAdmin, controller.removePhoto);
router.delete('/:id', requireAdmin, controller.remove);

module.exports = router;
