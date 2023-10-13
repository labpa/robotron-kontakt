import {
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
} from "./util.js";

forceLogin();
showNavbar("nav#navbar");
showFooter("footer#footer");

document.querySelector("form").onsubmit = async ev => {
    ev.preventDefault();
    const submitData = {};
    const formData = new FormData(ev.target);
    const entries = formData.entries();
    for (const entry of entries) {
        submitData[entry[0]] = entry[1] === "" ? null : entry[1];
    }
    const { data, error } = await supabase.from('profiles').insert([submitData]);
    window.open("./users.html", "_self");
}
