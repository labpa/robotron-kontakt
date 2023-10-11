import { createTable, forceLogin, supabase, csv, xml, richtigesDatum, fixAllDates, fixAllHeaderNames } from "./util.js";

forceLogin();
let { data, error } = await supabase.from("Kontakte").select("*");
data.sort((a,b) => a.id - b.id);
data = fixAllDates(data);
data = fixAllHeaderNames(data);
createTable(data);

let angezeigeData = data;
document.querySelector("form#formSearch").onsubmit = ev => {
    ev.preventDefault();
    let filteredData = data;
    const searchInput = document.querySelector("input#searchInput").value.toLowerCase().split(" ");
    for (const i in searchInput) {
        const word = searchInput[i].trim();
        filteredData = filteredData.filter(row => {
            for (const i in row){
                const cell = String(row[i]).toLowerCase();
                if (cell.includes(word)) {
                    return true;
                }
            }
            return false;
        });
    }
    createTable(filteredData);
	angezeigeData = filteredData;
}


document.querySelector("button#csv").onclick = ev => {
	const link = document.createElement("a");
	const BOM = new Uint8Array([0xEF,0xBB,0xBF]);
	const file = new Blob([ BOM, csv(angezeigeData) ]);
	link.href = URL.createObjectURL(file);
	link.download = "kontakte.csv";
	link.click();
	URL.revokeObjectURL(link.href);
}


document.querySelector("button#xml").onclick = ev => {
    const link = document.createElement("a");
	const BOM = new Uint8Array([0xEF,0xBB,0xBF]);
	const file = new Blob([ BOM, xml(angezeigeData) ]);
	link.href = URL.createObjectURL(file);
	link.download = "kontakte.xml";
	link.click();
	URL.revokeObjectURL(link.href);
}
