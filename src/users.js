import {
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
} from "./util.js";

forceLogin();
showNavbar("nav#navbar");
showFooter("footer#footer");

const { data, error } = await supabase.from("profiles").select("*");
data.sort((a, b) => a.email - b.email);

const table = document.createElement("table");
document.querySelector("#container").appendChild(table);

// table head
const tr = document.createElement("tr");
for (const key in data[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
}
if (data.length > 0) {
    const thDelete = document.createElement("th");
    thDelete.textContent = "Löschen";
    tr.append(thDelete)
}
const thead = document.createElement("thead");
thead.replaceChildren(tr);
table.appendChild(thead);

// table body
const tbody = document.createElement("tbody");
for (const i in data) {
    const record = data[i];
    const tr = document.createElement("tr");
    for (const key in record) {
        const value = record[key];
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
    }
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Löschen";
    buttonDelete.onclick = async ev => {
        const { error } = await supabase.from("profiles").delete().eq("id", record["id"]);
        location.reload();
    };
    const tdDelete = document.createElement("td");
    tdDelete.replaceChildren(buttonDelete);
    tr.appendChild(tdDelete);
    tbody.appendChild(tr);
}
table.appendChild(tbody);

const buttonCreate = document.createElement("button");
container.appendChild(buttonCreate);
buttonCreate.textContent = "Neuen Benutzer anlegen";
buttonCreate.onclick = async ev => {
    ev.preventDefault();
    window.open("./createUser.html", "_self");
};
