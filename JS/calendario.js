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
});

