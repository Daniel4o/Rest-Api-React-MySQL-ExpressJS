import useFormLineUps from "./useFormLineUps";

const Formations = () => {
    const { homePlayers, awayPlayers, finalResult, error, isLoading, id, teamNames } = useFormLineUps();

    const homeGK = homePlayers.filter(player => player.position == "Goalkeeper").map(player => player.name);
    const homeDF = homePlayers.filter(player => player.position == "Defender").map(player => player.name);
    const homeMD = homePlayers.filter(player => player.position == "Middfielder").map(player => player.name);
    const homeATT = homePlayers.filter(player => player.position == "Attacker").map(player => player.name);

    const awayGK = awayPlayers.filter(player => player.position == "Goalkeeper").map(player => player.name);
    const awayDF = awayPlayers.filter(player => player.position == "Defender").map(player => player.name);
    const awayMD = awayPlayers.filter(player => player.position == "Middfielder").map(player => player.name);
    const awayATT = awayPlayers.filter(player => player.position == "Attacker").map(player => player.name);

    const homeTeam = () => {
        return {
            squad: {
                gk: { number: 1, name: homeGK[0] },
                df: [
                    { number: 2, name: homeDF[0] },
                    { number: 3, name: homeDF[1] },
                    { number: 4, name: homeDF[2] },
                    { number: 5, name: homeDF[3] }
                ],
                cam: [
                    { number: 6, name: homeMD[0] },
                    { number: 7, name: homeMD[1] },
                    { number: 8, name: homeMD[2] },
                    { number: 9, name: homeMD[3] },
                ],
                fw: [{ number: 10, name: homeATT[0] }, { number: 11, name: homeATT[1] }],
            }
        }
    };

    const awayTeam = () => {
        return {
            squad: {
                gk: { number: 1, name: awayGK[0] },
                df: [
                    { number: 2, name: awayDF[0] },
                    { number: 3, name: awayDF[1] },
                    { number: 4, name: awayDF[2] },
                    { number: 5, name: awayDF[3] },
                ],
                cam: [
                    { number: 6, name: awayMD[0] },
                    { number: 7, name: awayMD[1] },
                    { number: 8, name: awayMD[2] },
                    { number: 9, name: awayMD[3] }
                ],
                fw: [
                    { number: 10, name: awayATT[0] },
                    { number: 11, name: awayATT[1] }
                ],
            }
        }
    };

    return { homeTeam, awayTeam, finalResult, error, isLoading, id, teamNames };

}

export default Formations;