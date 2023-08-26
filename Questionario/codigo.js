window.addEventListener('keypress',(event)=>{
	console.log(event)
	if(event.key == 'Enter') nextQuestion();
})

function cargarForm(){
	container.style.display = 'flex';
	btnComienzo.style.display = 'none';

	let op1 = document.getElementById('op1')
	op1.addEventListener('click',()=>{
		answer.innerHTML = op1.innerHTML;
		// dropdownContent.style.display = 'none';
	})

	let op2 = document.getElementById('op2')
	op2.addEventListener('click',()=>{
		answer.innerHTML = op2.innerHTML;
		// dropdownContent.style.display = 'none';
	})

	let op3 = document.getElementById('op3')
	op3.addEventListener('click',()=>{
		answer.innerHTML = op3.innerHTML;
		// dropdownContent.style.display = 'none';
	})

	let op4 = document.getElementById('op4')
	op4.addEventListener('click',()=>{
		answer.innerHTML = op4.innerHTML;
		// dropdownContent.style.display = 'none';
	})

	let op5 = document.getElementById('op5')
	op5.addEventListener('click',()=>{
		answer.innerHTML = op5.innerHTML;
		// dropdownContent.style.display = 'none';
	})

	let op6 = document.getElementById('op6')
	op6.addEventListener('click',()=>{
		answer.innerHTML = op6.innerHTML;
		// dropdownContent.style.display = 'none';
	})
}

function endForm(){
	let d = getDateFromStorage()
	console.log(d)
	let event = {
		tipe: data[0],
		remind: data[data.length-1],
		extra: data[data.length-2],
		date: d[0],
		hour: d[1],
		time: data[1]
	}

	if(data[0] == 'Deberes'){
		event.subject = data[2];
		event.pages = data[3];
		event.exercices = data[4];
		event.event = `Deberes de ${event.subject}`;
	}
	else if(data[0] == 'Examen'){
		event.subject = data[2];
		event.units = data[3];
		event.event = `Examen de ${event.subject}`;
	}
	else if(data[0] == 'Proyecto'){
		event.name = data[2];
		event.topic = data[3];
		event.description = data[4];
		event.event = `Proyecto ${event.name}`;
	}
	else if(data[0] == 'Viaje'){
		event.place = data[2];
		event.estancia = data[3];
		event.residence = data[4];
		event.plan = data[5];
		event.event = `Viaje a ${event.place}`;
	}
	else if(data[0] == 'Cumpleaños'){
		event.cumpleañero = data[2];
		event.event = `Cumpleaños de ${event.cumpleañero}`;
	}
	else if(data[0] == 'Otro'){
		event.name = data[2];
		event.description = data[3];
		event.event = event.name;
	}
    addEventToStorage(event);
    close('index.html');
}

function nextQuestion(){
	if(answer.innerHTML == 'Opción' && answerCamp.style.display != 'block'){
		alert('Debes elegir una opción');
	}

	else if(answer.innerHTML == 'Deberes' || answer.innerHTML == 'Examen' || answer.innerHTML == 'Proyecto' || answer.innerHTML == 'Viaje' || answer.innerHTML == 'Cumpleaños' || answer.innerHTML == 'Otro'){
		question.innerHTML = '¿A que hora es el evento?';
		data.push(answer.innerHTML);
		answerCamp.style.display = 'none';
		answer = document.querySelectorAll('.answer')[1];
		answer.style.display = 'block';
	}

	else if(question.innerHTML == '¿A que hora es el evento?'){
		let A = document.querySelector('.num1').value;
		let B = document.querySelector('.num2').value;
		data.push(`${A}:${B}`);
		// else alert('Debes introducir la hora y los minutos en el siguiente formato: xx:xx');

		if(data[0] == 'Deberes') question.innerHTML = homeworkQuestions[0];
		else if(data[0] == 'Examen') question.innerHTML = examQuestions[0];
		else if(data[0] == 'Proyecto') question.innerHTML = projectQuestions[0];
		else if(data[0] == 'Viaje') question.innerHTML = travelQuestions[0];
		else if(data[0] == 'Cumpleaños') question.innerHTML = birthayQuestions[0];
		else if(data[0] == 'Otro') question.innerHTML = otherQuestions[0];

		answer.style.display = 'none';
		answer = document.querySelectorAll('.answer')[2];
	    answer.style.display = 'block';
	}

	else if(question.innerHTML == comunQuestions[0]){
		data.push(answer.value);
		question.innerHTML = comunQuestions[1];
		answer.value = '';
	}
	else if(question.innerHTML == comunQuestions[1]){
		data.push(answer.value);
		endForm()
	}

	else{
		questTipes.forEach((quests)=>{
		    for(let id in quests){
		    	quest = quests[id];
			    if(quest == question.innerHTML && answer.value){
			    	if(quest == quests[quests.length-1]){
			    		data.push(answer.value);
			    		question.innerHTML = comunQuestions[0];
			    		answer.value = '';
			        }
			        else{
				        question.innerHTML = quests[parseInt(id)+1];
				        data.push(answer.value);
				        answer.value = '';
				        break;
			        }
			    }
		    }
	    });
	}
}

function lastQuestion(){
}

function addEventToStorage(event){
    let storedEventList = localStorage.getItem("eventList");
    let eventList = storedEventList ? JSON.parse(storedEventList) : [];
    
    eventList.push(event)
    localStorage.setItem("eventList", JSON.stringify(eventList));
}

function getDateFromStorage(){
	let storedDate = localStorage.getItem("eventDate");
  let cDate = storedDate ? new Date(storedDate) : [];
  let hour = cDate.toISOString().split('T')[1];
  let date = cDate.toISOString().split('T')[0];
  return [date,hour]
}

let question = document.querySelector('.question');
let answer = document.querySelectorAll('.answer')[0];

let homeworkQuestions = ['Introduce el nombre de la asignatura','A continuación introduce las páginas donde se encuentran los deberes','¿Cuáles son los deberes a realizar?'];
let examQuestions = ['¿De que asignatura es el examen?','A continuación introduce los temas que entran en el examen'];
let projectQuestions = ['Introduce el nombre del proyecto','A continuación introduce el tema del proyecto','Ahora, introduce una breve descripción de este'];
let travelQuestions = ['¿Dónde vas a ir de viaje?','A continuación introduce los dias que vas a estar','¿Dónde te vas a alojar?','Cúal es el plan de viaje?'];
let birthayQuestions = ['¿De quién es el cumpleaños?'];
let otherQuestions = ['Introduce un nombre para el evento','A continuación introduce una pequeña descripción del evento'];
let comunQuestions = ['Aportaciones extra','¿Deseas un recordatorio?'];

let questTipes = [homeworkQuestions,examQuestions,projectQuestions,travelQuestions,birthayQuestions,otherQuestions];

let btnComienzo = document.querySelector('.btn-comienzo');
let container = document.querySelector('.container');
let dropdownContent = document.querySelector('.dropdown-content');
let answerCamp = document.querySelector('.answer-camp');
var data = [];