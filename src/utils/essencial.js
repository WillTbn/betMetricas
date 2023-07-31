function metricas(estatiticas, quantidadeJogos, time, paramentros, tipo) {
    const stringSplit = estatiticas.split(",");
    const intForce = parseInt(quantidadeJogos);
    let jsonDados = {};
    let arrayDados = [];
    let arrayColumuns = [
        {
            name: "name",
            required: true,
            label: "Estatiticas",
            align: "left",
            field: "name",
            //   field: (row) => row.name,
            format: (val) => `${val}`,
            sortable: true,
        },
    ];

    if (stringSplit.length % intForce == 0) {
        if (stringSplit.length / intForce === paramentros.length) {
            for (var i = 0; i < paramentros.length; i++) {
                var start = i * intForce;
                var final = start + intForce;
                let jogos = [];
                var parte = stringSplit.slice(start, final);
                var calculando = parte.reduce(
                    (acc, num) => acc + parseInt(num),
                    0
                );
                // console.log("parte", parte);

                // console.log(`'${i} ${paramentros[i]} ${parte}`);

                jsonDados[paramentros[i]] = parseInt(calculando / intForce);
                arrayDados.push({
                    name: paramentros[i],
                    //   dados: `${parte}`,
                    //   media: parseInt(calculando / intForce),
                });
                for (let j = 0; j < parte.length; j++) {
                    jogos.push({ ["jogo_" + (j + 1)]: parte[j] });
                    Object.assign(arrayDados[i], { ...jogos[j] });
                    if (j + 1 == parte.length) {
                        Object.assign(arrayDados[i], {
                            media: (calculando / intForce).toFixed(2),
                        });
                    }
                }
                // arrayDados.push({
                //   media: parseInt(calculando / intForce),
                // });
                if (paramentros.length == i + 1) {
                    jsonDados["nome"] = time;

                    break;
                }
            }
            if (tipo === "row") {
                return arrayDados;
            } else if (tipo === "columns") {
                for (let c = 0; c < intForce; c++) {
                    arrayColumuns.push({
                        name: "jogo_" + [c + 1],
                        align: "center",
                        label: "Jogo " + [c + 1],
                        field: "jogo_" + [c + 1],
                        sortable: true,
                    });
                }
                arrayColumuns.push({
                    name: "media",
                    label: "Media",
                    field: "media",
                    sortable: true,
                    sortable: true,
                });
                return arrayColumuns;
            }
            return jsonDados;
        }
        return `quantidade de paramentros passado não condiz com a quantidade de ${quantidadeJogos} jogos e intervalos de estatititicas que foram ${
            stringSplit.length / quantidadeJogos
        }, confira!.  foram ${paramentros.length} paramentos `;
    }
    return `Quantidade de estatiticas passado não condiz com quantidade de jogos passado, verifique. Quantidade de números estatiticos ${stringSplit.length}, quantidade de jogos passados ${quantidadeJogos}`;
}
function returnVirgula(values) {
    // let metricaVirgula = values;
    let arrayNew = [];
    for (const chave in values) {
        for (const jogo in values[chave]) {
            arrayNew.push(values[chave][jogo]);
        }
    }
    return arrayNew.join();
}

function metricasParamsValues(listaParams, quantity) {
    const newLista = [];
    const objValue = {};
    for (let i = 0; i < listaParams.length; i++) {
        newLista.push(listaParams[i].name);
    }
    for (let o = 0; o < newLista.length; o++) {
        Object.assign(objValue, { [newLista[o]]: {} });
        for (let j = 0; j < quantity; j++) {
            Object.assign(objValue[newLista[o]], { ["jogo_" + (j + 1)]: "" });
        }
    }
    return objValue;
}

const APISPORT = {
    response: {
        league: {
            id: 71,
            name: "Serie A",
            country: "Brazil",
            logo: "https://media-3.api-sports.io/football/leagues/71.png",
            flag: "https://media-3.api-sports.io/flags/br.svg",
            season: 2023,
        },
        team: {
            id: 127,
            name: "Flamengo",
            logo: "https://media-2.api-sports.io/football/teams/127.png",
        },
        form: "WLLLWWWDWWLWWDDD",
        fixtures: {
            played: {
                home: 8,
                away: 8,
                total: 16,
            },
            wins: {
                home: 5,
                away: 3,
                total: 8,
            },
            draws: {
                home: 2,
                away: 2,
                total: 4,
            },
            loses: {
                home: 1,
                away: 3,
                total: 4,
            },
        },
        goals: {
            for: {
                total: {
                    home: 15,
                    away: 13,
                    total: 28,
                },
                average: {
                    home: "1.9",
                    away: "1.6",
                    total: "1.8",
                },
                minute: {
                    "0-15": {
                        total: 5,
                        percentage: "17.86%",
                    },
                    "16-30": {
                        total: 5,
                        percentage: "17.86%",
                    },
                    "31-45": {
                        total: 2,
                        percentage: "7.14%",
                    },
                    "46-60": {
                        total: 7,
                        percentage: "25.00%",
                    },
                    "61-75": {
                        total: 3,
                        percentage: "10.71%",
                    },
                    "76-90": {
                        total: 2,
                        percentage: "7.14%",
                    },
                    "91-105": {
                        total: 4,
                        percentage: "14.29%",
                    },
                    "106-120": {
                        total: null,
                        percentage: null,
                    },
                },
            },
            against: {
                total: {
                    home: 5,
                    away: 14,
                    total: 19,
                },
                average: {
                    home: "0.6",
                    away: "1.8",
                    total: "1.2",
                },
                minute: {
                    "0-15": {
                        total: 1,
                        percentage: "5.26%",
                    },
                    "16-30": {
                        total: 3,
                        percentage: "15.79%",
                    },
                    "31-45": {
                        total: 3,
                        percentage: "15.79%",
                    },
                    "46-60": {
                        total: 5,
                        percentage: "26.32%",
                    },
                    "61-75": {
                        total: 2,
                        percentage: "10.53%",
                    },
                    "76-90": {
                        total: 4,
                        percentage: "21.05%",
                    },
                    "91-105": {
                        total: 1,
                        percentage: "5.26%",
                    },
                    "106-120": {
                        total: null,
                        percentage: null,
                    },
                },
            },
        },
        biggest: {
            streak: {
                wins: 3,
                draws: 1,
                loses: 3,
            },
            wins: {
                home: "3-0",
                away: "1-4",
            },
            loses: {
                home: "2-3",
                away: "4-0",
            },
            goals: {
                for: {
                    home: 3,
                    away: 4,
                },
                against: {
                    home: 3,
                    away: 4,
                },
            },
        },
        clean_sheet: {
            home: 5,
            away: 1,
            total: 6,
        },
        failed_to_score: {
            home: 0,
            away: 2,
            total: 2,
        },
        penalty: {
            scored: {
                total: 4,
                percentage: "100.00%",
            },
            missed: {
                total: 0,
                percentage: "0%",
            },
            total: 4,
        },
        lineups: [
            {
                formation: "4-2-3-1",
                played: 5,
            },
            {
                formation: "4-2-2-2",
                played: 4,
            },
            {
                formation: "4-3-1-2",
                played: 2,
            },
            {
                formation: "3-4-2-1",
                played: 2,
            },
            {
                formation: "4-3-3",
                played: 2,
            },
            {
                formation: "4-4-2",
                played: 1,
            },
        ],
        cards: {
            yellow: {
                "0-15": {
                    total: null,
                    percentage: null,
                },
                "16-30": {
                    total: 3,
                    percentage: "9.38%",
                },
                "31-45": {
                    total: 6,
                    percentage: "18.75%",
                },
                "46-60": {
                    total: 7,
                    percentage: "21.88%",
                },
                "61-75": {
                    total: 5,
                    percentage: "15.63%",
                },
                "76-90": {
                    total: 6,
                    percentage: "18.75%",
                },
                "91-105": {
                    total: 5,
                    percentage: "15.63%",
                },
                "106-120": {
                    total: null,
                    percentage: null,
                },
            },
            red: {
                "0-15": {
                    total: null,
                    percentage: null,
                },
                "16-30": {
                    total: null,
                    percentage: null,
                },
                "31-45": {
                    total: null,
                    percentage: null,
                },
                "46-60": {
                    total: null,
                    percentage: null,
                },
                "61-75": {
                    total: null,
                    percentage: null,
                },
                "76-90": {
                    total: null,
                    percentage: null,
                },
                "91-105": {
                    total: 1,
                    percentage: "100.00%",
                },
                "106-120": {
                    total: null,
                    percentage: null,
                },
            },
        },
    },
};

function salvedMetricasLocaStorage(team, params, metricas, columns) {}

export { APISPORT, metricas, returnVirgula, metricasParamsValues };
