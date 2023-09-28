export { supabase, forceLogin, createTable }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
	
const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const forceLogin = async function() {
	const session = await supabase.auth.getSession();
	if (session.data.session === null) {
		window.open("./login.html", "_self");
	}
};

const session = await supabase.auth.getSession();

// Creating the navbar items, depending on if logged in or not
{
	const navbar = document.querySelector("nav#navbar");
	navbar.classList.add("navbar");

	const linkInput = function(){
		const elem = document.createElement("a");
		elem.innerText = "Neuer Kontakt";
		elem.setAttribute("href", "./index.html");
		return elem;
	}();

	const linkKontakte = function(){
		const elem = document.createElement("a");
		elem.innerText = "Kontakte";
		elem.setAttribute("href", "./kontakte.html");
		return elem;
	}();

	const linkLogin = function(){
		const elem = document.createElement("a");
		elem.innerText = "Anmelden";
		elem.setAttribute("href", "./login.html");
		return elem;
	}();

	const linkLogout = function(){
		const elem = document.createElement("a");
		elem.innerText = session.data.session?.user.email + " abmelden";
		elem.setAttribute("href", "a");	
		elem.addEventListener("click", async (ev)=>{
			ev.preventDefault();
			const { error } = await supabase.auth.signOut();
			window.open("./login.html", "_self");
		});
		return elem;
	}();

	navbar.appendChild(linkInput);
	if (session.data.session) {
		navbar.appendChild(linkKontakte);
	}
	navbar.appendChild(session.data.session ? linkLogout : linkLogin);
}


// Creates a table out of the data from a SQL-Supabase-query in the "div#container"
function createTable(data, isWithViewButton=true) {
	let div = document.querySelector("#container");
	if (data.length === 0) {
		div.innerHTML = "";
		div.appendChild(document.createTextNode("Keine Daten"));
	} else {
		const table = document.createElement("table");
		createTableHead(data, table, isWithViewButton);
		createTableBody(data, table, isWithViewButton);
		div.innerHTML = "";
		div.appendChild(table);
	}
}

// helper functions for createTable()
function createTableHead(data, table, isWithViewButton) {
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

function createTableBody(data, table, isWithViewButton) {
	const tbody = document.createElement("tbody");
	for (const row of data) {
		const tr = document.createElement("tr");
		
		if (isWithViewButton) {
			const buttonView = document.createElement("button");
			buttonView.classList.add("smallButton");
			buttonView.appendChild(document.createTextNode("Details"));
			buttonView.addEventListener("click", ()=>window.open("./view.html?id=" + row.id, "_self"));
			const tdView = document.createElement("td");
			tdView.appendChild(buttonView);
			tr.appendChild(tdView);

		}
						
		for (const cell in row) {
			const td = document.createElement("td");
			td.dataset.label = cell;
			td.appendChild(document.createTextNode(row[cell]));
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
}
