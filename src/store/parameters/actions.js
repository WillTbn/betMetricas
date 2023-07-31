export function getGamesSalved(context) {
    // localStorage.setItem();
    const games = localStorage.length;
    if (localStorage.length > 0) {
        let data = [];

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            data.push(JSON.parse(value));
            data[i][0]["key"] = key;
            // console.log("Chave: " + key);
            // console.log("Valor: " + value);
        }
        // for (let i = 0; i < data.length; i++) {
        //     console.log(data[i][i]);
        // }

        for (let i = 0; i < data.length; i++) {
            context.commit("addGames", data[i][0]);
        }
    }
}

export function deletedGameSalved(context, item) {
    localStorage.removeItem(item.key);
    context.commit("deleteTeam", item.name);
}
