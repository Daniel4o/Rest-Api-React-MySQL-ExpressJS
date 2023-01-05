import useFormLineUps from "./useFormLineUps";

const Formations = () => {
const {homePlayers, awayPlayers} = useFormLineUps();

const homeGK = homePlayers.filter(player=>player.position =="Goalkeeper").map(player=>player.name);
const homeDF = homePlayers.filter(player=>player.position =="Defender").map(player=>player.name);
const homeMD = homePlayers.filter(player=>player.position =="Middfielder").map(player=>player.name);
const homeATT = homePlayers.filter(player=>player.position =="Attacker").map(player=>player.name);

const awayGK = awayPlayers.filter(player=>player.position =="Goalkeeper").map(player=>player.name);
const awayDF = awayPlayers.filter(player=>player.position =="Defender").map(player=>player.name);
const awayMD = awayPlayers.filter(player=>player.position =="Middfielder").map(player=>player.name);
const awayATT = awayPlayers.filter(player=>player.position =="Attacker").map(player=>player.name);
console.log(awayPlayers);

    const homeTeam = () => {
        return {
            color: "lightblue",
            squad: {
                cam: [
                    { name: awayGK[0] },
                    { player: { number: 8 } },
                    { player: { number: 6 } },
                    { player: { number: 10 } }
                ],
                df: [
                    { number: 2, name: "Hicham" },
                    { number: 43 },
                    { number: 5 },
                    { number: 3 }
                ],
                fw: [{ number: 9, }, { number: 32 }],
                gk: { number: 19 }
            }
        }
    };

    const awayTeam = () => {
        return {

            color: "green",
            squad: {
                gk: { number: 1,},
                df: [
                    { number: 2, name: "Hicham" },
                    { number: 43 },
                    { number: 5 },
                    { number: 3 },
                ],
                cam: [{ number: 5 }, { number: 8 }, { number: 6 }, { number: 10 }],
                fw: [{ number: 9 }, { number: 11 }],
            }
        }
    };

    return { homeTeam, awayTeam };

}

export default Formations;