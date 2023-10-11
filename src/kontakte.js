import {
    createTable,
    csv,
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
    withReadableDates,
    withReadableKeys,
    xml,
} from "./util.js";

forceLogin();
showNavbar("nav#navbar");
showFooter("footer#footer");

let { data, error } = await supabase.from("Kontakte").select("*");
data.sort((a, b) => a.id - b.id);
data = withReadableDates(data);
data = withReadableKeys(data);
let tableData = data;
createTable("div#container", tableData);
document.querySelector("form#formSearch").onsubmit = ev => {
    ev.preventDefault();
    let filteredData = data;
    const searchInput = document.querySelector("input#searchInput").value.toLowerCase().split(" ");
    for (const i in searchInput) {
        const word = searchInput[i].trim();
        filteredData = filteredData.filter(row => {
            for (const i in row) {
                const cell = String(row[i]).toLowerCase();
                if (cell.includes(word)) {
                    return true;
                }
            }
            return false;
        });
    }
    createTable("div#container", filteredData);
    tableData = filteredData;
}

document.querySelector("button#csv").onclick = ev => {
    const link = document.createElement("a");
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const file = new Blob([bom, csv(tableData)]);
    link.href = URL.createObjectURL(file);
    link.download = "kontakte.csv";
    link.click();
    URL.revokeObjectURL(link.href);
}

document.querySelector("button#xml").onclick = ev => {
    const link = document.createElement("a");
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const file = new Blob([bom, xml(tableData)]);
    link.href = URL.createObjectURL(file);
    link.download = "kontakte.xml";
    link.click();
    URL.revokeObjectURL(link.href);
}
