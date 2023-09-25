import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const contactForm = document.querySelector("#form-insert");
const submitButton = document.querySelector("#btn-submit");
contactForm.onsubmit = async (ev)=>{
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
	const { data, error } = await supabase
		.from('Kontakte')
		.insert([
			submitData
		]);
	contactForm.reset();
	contactForm.onsubmit = tmp;
	submitButton.disabled = false;
}
