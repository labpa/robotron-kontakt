import { supabase, forceLogin, createTable } from "./util.js";

forceLogin();
let { data, error } = await supabase.from('Kontakte').select('*');
let searchForm = document.querySelector("form#formSearch");
searchForm.onsubmit = (ev) => {
	ev.preventDefault();
	
	let searchInput = document.querySelector("input#searchInput").value.toLowerCase().split(" ");
	let filteredData = data.filter((row) => {
		let match = true;
		for (const cell in row){
			for (const n in searchInput) {
				if (String(row[cell]).toLowerCase().includes(searchInput[n])) {
					// todo
				}
			}
		}
		return match;
	});
	createTable(filteredData);
}

createTable(data);