import { supabase, forceLogin, createTable, fixAllDates, fixAllHeaderNames } from "./util.js";
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
data = fixAllDates(data);
data = fixAllHeaderNames(data);

let container = document.querySelector("#buttonContainer");
container.appendChild(btnDelete);
container.appendChild(btnEdit);

createTable(data, false);
