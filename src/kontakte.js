import { supabase, forceLogin } from "./util.js";

forceLogin();
let { data, error } = await supabase.from('Kontakte').select('*');
createTable(data);


// Creates a table out of the data from a SQL-Supabase-query in the "div#container"
function createTable(data, isWithViewButton=true) {
	let div = document.querySelector("#container");
	if (data.length === 0) {
		div.appendChild(document.createTextNode("Keine Daten"));
	} else {
		const table = document.createElement("table");
		createTableHead(data, table);
		createTableBody(data, table);
		div.appendChild(table);
	}

	// helper functions for createTable()
	function createTableHead(data, table, isWithViewButton=true) {
		const thead = document.createElement("thead");
		const trhead = document.createElement("tr");
		const thView = document.createElement("th");
		if (isWithViewButton) {
			thView.appendChild(document.createTextNode("Ansehen"));
			trhead.appendChild(thView);
		}
		
		for (const key in data[0]) {
			const th = document.createElement("th");
			th.appendChild(document.createTextNode(key));
			trhead.appendChild(th);
		}
		table.appendChild(thead);
		thead.appendChild(trhead);
	}

	function createTableBody(data, table, isWithViewButton=true) {
		const tbody = document.createElement("tbody");
		for (const row of data) {
			const tr = document.createElement("tr");
			
			if (isWithViewButton) createViewButton(tr);
							
			for (const cell in row) {
				const td = document.createElement("td");
				td.dataset.label = cell;
				td.appendChild(document.createTextNode(row[cell]));
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		
		// helper function for createViewButton()
		function createViewButton(tr) {
			const buttonView = document.createElement("button");
			buttonView.appendChild(document.createTextNode("View"));
			buttonView.addEventListener("click", ()=>window.open("./view.html?id=" + row.id, "_self"));
			const tdView = document.createElement("td");
			tdView.appendChild(buttonView);
			tr.appendChild(tdView);
		}
	}
}
