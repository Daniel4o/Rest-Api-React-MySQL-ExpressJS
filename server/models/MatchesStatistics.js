const matchStatistics = (sequelize, DataTypes) => {
    const MatchStatistics = sequelize.define('matches_statistics', {
        result_id: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide result_id !" }
            },
            references: { model: "results", key: "id" }
        },
        team_id: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide team_id !" }
            },
            references: { model: "results", key: "host_id" },
        },
        player_id: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide player_id!" }
            },
            references: { model: "players", key: "id" }
        },
        minute: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide minute!" },
                min: 1,
                max: 90
            }
        },
        event: {
            type: DataTypes.STRING, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide event !" }
            }
        },
    },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );

    MatchStatistics.associate = models => {
        MatchStatistics.belongsTo(models.results, {
            as: "results",
            foreignKey: "result_id",
            sourceKey: "id"
        });

        MatchStatistics.belongsTo(models.teams, {
            as: "teams",
            foreignKey: "team_id",
            sourceKey: "id"
        });

        MatchStatistics.belongsTo(models.players, {
            as: "players",
            foreignKey: "player_id",
            sourceKey: "id"
        });
    }

    MatchStatistics.sync();
    return MatchStatistics;
}

module.exports = matchStatistics;