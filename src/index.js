import {
    supabase,
} from "./util.js";

const contactForm = document.querySelector("#form-insert");
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
    const session = await supabase.auth.getSession();
    if (session.data.session !== null) {
        submitData["Creator"] = session.data.session.user.email;
    }
    const {
        data,
        error,
    } = await supabase
        .from('Kontakte')
        .insert([submitData]);
    contactForm.reset();
    contactForm.onsubmit = tmp;
    submitButton.disabled = false;
}
