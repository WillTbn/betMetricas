import { useStore } from "vuex";
import { metricas, returnVirgula, addColumns } from "../../utils/essencial";
export default function useMetricas() {
  const store = useStore();
  const getOne = async (item) => {
    let game = JSON.parse(localStorage.getItem(item))[0];

    return game;
  };
  const updateField = async (name, newField, editable) => {
    // let first = JSON.parse(localStorage.getItem('Grêmio'))[0].editable[name]
    let totalFields =
      JSON.parse(localStorage.getItem(name))[0].columns.length - 2;

    let objcNew = { [newField]: {} };
    console.log(" objcNew =>", objcNew);
    console.log(" totalFields =>", totalFields);
    for (let i = 0; i < totalFields; i++) {
      Object.assign(objcNew[newField], {
        ["jogo_" + (i + 1)]: "",
      });
    }
    Object.assign(editable, objcNew);
    return editable;
  };
  const getUpdate = async (item) => {};
  const addPlaysMetricas = async (quantity, update) => {
    for (let i = 0; i < quantity; i++) {
      let contador = 0;
      for (let p = 0; p < Object.values(update).length; p++) {
        contador = +1;

        Object.assign(Object.values(update)[p], {
          ["jogo_" + (Object.keys(Object.values(update)[p]).length + contador)]:
            "",
        });
      }
    }

    return update;
  };
  const removeFinallyMetricas = async (update) => {};
  const update = async (item, metrica) => {
    item.update_at = Date.now();
    item.params = metricas(
      returnVirgula(item.editable),
      Object.keys(Object.values(item.editable)[0]).length,
      item.name,
      Object.keys(item.editable),
      "row"
    );
    item.columns = addColumns(Object.keys(Object.values(metrica)[0]).length);
    localStorage.setItem(item.name, JSON.stringify([item]));
  };
  const create = async (team, params, metricas, columns) => {
    // console.log("team ->", team);
    // console.log("params ->", params);
    // console.log("metricas ->", metricas);
    // console.log("columns ->", columns);
    let dataSalved = [];
    dataSalved.push({
      name: team,
      params: params,
      editable: { ...metricas },
      created_at: Date.now(),
    });
    Object.assign(dataSalved[0], {
      columns: columns,
    });

    localStorage.setItem(team, JSON.stringify(dataSalved));
  };
  const deleted = async (item) => {
    store.commit("parameters/deleteTeam", item.name);
    localStorage.removeItem(item.key);
  };
  const sizeLocalStorage = async (select) => {
    let size = 0;
    for (var k in localStorage) {
      if (
        localStorage.getItem(k) != null ||
        localStorage.getItem(k) != undefined
      ) {
        size += localStorage.getItem(k).length;
      }
    }
    let totalMB = size / 1024;
    let totalMBPossible = 16;
    let porc = (totalMB / totalMBPossible) * 100;
    let json = {
      mb: parseFloat(totalMB),
      porc: parseFloat(porc.toFixed(2)),
      kb: size,
    };

    return json[select];
  };
  const getAll = async () => {
    const gamesLocal = localStorage.length;
    const gamesStore = store.state.parameters.gamesSalved;
    if (gamesLocal > 0 && gamesLocal != gamesStore.length) {
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
        store.commit("parameters/addGames", data[i][0]);
      }
    }
    return gamesStore;
  };
  return {
    getOne,
    getAll,
    update,
    create,
    deleted,
    addPlaysMetricas,
    sizeLocalStorage,
    updateField,
  };
}
