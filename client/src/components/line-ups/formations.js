import useFormLineUps from "./useFormLineUps";

const Formations = () => {
    const { homePlayers, awayPlayers, formations, finalResult, error, isLoading, id, teamNames } = useFormLineUps();

    const homeGK = homePlayers.filter(player => player.position == "Goalkeeper").map(player => player.name);
    const homeDF = homePlayers.filter(player => player.position == "Defender").map(player => player.name);
    const homeMD = homePlayers.filter(player => player.position == "Middfielder").map(player => player.name);
    const homeATT = homePlayers.filter(player => player.position == "Attacker").map(player => player.name);

    const awayGK = awayPlayers.filter(player => player.position == "Goalkeeper").map(player => player.name);
    const awayDF = awayPlayers.filter(player => player.position == "Defender").map(player => player.name);
    const awayMD = awayPlayers.filter(player => player.position == "Middfielder").map(player => player.name);
    const awayATT = awayPlayers.filter(player => player.position == "Attacker").map(player => player.name);

    const formationsTeams = (formation, players) => {

        switch (formation) {
            case "4-4-2":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cm: [
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                        ],
                        fw: [{ number: 10, name: players[9] }, { number: 11, name: players[10] }],
                    }
                }

            case "4-5-1":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cm: [
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                        ],
                        cam: [
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] }
                        ],
                        fw: [{ number: 11, name: players[10] }],
                    }
                }

            case "4-3-3":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cm: [
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                        ],
                        fw: [
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] },
                            { number: 11, name: players[10] }],
                    }
                }

            case "4-2-3-1":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cdm: [
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                        ],
                        cam: [
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] }
                        ],
                        fw: [{ number: 11, name: players[10] }],
                    }
                }

            case "3-5-2":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                        ],
                        cdm: [
                            { number: 5, name: players[4] },
                            { number: 6, name: players[5] },
                        ],
                        cm: [
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                        ],
                        fw: [
                            { number: 10, name: players[9] },
                            { number: 11, name: players[10] }
                        ],
                    }
                }

            case "4-1-4-1":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cdm: [
                            { number: 6, name: players[5] },
                        ],
                        cm: [
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] }
                        ],
                        fw: [{ number: 11, name: players[10] }],
                    }
                }

            case "4-4-1-1":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                            { number: 5, name: players[4] }
                        ],
                        cm: [
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                        ],
                        cam: [
                            { number: 10, name: players[9] }
                        ],
                        fw: [{ number: 11, name: players[10] }],
                    }
                }

            case "3-4-3":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                        ],
                        cm: [
                            { number: 5, name: players[4] },
                            { number: 6, name: players[5] },
                            { number: 7, name: players[6] },
                            { number: 8, name: players[7] },
                        ],
                        fw: [
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] },
                            { number: 11, name: players[10] }
                        ],
                    }
                }

            case "3-5-1-1":
                return {
                    squad: {
                        gk: { number: 1, name: players[0] },
                        df: [
                            { number: 2, name: players[1] },
                            { number: 3, name: players[2] },
                            { number: 4, name: players[3] },
                        ],
                        cdm: [
                            { number: 5, name: players[4] },
                            { number: 6, name: players[5] },
                        ],
                        cm: [
                            { number: 7, name: players[6] },
                        ],
                        cam: [
                            { number: 8, name: players[7] },
                            { number: 9, name: players[8] },
                            { number: 10, name: players[9] },
                        ],
                        fw: [
                            { number: 11, name: players[10] }
                        ],
                    }
                }
        }
    }
    
    const homeTeam = () => {
        return formationsTeams(formations.hostFormation, [...homeGK, ...homeDF, ...homeMD, ...homeATT]);

    };

    const awayTeam = () => {
        return formationsTeams(formations.guestFormation, [...awayGK, ...awayDF, ...awayMD, ...awayATT]);
    }

    return { homeTeam, awayTeam, formations, finalResult, error, isLoading, id, teamNames };

}

export default Formations;