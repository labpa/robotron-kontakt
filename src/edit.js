import {
    forceLogin,
    showFooter,
    showNavbar,
    supabase,
} from "./util.js";

forceLogin();
showNavbar("nav#navbar");
showFooter("footer#footer");

const url = new URL(window.location);
const id = url.searchParams.get("id");
let { data, error } = await supabase.from('Kontakte').select('*').eq('id', id);

const form = document.querySelector("form");
if (error) {
    form.textContent = "Ein Fehler ist aufgetreten.";
} else if (data.length === 0) {
    form.textContent = "Datensatz nicht vorhanden.";
} else {
    for (const key in data[0]) {
        const inputNode = document.querySelector(`form#form-edit #${key}`);
        if (inputNode !== null) {
            inputNode.value = data[0][key];
        }
    }
    const radios = document.querySelectorAll("form#form-edit input[type='radio'][name='Zustellung_Angebot']");
    for (const radio of radios) {
        if (data[0]["Zustellung_Angebot"] === radio.value) {
            radio.checked = true;
        }
    }
    const contactForm = document.querySelector("#form-edit");
    const submitButton = document.querySelector("#btn-submit");
    contactForm.onsubmit = async (ev) => {
        const tmp = contactForm.onsubmit;
        contactForm.onsubmit = null;
        ev.preventDefault();
        submitButton.disabled = true;
        const submitData = {};
        const formData = new FormData(ev.target);
        const entries = formData.entries();
        for (const entry of entries) {
            submitData[entry[0]] = entry[1] === "" ? null : entry[1];
        }
        submitData["updated_at"] = "now()";
        const { data, error } = await supabase.from('Kontakte').update(submitData).eq('id', id);
        contactForm.onsubmit = tmp;
        submitButton.disabled = false;
        window.open("./kontakte.html", "_self");
    }
}
