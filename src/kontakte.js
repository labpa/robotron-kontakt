import { supabase, forceLogin } from "./util.js";

forceLogin();

const deleteRow = async function(id) {
	const { error } = await supabase.from('Kontakte').delete().eq('id', id);
	location.reload();
}

const editRow = function(id) {
	window.open("./edit.html?id=" + id, "_self");
}

let { data, error } = await supabase.from('Kontakte').select('*');
let div = document.querySelector("#container");
if (data.length === 0) {
	div.appendChild(document.createTextNode("Keine Daten"));
} else {
	const table = document.createElement("table");
	const thead = document.createElement("tr");
	
	const thLöschen = document.createElement("th");
	thLöschen.appendChild(document.createTextNode("Löschen"));
	thead.appendChild(thLöschen);
	
	const thBearbeiten = document.createElement("th");
	thBearbeiten.appendChild(document.createTextNode("Bearbeiten"));
	thead.appendChild(thBearbeiten);
	
	for (const key in data[0]) {
		const th = document.createElement("th");
		th.appendChild(document.createTextNode(key));
		thead.appendChild(th);
	}
	table.appendChild(thead);

	for (const row of data) {
		const tr = document.createElement("tr");
		
		const buttonDelete = document.createElement("button");
		buttonDelete.appendChild(document.createTextNode("Löschen"));
		buttonDelete.addEventListener("click", ()=>deleteRow(row.id));
		const tdDelete = document.createElement("td");
		tdDelete.appendChild(buttonDelete);
		tr.appendChild(tdDelete);
		
		const buttonBearbeiten = document.createElement("button");
		buttonBearbeiten.appendChild(document.createTextNode("Bearbeiten"));
		buttonBearbeiten.addEventListener("click", ()=>editRow(row.id));
		const tdBearbeiten = document.createElement("td");
		tdBearbeiten.appendChild(buttonBearbeiten);
		tr.appendChild(tdBearbeiten);
		
		for (const cell in row) {
			const td = document.createElement("td");
			td.appendChild(document.createTextNode(row[cell]));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	div.appendChild(table);
}