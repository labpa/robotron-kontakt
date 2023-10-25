import {
    showFooter,
    showNavbar,
    supabase,
} from "./util.js";

showNavbar("nav#navbar");
showFooter("footer#footer");

const session = await supabase.auth.getSession();

document.querySelector("#anmeldestatus").textContent =
    session.data.session ? "Sie sind bereits angemeldet." : "Sie sind nicht angemeldet.";

document.querySelector("#form-login").onsubmit = async ev => {
    ev.preventDefault();
    const submitButton = document.querySelector("#btn-submit");
    submitButton.disabled = true;
    const formData = new FormData(ev.target);
    const { data, error } = await supabase.auth.signInWithOtp({
        email: formData.get("E-Mail"),
        options: {
            emailRedirectTo: "https://labpa.github.io/robotron-kontakt"
        }
    });
    submitButton.disabled = false;
    if (error) {
        alert(error);
    } else {
        window.open("./index.html", "_self");
    }
}
