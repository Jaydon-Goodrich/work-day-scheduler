// Array for storing tasks
tasks = [];

// Set the date in the header
var now = moment();
var formatedNow = now.format("dddd, MMMM Do");
$("#currentDay").text(formatedNow);

// Set the hour in the left col
var hour9 = moment().hour(9);
var forHour9 = hour9.format("H A");
$("#time9").text(forHour9);

var hour10 = moment().hour(10);
var forHour10 = hour10.format("H A");
$("#time10").text(forHour10);

var hour11 = moment().hour(11);
var forHour11 = hour11.format("H A");
$("#time11").text(forHour11);

var hour12 = moment().hour(12);
var forHour12 = hour12.format("H A");
$("#time12").text(forHour12);

var hour13 = moment().hour(13);
var forHour13 = hour13.format("h A");
$("#time1").text(forHour13);

var hour14 = moment().hour(14);
var forHour14 = hour14.format("h A");
$("#time2").text(forHour14);

var hour15 = moment().hour(15);
var forHour15 = hour15.format("h A");
$("#time3").text(forHour15);

var hour16 = moment().hour(16);
var forHour16 = hour16.format("h A");
$("#time4").text(forHour16);

var hour17 = moment().hour(17);
var forHour17 = hour17.format("h A");
$("#time5").text(forHour17);

$(".task-group").on("click", function () {
    var saveId = $(this).attr("id");
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .val(text)
        .addClass("col-10")
        .attr("id", saveId);
    $(this).replaceWith(textInput);
    checkTime();
});

$(".saveBtn").on("click", function () {
    var prevObj = $(this).prev();
    var objId = prevObj.attr("id");
    var newText = $("#" + objId).val();
    var saveObj = {
        id: objId,
        text: newText
    };
    checkTasks(saveObj);
    // tasks.push(saveObj);
});

var checkTime = function () {
    var timeNow = parseInt(moment().format("H"));
    var timeOfDay = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    for (var i = 0; i < timeOfDay.length; i++) {
        var timeOf = timeOfDay[i];
        var time = parseInt($("#time" + timeOf).text());
        if (time <= 5) {
            time = time + 12;
        }
        if (time > timeNow) {
            $("#task" + timeOf).addClass("future");
        }
        else if (time === timeNow) {
            $("#task" + timeOf).addClass("present");
        }
        else {
            $("#task" + timeOf).addClass("past");
        }
    }
}
setInterval(function () {
    checkTime();
}, (1000 * 60))

var checkTasks = function (taskObj) {
    if (tasks.length === 0) {
        tasks.push(taskObj);
    }
    else {
        for (var i = 0; i < tasks.length; i++) {
            var arrId = tasks[i].id;
            var objId = taskObj["id"];
            if (arrId === objId) {
                tasks.splice(i, 1);
                tasks.push(taskObj);
                saveTasks();
                return;
            }
        }
        tasks.push(taskObj);
    }
    saveTasks();
}
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = [];
    }
    for (i = 0; i < tasks.length; i++) {
        $("#" + tasks[i].id).text(tasks[i].text);
    }

};

var onPageStart = function () {
    checkTime();
    loadTasks();
};

onPageStart();
