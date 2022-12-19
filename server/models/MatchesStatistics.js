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
            references: { model: "teams", key: "id" }
        },
        minute: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide minute!" }
            }
        },
        event: {
            type: DataTypes.STRING, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide event !" }
            }
        }
    },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );

    MatchStatistics.associate = models => {
        MatchStatistics.belongsTo(models.results, {
            as: "host",
            foreignKey: "team_id",
            sourceKey: "host_id"
        });
        MatchStatistics.belongsTo(models.results, {
            as: "guest",
            foreignKey: "team_id",
            sourceKey: "guest_id"
        });
    }
    MatchStatistics.sync();
    return MatchStatistics;
}

module.exports = matchStatistics;