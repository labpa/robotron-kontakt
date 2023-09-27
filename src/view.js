import { supabase, forceLogin } from "./util.js";
forceLogin();


const btnDelete = function(){
	const elem = document.createElement("button");
	elem.appendChild(document.createTextNode("Löschen"));
	elem.addEventListener("click", async function(){
		const { error } = await supabase.from('Kontakte').delete().eq('id', id);
		window.open("./kontakte.html", "_self");
	});
	return elem;
}();

const btnEdit = function(){
		const elem = document.createElement("button");
		elem.innerText = "Bearbeiten";
		elem.addEventListener("click", ()=>window.open("./edit.html?id=" + id, "_self"));
		return elem;
}();

const url = new URL(window.location);
const id = url.searchParams.get("id");
let { data, error } = await supabase.from('Kontakte').select('*').eq('id', id);

let container = document.querySelector("#container");
if (data.length === 0) {
	container.appendChild(document.createTextNode("Keine Daten"));
} else {
	const list = document.createElement("ul");
	for (const key in data[0]) {
		const li = document.createElement("li");
		li.innerText = key + ": " + data[0][key];
		list.appendChild(li);
	}
	container.appendChild(list);
	container.appendChild(btnDelete);
	container.appendChild(btnEdit);
}