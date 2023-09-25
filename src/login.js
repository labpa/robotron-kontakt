import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

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
}

const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener("click", async ()=>{
	const { error } = await supabase.auth.signOut();
	location.reload();
})