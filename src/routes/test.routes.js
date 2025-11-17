const express = require('express')
const router = express.Router()
const { testAppend } = require('../controllers/sheetTestController')

router.post('/teams', (req, res) => testAppend(req, res, 'teams'))
router.post('/matches', (req, res) => testAppend(req, res, 'matches'))
router.post('/news', (req, res) => testAppend(req, res, 'news'))
router.post('/user', (req, res) => testAppend(req, res, 'user'))

module.exports = router
