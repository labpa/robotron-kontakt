import { createTable, forceLogin, supabase } from "./util.js";

forceLogin();
const { data, error } = await supabase.from("Kontakte").select("*");
data.sort((a,b) => a.id - b.id);
createTable(data);
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
}

