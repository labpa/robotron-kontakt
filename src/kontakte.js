import { supabase, forceLogin } from "./util.js";

forceLogin();

const editRow = function(id) {
	window.open("./edit.html?id=" + id, "_self");
}

let { data, error } = await supabase.from('Kontakte').select('*');
let div = document.querySelector("#container");
if (data.length === 0) {
	div.appendChild(document.createTextNode("Keine Daten"));
} else {
	const table = document.createElement("table");
	const thead = document.createElement("thead");
	const trhead = document.createElement("tr");
	
	const thView = document.createElement("th");
	thView.appendChild(document.createTextNode("Ansehen"));
	trhead.appendChild(thView);
	
	for (const key in data[0]) {
		const th = document.createElement("th");
		th.appendChild(document.createTextNode(key));
		trhead.appendChild(th);
	}
	table.appendChild(thead);
	thead.appendChild(trhead);

	const tbody = document.createElement("tbody");

	for (const row of data) {
		const tr = document.createElement("tr");
		
		const buttonView = document.createElement("button");
		buttonView.appendChild(document.createTextNode("View"));
		buttonView.addEventListener("click", ()=>window.open("./view.html?id=" + row.id, "_self"));
		const tdView = document.createElement("td");
		tdView.appendChild(buttonView);
		tr.appendChild(tdView);
				
		for (const cell in row) {
			const td = document.createElement("td");
			td.dataset.label = cell;
			td.appendChild(document.createTextNode(row[cell]));
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	div.appendChild(table);
}