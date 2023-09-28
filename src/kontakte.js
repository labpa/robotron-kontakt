import { supabase, forceLogin, createTable } from "./util.js";

forceLogin();
let { data, error } = await supabase.from('Kontakte').select('*');
createTable(data);


