document.addEventListener('DOMContentLoaded', function (){
  const calendarContainer = document.getElementById('calendar');
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  renderCalendar(currentMonth, currentYear);

  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const calendarMonthYear = document.getElementById('calendar-month-year');

  prevMonthBtn.addEventListener('click', function (){
    currentMonth -= 1;
    if (currentMonth < 0){
      currentMonth = 11;
      currentYear -= 1;
   }
    renderCalendar(currentMonth, currentYear);
    const selectedDate = new Date(currentYear, currentMonth, 1);
    showEventSection(selectedDate);
    updateCalendarHeader(currentMonth, currentYear);
 });

  nextMonthBtn.addEventListener('click', function (){
    currentMonth += 1;
    if (currentMonth > 11){
      currentMonth = 0;
      currentYear += 1;
   }
    renderCalendar(currentMonth, currentYear);
    const selectedDate = new Date(currentYear, currentMonth, 1);
    showEventSection(selectedDate);
    updateCalendarHeader(currentMonth, currentYear);
 });



  function renderCalendar(month, year){
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    calendarContainer.innerHTML = ''; // Limpia el contenido previo

    // Crea el encabezado de los días de la semana
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const weekHeader = document.createElement('tr');
    daysOfWeek.forEach(day =>{
      const th = document.createElement('th');
      th.textContent = day;
      weekHeader.appendChild(th);
   });
    calendarContainer.appendChild(weekHeader);

    // Crea las celdas para cada día del mes
    let date = 1;
    for (let i = 0; i < 6; i++){
      const weekRow = document.createElement('tr');
      for (let j = 0; j < 7; j++){
        const dayCell = document.createElement('td');
        if (i === 0 && j < firstDay.getDay()){
          dayCell.textContent = '';
       }
        else if (date > lastDay.getDate()){
          break;
       }
        else{
          dayCell.textContent = date;
          date++;
       }

        dayCell.addEventListener('click', function (){
          let clickedDate = new Date(Date.UTC(year, month, parseInt(this.textContent)));
          showEventSection(clickedDate);
       });

        weekRow.appendChild(dayCell);
     }
      calendarContainer.appendChild(weekRow);
   }
 }


  function showEventSection(date){
    const eventSection = document.getElementById('event-section');
    const eventTitle = document.getElementById('event-section-title');
    const eventList = document.getElementById('event-list');
    const addEventBtn = document.getElementById('add-event-btn');

    addEventBtn.addEventListener('click',()=>{
      localStorage.setItem('eventDate',date.toISOString());
      window.open('Questionario/index.html');
   });
  
    // Cambiar el título de la sección de eventos
    const formattedDate = getFormattedDate(date);
    eventTitle.textContent = 'Eventos para el ' + formattedDate;

    // Obtener eventos para la fecha seleccionada
    let events = getEvents(date);

    // Limpiar la lista de eventos
    eventList.innerHTML = '';

    if (events.length > 0){
      events.forEach(function(event){
        const listItem = document.createElement('li');
        listItem.className = 'event-list-item';
        listItem.textContent = event.time + ' - ' + event.event;
        eventList.appendChild(listItem);
     });
   }
    else{
      const listItem = document.createElement('li');
      listItem.textContent = 'No hay eventos programados para este día.';
      eventList.appendChild(listItem);
   }

    // Mostrar la sección de eventos y asegurarse de que el scroll se muestre en la sección
    eventSection.style.display = "block";
    eventList.scrollTop = 0;
 }


  function getFormattedDate(date){
    const options ={ year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options);
 }

  function getEvents(date){
    const selectedDate = date.toISOString().split('T')[0]; // Convertir a formato YYYY-MM-DD
    const storedEventList = localStorage.getItem('eventList');
    const eventList = storedEventList ? JSON.parse(storedEventList) : [];
    console.log(eventList)

    const filteredEvents = eventList.filter(function(event){
      console.log(event.date)
      return event.date === selectedDate;
   });

    return filteredEvents;
 }

  function updateCalendarHeader(month, year){
    calendarMonthYear.textContent = getMonthName(month) + ' ' + year;
 }

  function getMonthName(month){
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
 }
  showEventSection(new Date());
  updateCalendarHeader(currentMonth, currentYear);
});