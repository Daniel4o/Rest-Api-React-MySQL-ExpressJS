const models = require("../models");
const MatchStatistics = models.matches_statistics;
const Results = models.results;
const Players = models.players;

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
        return res.send(matches_statistics).status(200);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.getMatchStatisticsById = async (req, res) => {
    try {
        const matches_statistics = await MatchStatistics.findByPk(req.params.id);
        return res.send(matches_statistics);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.createMatchStatistics = async (req, res) => {
    try {
        validateData(req.body,res);
        await MatchStatistics.create(req.body);
        return res.send(req.body).status(200);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.updateMatchStatistics = async (req, res) => {
    try {
        const match_statistics = await MatchStatistics.findByPk(req.params.id);
        validateData(req.body,res);
        await match_statistics.update(req.body);
        return res.send(req.body).status(200);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.deleteMatchStatistics = async (req, res) => {
    const { id } = req.params;
    try {
        await MatchStatistics.destroy({ where: { id: id } });
        return res.send(`Deleted match statistics with id: ${id} ! `).status(200);
    } catch (error) {
        return res.send(error).status(500);
    }
}

const validateData = async (reqBody, res)  => {
    const goals = await MatchStatistics.findAll({
        where: { result_id: reqBody.result_id, event: "Goal" },
        raw: true,
        attributes: ["team_id", "player_id", "event"]
    })
    
    const currGoalsForTeam = goals.filter(goals => goals.team_id == reqBody.team_id).reduce((a, obj) =>
        a + Object.keys(obj).length / 3, 0);


    const result = await Results.findByPk(reqBody.result_id, {
        attributes: ["host_id", "guest_id", "home_goals", "away_goals"],
        raw: true,
    });

    const player = await Players.findByPk(reqBody.player_id, {
        raw: true,
        attributes: ["teamId"]
    });

    if (result.host_id != reqBody.team_id && result.guest_id != reqBody.team_id) {
        return res.status(400).send({ message: "This team does not play on this match!" });
    }
    if (player.teamId != reqBody.team_id) {
        return res.status(400).send({ message: "The player is not on this team!" })
    }

    if (reqBody.event == "Goal") {
        if (result.home_goals == 0 && result.host_id == reqBody.team_id) {
            return res.status(400).send({ message: "This team has not scored any goals!" })
        }
        if (result.away_goals == 0 && result.guest_id == reqBody.team_id) {
            return res.status(400).send({ message: "This team has not scored any goals!" })
        }
        if (result.host_id == reqBody.team_id && result.home_goals <= currGoalsForTeam) {
            return res.status(400).send({ message: "This team has not scored any more goals!" })
        }
        if (result.guest_id == reqBody.team_id && result.away_goals <= currGoalsForTeam)
        return res.status(400).send({ message: "This team has not scored any more goals!" })
    }

}