const models = require("../models");
const MatchStatistics = models.matchStatistics;

exports.getMatchesStatistics = async (req, res) => {
    try {
        const matches_statistics_host = await MatchStatistics.findAll({
            raw: true,
            include: models.results,
            as: "host",
            attributes: []
        });

        const matches_statistics_guest = await MatchStatistics.findAll({
            raw: true,
            include: models.results,
            as: "guest",
            attributes: []
        });

        const matches_statistics = [...matches_statistics_host, ...matches_statistics_guest];
        return res.send(matches_statistics);
    } catch (error) {
        return res.send(error);
    }
}

exports.getMatchStatisticsById = async (req, res) => {
    try {
        const matches_statistics = await MatchStatistics.findByPk(req.params.id);
        res.send(matches_statistics);
    } catch (error) {
        return res.send(error);
    }
}

exports.createMatchStatistics = async (req, res) => {
    try {
        await MatchStatistics.create(req.body)
        return res.send(req.body);
    } catch (error) {
        return res.send(error);
    }
}

exports.updateMatchStatistics = async (req, res) => {
    try {
        const match_statistics = await MatchStatistics.findByPk(req.params.id);
        await match_statistics.update(req.body);
        return res.json(req.body);
    } catch (error) {
        return res.send(error);
    }
}

exports.deleteMatchStatistics = async (req, res) => {
    const { id } = req.params;
    try {
        await MatchStatistics.destroy({ where: { id: id } });
        res.send(`Deleted match statistics with id: ${id} ! `);
    } catch (error) {
        return res.send(error);
    }
}