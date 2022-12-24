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

exports.getMatchStatisticsByResultId = async (req, res) => {
    try {
        const { id } = req.params;
        let currGoalsHost = 0;
        let currGoalsGuest = 0;
        const matches_statistics = await MatchStatistics.findAll({
            where: { result_id: id },
            raw: true,
            include: [{
                model: models.players,
                as: "players",
            },
            {
                model: models.results,
                as: "results"
            }]
        });


        matches_statistics.forEach(matchStatistic => {
            if (matchStatistic.team_id == matchStatistic["results.host_id"]) {
                matchStatistic.hostPlayer = matchStatistic["players.name"];
                matchStatistic.hostEvent = matchStatistic.event;
                matchStatistic.spanGuest = 2;
                if (matchStatistic.event == "Goal") currGoalsHost++;
            }
            else {
                matchStatistic.guestPlayer = matchStatistic["players.name"];
                matchStatistic.guestEvent = matchStatistic.event;
                matchStatistic.spanHost = 2;
                if (matchStatistic.event == "Goal") currGoalsGuest++;
            }
            matchStatistic.currResult = currGoalsHost + "-" + currGoalsGuest
        });

        matches_statistics.sort((a,b) => a.minute-b.minute)

        return res.send(matches_statistics);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.createMatchStatistics = async (req, res) => {
    try {
        await validateData(req.body, res);
        if (res.headersSent) return;
        await MatchStatistics.create(req.body);
        return res.send(req.body).status(200);
    } catch (error) {
        return res.send(error).status(500);
    }
}

exports.updateMatchStatistics = async (req, res) => {
    try {
        const match_statistics = await MatchStatistics.findByPk(req.params.id);
        validateData(req.body, res);
        if (res.headersSent) return;
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

const validateData = async (reqBody, res) => {
    const matchesStatistics = await MatchStatistics.findAll({
        where: { result_id: reqBody.result_id },
        raw: true,
        attributes: ["team_id", "player_id", "event", "minute"]
    })

    const yellowCardsForPlayer = matchesStatistics.filter(match => match.team_id == reqBody.team_id && match.player_id == reqBody.player_id && match.event == "Yellow Card");
    const redCardForPlayer = matchesStatistics.filter(match => match.team_id == reqBody.team_id && match.player_id == reqBody.player_id && match.event == "Red Card");
    const currGoalsForTeam = matchesStatistics.filter(goals => goals.team_id == reqBody.team_id && goals.event == "Goal");
    // .reduce((a, obj) => a + Object.keys(obj).length / 3, 0);
    const redCardMinute = redCardForPlayer.map(player => player.minute);
    console.log(currGoalsForTeam)

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
            return res.status(400).send({ message: "This team has not scored any goals!" });
        }
        if (result.away_goals == 0 && result.guest_id == reqBody.team_id) {
            return res.status(400).send({ message: "This team has not scored any goals!" });
        }
        if (result.host_id == reqBody.team_id && result.home_goals <= currGoalsForTeam.length) {
            return res.status(400).send({ message: "This team has not scored any more goals!" });
        }
        if (result.guest_id == reqBody.team_id && result.away_goals <= currGoalsForTeam.length)
            return res.status(400).send({ message: "This team has not scored any more goals!" });
    }

    if (yellowCardsForPlayer.length == 1) {
        await MatchStatistics.create(reqBody);
        reqBody.event = "Red Card";
    }

    if (redCardForPlayer.length == 1 && redCardMinute < reqBody.minute && reqBody.event != "Yellow Card" && reqBody.event != "Red Card") {
        return res.status(400).send({ message: "This player has already been sent off!" });
    }

}