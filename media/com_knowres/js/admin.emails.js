// eslint-disable-next-line no-unused-vars
function toggleCron() {
	const items = ["GUESTARRIVALREMIND", "REVIEWREQUEST", "REVIEWREMINDER"];
	const items1 = ["CUSTOMBYDATE"];
	let value = document.getElementById('jform_trigger_actual').value;

	if (items.indexOf(value) >= 0 || items1.indexOf(value) >= 0) {
		document.getElementById("krcron_section").style.display = "block";
	} else {
		document.getElementById("krcron_section").style.display = "none";
	}
	if (items1.indexOf(value) >= 0) {
		document.getElementById("krcron_section1").style.display = "block";
	} else {
		document.getElementById("krcron_section1").style.display = "none";
	}
}
// eslint-disable-next-line no-unused-vars
function switchList() {
	let emailtype = document.getElementById('jform_switch').value;
	let myClasses = document.querySelectorAll('.tags'), i = 0, l = myClasses.length;
	for (i; i < l; i++) {
		if (myClasses[i].id === emailtype) {
			myClasses[i].style.display = 'block';
		} else {
			myClasses[i].style.display = 'none';
		}
	}
}