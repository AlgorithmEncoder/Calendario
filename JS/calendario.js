document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  renderCalendar(currentMonth, currentYear);

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    calendarContainer.innerHTML = ""; // Limpia el contenido previo

    // Crea el encabezado de los días de la semana
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const weekHeader = document.createElement("tr");
    daysOfWeek.forEach(day => {
      const th = document.createElement("th");
      th.textContent = day;
      weekHeader.appendChild(th);
    });
    calendarContainer.appendChild(weekHeader);

    // Crea las celdas para cada día del mes
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const weekRow = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement("td");
        if (i === 0 && j < firstDay.getDay()) {
          dayCell.textContent = "";
        } else if (date > lastDay.getDate()) {
          break;
        } else {
          dayCell.textContent = date;
          date++;
        }
        weekRow.appendChild(dayCell);
      }
      calendarContainer.appendChild(weekRow);
    }
  }


  function showEventSection(date) {
    const eventSection = document.getElementById("event-section");
    const eventTitle = document.getElementById("event-section-title");
    const eventList = document.getElementById("event-list");
  
    // Cambiar el título de la sección de eventos
    const formattedDate = getFormattedDate(date);
    eventTitle.textContent = "Eventos para el " + formattedDate;

    // Obtener eventos para la fecha seleccionada
    const events = getEvents(date);

    // Limpiar la lista de eventos
    eventList.innerHTML = "";

    if (events.length > 0) {
      events.forEach(function(event) {
        const listItem = document.createElement("li");
        listItem.className = "event-list-item";
        listItem.textContent = event.time + " - " + event.event;
        eventList.appendChild(listItem);
      });
    }
    else {
      const listItem = document.createElement("li");
      listItem.textContent = "No hay eventos programados para este día.";
      eventList.appendChild(listItem);
    }

    // Mostrar la sección de eventos
    eventSection.style.display = "block";
  }


  function getFormattedDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  function getEvents(date) {
    const selectedDate = date.toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD
    const storedEventList = localStorage.getItem("eventList");
    const eventList = storedEventList ? JSON.parse(storedEventList) : [];

    const filteredEvents = eventList.filter(function(event) {
      return event.date === selectedDate;
    });

    return filteredEvents;
}
showEventSection(new Date())
});