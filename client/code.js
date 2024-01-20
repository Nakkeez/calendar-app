// Nav variable is for navigation
let nav = 0;
// Clicked variable is for checking which day is clicked
let clicked = null;

const calendar = document.getElementById('calendar');
const newEventForm = document.getElementById('newEventForm');
const deleteEventForm = document.getElementById('deleteEventForm');
const backDrop = document.getElementById('eventBackDrop');
const eventInput = document.getElementById('eventInput');
const newEventInput = document.getElementById('newEventInput');
const courseInput = document.getElementById('courseInput');
const newCourseInput = document.getElementById('newCourseInput');
const time1 = document.getElementById('time1');
const time2 = document.getElementById('time2');
const eventText = document.getElementById('eventText');
const timeline = document.getElementById('timeline');


async function loadEvents() {
  const host = window.location.host;
  const response = await fetch(`http://${host}/events`);
  const schedule = await response.json();
  createCalendar(schedule);
}

function createCalendar(schedule) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // Getting current date
  const currentDate = new Date();

  // Month in current date will be changed if user is browsing some other month
  if (nav !== 0) {
    currentDate.setMonth(new Date().getMonth() + nav);
  }

  const day = currentDate.getDate();
  // Adding 1 to the current month because otherwise january would be 0
  const month = (currentDate.getMonth() + 1); 
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month -1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthWithZero = ('0' + month).slice(-2);

  const dateStr = firstDay.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  
  // Checking how many days of the current month's first week are from last month
  const paddingDays = weekdays.indexOf(dateStr.split(', ')[0]);

  // Getting currently browsed month as long format string for header
  const monthStr = currentDate.toLocaleDateString('en-GB', {
    month: 'long'
  });

  let header = document.getElementById('monthDisplay');
  header.innerText = `${monthStr} ${year}`;

  calendar.innerHTML='';
  
  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    // Creating container for each day
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('day');
    
    const dayInCalendar = ('0' + (i - paddingDays)).slice(-2);
    const dayStr = `${dayInCalendar}/${monthWithZero}/${year}`;

    if (i > paddingDays) {
      // Adding the number corresponding each day
      dayContainer.innerText = i - paddingDays;

      // Checking if there are events for the current day
      const scheduleToday = findSchedule(schedule, dayStr);

      // Checking which day is the current one
      if (i - paddingDays === day && nav === 0) {
        dayContainer.id = 'currentDay';
      }

      // If events found, those will be sorted by time and fed to a function
      if (scheduleToday) {
        scheduleToday.sort(function (a, b) {
          return a.time.localeCompare(b.time);
        });
        createEvents(scheduleToday, dayContainer);
      }
      
      // Enabling the ability to open forms by clicking the days
      dayContainer.addEventListener('click', () => openEvents(scheduleToday, dayStr));
    }
    else {
      dayContainer.classList.add('padding');
    }

    calendar.appendChild(dayContainer);
  }
}

function createEvents(scheduleToday, dayContainer) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + (currentDate.getDate())).slice(-2);
  const currentDay = `${year}-${month}-${day}`;

  for (x in scheduleToday) {
    const y = (scheduleToday[x].date).slice(-4)
    const m = ((scheduleToday[x].date).slice(-7).slice(0, 2))
    const d = (scheduleToday[x].date).slice(0, 2)
    // divClass variable is used to set a class for the events depending
    // if they are upcoming or from the past.
    let divClass;
    eventDay = `${y}-${m}-${d}`;
    if (eventDay >= currentDay) {
      divClass = 'upcomingEvent';
      // Adding upcoming events to the timeline
      const timelineDiv = document.createElement('div');
      timelineDiv.classList.add('timelineDiv');
      if (scheduleToday[x].course) {
        timelineDiv.innerText = (scheduleToday[x].date + ' - ' + scheduleToday[x].time + ' ' + scheduleToday[x].course + ': ' + scheduleToday[x].task)
      }
      else {
        timelineDiv.innerText = (scheduleToday[x].date + ' - ' + scheduleToday[x].time + ' ' + scheduleToday[x].task)
      }
      // Crossing over events that are marked
      if (scheduleToday[x].mark == 0) {
        timeline.appendChild(timelineDiv);
      }
    }
    else {
      divClass = 'previousEvent';
    }

    if (dayContainer.childElementCount <= 3) {
      // Creating divs for the calendar which will show the events for the day
      const eventDiv = document.createElement('div');
      eventDiv.classList.add(divClass);
      // No more than three events will be shown at one day.
      if (dayContainer.childElementCount <= 2) {
        eventDiv.innerText = scheduleToday[x].task;
        if (scheduleToday[x].mark == 1) {
          eventDiv.style.textDecoration = 'line-through';
        }
      }
      // Adding ... text to the div if there are more than three events already
      else if (dayContainer.childElementCount == 3) {
        eventDiv.innerText = '...';
      }
      dayContainer.appendChild(eventDiv);
    }
  }
}

function findSchedule(schedule, dayStr) {
  eventsToday = [];
  for (let i = 0; i < schedule.length; i++) {

    // Checks if there are events with same date as currently checked day.
    if (schedule[i].date == dayStr) {
      // If yes, they are pushed to an array.
      eventsToday.push(schedule[i]);
    }
  }

  // Returning the array only when it includes objects in it
  if (eventsToday.length !== 0) {
    return eventsToday;
  }
}

// Brings the forms forward
function openEvents(currentEvents, thisDate) {
  clicked = thisDate;

  if (currentEvents) {
    for (x in currentEvents) {
      createEventText(currentEvents[x]);
      deleteEventForm.style.display = 'block';
    }
  }
  else {
    newEventForm.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

// Adds events to the li elements inside the form
function createEventText(event) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', event._id);
  const label = document.createElement('label');
  label.htmlFor = event._id;
  let text;
  if (event.course) {
    text = document.createTextNode(event.time + ' - ' + event.course + ': ' + event.task);
  }
  else {
    text = document.createTextNode(event.time + ' - ' + event.task);
  }
  if (event.mark == 1) {
    label.style.textDecoration = 'line-through';
  }
  label.appendChild(text);
  li.appendChild(checkbox);
  li.appendChild(label);
  eventText.append(li);
}

// Removes the forms and elements and all the inputs when the form is closed
function closeForm() {
  newEventForm.style.display = 'none';
  deleteEventForm.style.display = 'none';
  backDrop.style.display = 'none';
  eventInput.value = '';
  newEventInput.value = '';
  courseInput.value = '';
  newCourseInput.value = '';
  time1.value = '';
  time2.value = '';
  clicked = null;
  removeChilds(eventText);
  removeChilds(timeline);
  loadEvents();
}

function removeChilds (parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
}

async function addEvent() {
  let task = null;
  let time = null;
  let course = null;

  // Checking if there are values in the input fields
  if (eventInput.value && time1.value) {
    task = eventInput.value;
    time = time1.value;
  }
  else if (newEventInput.value && time2.value) {
    task = newEventInput.value;
    time = time2.value;
  }
  // If not, alert will be shown
  else {
    alert("Please input Event Title and Event Time");
  }

  if (courseInput.value) {
    course = courseInput.value;
  }
  else if (newCourseInput.value) {
    course = newCourseInput.value;
  }

  // If yes, those values will be send to the database
  if (task !== null && time !== null) {
    let data;
    if (course !== null) {
      data = { 
        'date': clicked,
        'time': time,
        'task': task,
        'course': course,
        'mark': 0
    }}
    else {
      data = { 
        'date': clicked,
        'time': time,
        'task': task,
        'mark': 0
    }}

    const host = window.location.host;
    const response = await fetch(`http://${host}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  closeForm();
}

async function markEvent() {
  const host = window.location.host;
  const currentEvents = await fetch(`http://${host}/events`);
  const schedule = await currentEvents.json();
  const markedEvent = findSchedule(schedule, clicked);

  for (x in markedEvent) {
    let checkbox = document.getElementById(markedEvent[x]._id);
    // Only those events will be marked which have been checked
    if (checkbox.checked == true) {
      labels = document.getElementsByTagName('label');
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == markedEvent[x]._id) {
          let data;
          // The value of mark will be changed in the database
          if (markedEvent[x].mark == 1) {
            data = {
              'mark': 0
            }
          }
          else {
            data = {
              'mark': 1
            }
          }
          const response = await fetch(`http://${host}/events/` + markedEvent[x]._id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
        }
      }
    }
  }
  closeForm();
}

async function deleteEvent() {
  const host = window.location.host;
  const currentEvents = await fetch(`http://${host}/events`);
  const schedule = await currentEvents.json();
  // Function will get all the events on the currently clicked day
  const deletedEvent = findSchedule(schedule, clicked);
  // Only those events will be deleted from the database which have been checked
  for (x in deletedEvent) {
    let checkbox = document.getElementById(deletedEvent[x]._id)
    if (checkbox.checked == true) {
      const response = await fetch(`http://${host}/events/` + deletedEvent[x]._id, {
        method: 'DELETE',
  })}};
  closeForm();
}

function setButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    removeChilds(timeline);
    loadEvents();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    removeChilds(timeline);
    loadEvents();
  });

  document.getElementById('saveButton').addEventListener('click', addEvent);
  document.getElementById('cancelButton').addEventListener('click', closeForm);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeForm);
  document.getElementById('newButton').addEventListener('click', addEvent);
  document.getElementById('markButton').addEventListener('click', markEvent);
}


// TimePicker for collecting time inputs
var times = {};

var timepicker = new TimePicker(['time1', 'time2'], {
  lang: 'en',
  theme: 'dark'
});
timepicker.on('change', function(evt) {
  
  var value = ('0' + (evt.hour || '00')).slice(-2) + ':' + (evt.minute || '00');
  evt.element.value = value;

  var id = evt.element.id;
  times[id] = value;
});

setButtons();