const express = require('express');
const { generateStory, generateCharacter } = require('../controllers/narrativeController');

const router = express.Router();

router.post('/story', generateStory);
router.post('/character', generateCharacter);

module.exports = router;
