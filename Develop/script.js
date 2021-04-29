var currentDayEl = $('#currentDay');
var containerEl = $('.container');


function displayToday() {
    var todaysDate = moment().format('dddd, MMM Do');
    currentDayEl.text(todaysDate);

}

setInterval(displayToday, 1000);

function handleFormSubmit() {
    
    var calendarRow = $('input[info="schedule-input"]').val();

    if (!calendarRow) {
        console.log('what are you doing today')
        return;
    }

    containerEl.append('<li>' + calendarRow + '</li>');

    $('input[info="schedule-input"]').val();

}

handleFormSubmit();