var currentDayEl = $('#currentDay');
var containerEl = $('.container');
var calendarDays = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "06",
        time: "18",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "10",
        hour: "07",
        time: "19",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "11",
        hour: "08",
        time: "20",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "12",
        hour: "09",
        time: "21",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "13",
        hour: "10",
        time: "22",
        meridiem: "pm",
        reminder: ""
    },
]


function displayToday() {
    var todaysDate = moment().format('dddd, MMM Do');
    currentDayEl.text(todaysDate);

}

setInterval(displayToday, 1000);

calendarDays.forEach(function(currentHours) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    containerEl.append(hourRow);
    var hourField = $("<div>")
        .text(`${currentHours.hour}${currentHours.meridiem}`)
        .attr({
            "class": "col col-md-auto hour"
    });

    var hourPlan = $("<div>")
        .attr({
            "class": "col col-lg-9 description p-0"
        });

    var calendarinfo = $("<textarea>");
    hourPlan.append(calendarinfo);
    calendarinfo.attr("id", currentHours.id);

    if (currentHours.time < moment().format("HH")) {
        calendarinfo.attr ({
            "class": "past", 
        })
    } else if (currentHours.time === moment().format("HH")) {
        calendarinfo.attr({
            "class": "present"
        })
    } else if (currentHours.time > moment().format("HH")) {
        calendarinfo.attr({
            "class": "future"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

init();

function saveReminders() {
    localStorage.setItem("calendarDays", JSON.stringify(calendarDays));
}

function displayReminders() {
    calendarDays.forEach(function (_currentHours) {
        $(`#${_currentHours.id}`).val(_currentHours.reminder);
    })
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("calendarDays"));

    if (storedDay) {
        calendarDays = storedDay;
    }

    saveReminders();
    displayReminders();
}


$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    calendarDays[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})