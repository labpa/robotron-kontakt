export { supabase, forceLogin }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
	
const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const forceLogin = async function() {
	const session = await supabase.auth.getSession();
	if (session.data.session === null) {
		window.open("./login.html", "_self");
	}
};

const session = await supabase.auth.getSession();

// Creating the navbar items, depending on if logged in or not
{
	const navbar = document.querySelector("nav#navbar");
	navbar.classList.add("navbar");

	const linkInput = function(){
		const elem = document.createElement("a");
		elem.innerText = "Neuer Kontakt";
		elem.setAttribute("href", "./index.html");
		return elem;
	}();

	const linkKontakte = function(){
		const elem = document.createElement("a");
		elem.innerText = "Kontakte";
		elem.setAttribute("href", "./kontakte.html");
		return elem;
	}();

	const linkLogin = function(){
		const elem = document.createElement("a");
		elem.innerText = "Anmelden";
		elem.setAttribute("href", "./login.html");
		return elem;
	}();

	const linkLogout = function(){
		const elem = document.createElement("a");
		elem.innerText = session.data.session?.user.email + " abmelden";
		elem.setAttribute("href", "a");	
		elem.addEventListener("click", async (ev)=>{
			ev.preventDefault();
			const { error } = await supabase.auth.signOut();
			window.open("./login.html", "_self");
		});
		return elem;
	}();

	navbar.appendChild(linkInput);
	if (session.data.session) {
		navbar.appendChild(linkKontakte);
	}
	navbar.appendChild(session.data.session ? linkLogout : linkLogin);
}