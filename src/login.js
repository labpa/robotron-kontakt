import { supabase } from "./util.js";

const session = await supabase.auth.getSession();
const helloTxt = document.querySelector("#hellotxt");
helloTxt.innerText = session.data.session
	? "Sie sind angemeldet."
	: "Sie sind nicht angemeldet.";

const loginForm = document.querySelector("#form-login");
const submitButton = document.querySelector("#btn-submit");
loginForm.onsubmit = async (ev)=>{
	ev.preventDefault();
	submitButton.disabled = true;
	const formData = new FormData(ev.target);
	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.get("E-Mail"),
		password: formData.get("Password"),
	});
	if (error != null) alert(error);
	submitButton.disabled = false;
	location.reload();
	
	window.open("./index.html", "_self");
}