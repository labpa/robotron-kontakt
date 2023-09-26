import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

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
	for (const key in data[0]) {
		const th = document.createElement("th");
		th.appendChild(document.createTextNode(key));
		thead.appendChild(th);
	}
	
	const thLöschen = document.createElement("th");
	thLöschen.appendChild(document.createTextNode("Löschen"));
	thead.appendChild(thLöschen);
	
	const thBearbeiten = document.createElement("th");
	thBearbeiten.appendChild(document.createTextNode("Bearbeiten"));
	thead.appendChild(thBearbeiten);
	
	table.appendChild(thead);
	
	
	for (const row of data) {
		const tr = document.createElement("tr");
		for (const cell in row) {
			const td = document.createElement("td");
			td.appendChild(document.createTextNode(row[cell]));
			tr.appendChild(td);
		}
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
		
		table.appendChild(tr);
	}
	div.appendChild(table);
}