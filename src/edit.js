import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
	'https://lqgnahenxkmdkenuxbxw.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ25haGVueGttZGtlbnV4Ynh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDg0NDksImV4cCI6MjAxMDc4NDQ0OX0.XrMlC1LGwKXDw0yg1AqKjzsiUdV-XLsfLEfdSq7gJh0',
);

const url = new URL(window.location);
const id = url.searchParams.get("id");


let { data, error } = await supabase
	.from('Kontakte')
	.select('*')
	.eq('id' , id);

for (const key in data[0]) {
	//console.log(key, data[0][key]);
	const inputNode = document.querySelector(`form#form-edit #${key}`);
	if (inputNode !== null) {
		inputNode.value = data[0][key];
	}
}
const radios = document.querySelectorAll("form#form-edit input[type='radio'][name='Zustellung_Angebot']");
for (const el of radios) {
	if (data[0]["Zustellung_Angebot"] === el.value) {
		el.checked = true;
	}
}



const contactForm = document.querySelector("#form-edit");
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
	submitData["updated_at"] = "now()";
	
	const { data, error } = await supabase
		.from('Kontakte')
		.update(submitData)
		.eq('id', id);

	contactForm.reset();
	contactForm.onsubmit = tmp;
	submitButton.disabled = false;
}
