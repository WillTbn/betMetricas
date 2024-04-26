export default function () {
  return {
    data: [],
    paramsCase: [
      {
        name: "Chutes a gol (a favor)",
        value: "Chutes a gol (a favor)",
        disabled: false,
      },
      {
        name: "Chutes a gol (contra)",
        value: "Chutes a gol (contra)",
        disabled: false,
      },
      {
        name: "Chutes (a favor)",
        value: "Chutes (a favor)",
        disabled: false,
      },
      {
        name: "Chutes (contra)",
        value: "Chutes (contra)",
        disabled: false,
      },
      {
        name: "Faltas cometidas",
        value: "Faltas cometidas",
        disabled: false,
      },
      {
        name: "Faltas sofridas",
        value: "Faltas sofridas",
        disabled: false,
      },
      {
        name: "Cartões amarelos",
        value: "Cartões amarelos",
        disabled: false,
      },
      {
        name: "Cartões amarelos (oponente)",
        value: "Cartões amarelos (oponente)",
        disabled: false,
      },
      {
        name: "Escanteios a favor",
        value: "Escanteios a favor",
        disabled: false,
      },
      {
        name: "Escanteios (oponente)",
        value: "Escanteios (oponente)",
        disabled: false,
      },
      {
        name: "Defesas goleiro(a)",
        value: "Defesas goleiro(a)",
        disabled: false,
      },
      {
        name: "Defesas goleiro(a) (oponente)",
        value: "Defesas goleiro(a) (oponente)",
        disabled: false,
      },
    ],
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
