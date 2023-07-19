import { useStore } from "vuex";
import { metricas, returnVirgula } from "../../utils/essencial";
export default function useMetricas() {
    const store = useStore();
    const getOne = async (item) => {
        let game = JSON.parse(localStorage.getItem(item))[0];

        return game;
    };
    const update = async (item) => {
        // localStorage.removeItem(item.name)
        // let getLocalstorage = localStorage.getItem(item.name);
        item.update_at = Date.now();
        console.log(item.editable);
        item.params = [];

        // localStorage.setItem(item)
        localStorage.setItem(item.name, JSON.stringify([item]));
        console.log(item);
    };
    const create = async (team, params, metricas, columns) => {
        console.log("team ->", team);
        console.log("params ->", params);
        console.log("metricas ->", metricas);
        console.log("columns ->", columns);
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
    return {
        getOne,
        update,
        create,
        deleted,
    };
}
