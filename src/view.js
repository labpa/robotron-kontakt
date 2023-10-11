import {
    createTable,
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
    withReadableDates,
    withReadableKeys,
} from "./util.js";

forceLogin();
showNavbar("nav#navbar");
showFooter("footer#footer");

const id = (new URL(window.location)).searchParams.get("id");

let { data, error } = await supabase.from('Kontakte').select('*').eq('id', id);
data = withReadableDates(data);
data = withReadableKeys(data);
createTable("div#container", data, false);

let buttonContainer = document.querySelector("#buttonContainer");
buttonContainer.appendChild(function() {
    const button = document.createElement("button");
    button.textContent = "Löschen";
    button.onclick = async () => {
        const { error } = await supabase.from('Kontakte').delete().eq('id', id);
        window.open("./kontakte.html", "_self");
    };
    return button;
}());
buttonContainer.appendChild(function() {
    const button = document.createElement("button");
    button.textContent = "Bearbeiten";
    button.onclick = () => window.open("./edit.html?id=" + id, "_self");
    return button;
}());
