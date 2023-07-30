export function updateStatusCookie(context, status) {
    // if (status === true) {
    //     document.cookie = "terms=false";
    // }
    console.log(status);
    context.commit("setStatusCookie", true);
}
