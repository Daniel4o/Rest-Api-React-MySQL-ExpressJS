const models = require("../models")
const Results = models.results
const Players = models.players
const MatchesStatistics = models.matches_statistics

exports.getResults = async (req, res) => {
    try {
        const host = await Results.findAll({
            raw: true,
            include: [{
                model: models.teams,
                as: "host",
                attributes: ["team_name"],
                paranoid: false
            }]
        })
        const guest = await Results.findAll({
            raw: true,
            include: [{
                model: models.teams,
                as: "guest",
                attributes: ["team_name"],
                paranoid: false
            }]
        })

        const teamName = [...host, ...guest]
        const output = Object.values(teamName.reduce((accu, { id, ...rest }) => {
            if (!accu[id]) accu[id] = {};
            accu[id] = { id, ...accu[id], ...rest };
            return accu;
        }, {}));
        return res.send(output)
    } catch (error) {
        return res.send(error)
    }
}

exports.getResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Results.findByPk(req.params.id, {
            raw: true,
            include: [{
                model: models.teams,
                as: "host",
                paranoid: false,
            },
            {
                model: models.teams,
                as: "guest",
                paranoid: false
            }]
        });

        const hostPlayers = await Players.findAll({
            where: { teamId: result.host_id },
            raw: true,
            include: [{
                model: models.teams,
                as: "teams"
            }]
        });

        const guestPlayers = await Players.findAll({
            where: { teamId: result.guest_id },
            raw: true,
            include: [{
                model: models.teams,
                as: "teams"
            }]
        });

        const matchesStatistics = await MatchesStatistics.findAll({
            where: { result_id: id },
            raw: true,
            inlucde: [{
                model: models.results,
                as: "results"
            }]
        });

        const redCardedPlayers = matchesStatistics.filter(match=>match.event == "Red Card").map(player=>player.player_id);

        const players = hostPlayers.concat(guestPlayers).filter(player=>!redCardedPlayers.includes(player.id));

        res.send({ result, players, matchesStatistics });
    } catch (error) {
        return res.send(error)
    }
}

exports.createResult = async (req, res) => {
    try {
        await Results.findAll({
            include: [{
                model: models.teams,
                as: "teams",
            }]
        })
        await Results.create(req.body)
        return res.send(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.updateResult = async (req, res) => {
    try {
        const result = await Results.findByPk(req.params.id)
        await result.update(req.body)
        return res.json(req.body);
    } catch (error) {
        return res.send(error)
    }
}


exports.deleteResult = async (req, res) => {
    const { id } = req.params
    try {
        await Results.destroy({ where: { id: id } })
        res.send(`Deleted result with id: ${id} ! `)
    } catch (error) {
        return res.send(error)
    }
}