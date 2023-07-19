export function addName(state, payload) {
    state.data.push({ name: payload });
}

export function removeName(state, payload) {
    let item = state.data.indexOf(state.data.find((e) => e.name === payload));
    state.data.splice(item, 1);
}
export function sendGames(state, payload) {
    let data = [];
    if (payload > 0) {
        state.data.forEach((element) => {
            element.jogos = [];
            for (let i = 0; i < parseInt(payload); i++) {
                // data.push({ name: "jogo " + (i + 1) });
                element.jogos.push({
                    name: `${element.name} jogo ${i + 1}`,
                    // name: "jogo " + (i + 1) + " " + element.name,
                });
            }
        });
        return (state.games = data);
    }
    return (state.games = data);
}
export function sendRemove(state, payload) {
    state.data.forEach((e) => {
        e.jogos = [];
    });
}
export function addGames(state, payload) {
    state.gamesSalved.push(payload);
}

export function increaseStep(state, payload) {
    state.step = state.step + payload;
}
export function toDecreaseStep(state, payload) {
    state.step = state.step - payload;
}

export function addTeam(state, payload) {
    state.team = payload;
}
export function addQuant(state, payload) {
    state.quantityGames = payload;
}

export function deleteTeam(state, payload) {
    state.games = state.games.filter((item) => item.name !== payload);
}

export function getGameOne(state, payload) {
    console.log("mutations ->", state.oneStatistics);
    state.oneStatistics = JSON.parse(localStorage.getItem(payload))[0];
    console.log("mutations ->", state.oneStatistics.editable);
}
export function setParamsRow(state, payload) {
    state.paramsRow = payload;
}
export function setParamsColumns(state, payload) {
    state.paramsColumns = payload;
}
export function setMetricas(state, payload) {
    state.metricas = payload;
}
