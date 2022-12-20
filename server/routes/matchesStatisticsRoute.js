const express = require('express');
const MatchStatistics = require('../controllers/matchesStatistics.controller');
const router = express.Router();

router.get("/", MatchStatistics.getMatchesStatistics);
router.get('/:id', MatchStatistics.getMatchStatisticsById);
router.post("/", MatchStatistics.createMatchStatistics);
router.patch('/:id', MatchStatistics.updateMatchStatistics);
router.delete("/:id", MatchStatistics.deleteMatchStatistics);
module.exports = router;