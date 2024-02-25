export function someGetter(/* state */) {}
export function fullName(state) {
  console.log("estou aqui gettes");
  return state.data.given_name + " " + state.data.family_name;
}
