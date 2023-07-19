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

                console.log(`'${i} ${paramentros[i]} ${parte}`);

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

function salvedMetricasLocaStorage(team, params, metricas, columns) {}

export { metricas, returnVirgula, metricasParamsValues };
