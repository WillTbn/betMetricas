export default function () {
    return {
        data: [],
        default: [
            { name: "Cartão amarelo", jogos: [] },
            { name: "Chutes Total", jogos: [] },
            { name: "Chutes no Gol", jogos: [] },
            { name: "Escanteios", jogos: [] },
            { name: "Faltas Cometidas", jogos: [] },
        ],
        games: [],
        step: 1,
        team: "",
        quantityGames: "",
        gamesSalved: [],
        oneStatistics: "",
        paramsRow: "",
        paramsColumns: "",
        metricas: "",
    };
}
