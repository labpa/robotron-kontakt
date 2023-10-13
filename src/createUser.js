import { forceLogin, supabase } from "./util.js";
forceLogin();
document.querySelector("form button#btn-submit").onclick = async ev => {
    ev.preventDefault();
    const { data, error } = await supabase.auth.admin.inviteUserByEmail("concepciona@myrobotron.de");
    // window.open("./users.html", "_self");
}