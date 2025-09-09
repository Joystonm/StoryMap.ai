const express = require('express');
const { getIndigenousKnowledge, generateQuiz, getLearningModules } = require('../controllers/indigenousController');

const router = express.Router();

router.get('/knowledge', getIndigenousKnowledge);
router.post('/quiz', generateQuiz);
router.get('/modules', getLearningModules);

module.exports = router;
