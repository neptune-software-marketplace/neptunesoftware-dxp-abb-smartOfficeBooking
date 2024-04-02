var response = xhr.responseJSON;
var areas = response;
var today = new Date();
var filteredRoomIDs = [];
var notReservedRoomIDs = [];
var todayFormatted = today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
var filteredRoomIDs = [];
var notReservedRoomIDs = [];

areas.forEach(function (area) {
    var startHourMinute = area.hourStart.split(":");
    var endHourMinute = area.hourEnd.split(":");
    var reservationDateParts = area.reservationDate.split("/");
    var reservationDate = new Date(
        reservationDateParts[2],
        reservationDateParts[0] - 1,
        reservationDateParts[1]
    );

    var startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(startHourMinute[0]),
        parseInt(startHourMinute[1])
    );
    var endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(endHourMinute[0]),
        parseInt(endHourMinute[1])
    );

    if (todayFormatted === area.reservationDate) {
        if (startTime.getHours() == 9 && endTime.getHours() == 18) {
            filteredRoomIDs.push(area.roomID);
        } else {
            notReservedRoomIDs.push(area.roomID);
        }
    } else {
        notReservedRoomIDs.push(area.roomID);
    }
});

if (filteredRoomIDs.length > 0) {
    filteredRoomIDs.forEach(function (roomID) {
        var options = {
            parameters: {
                where: JSON.stringify({ roomID: roomID }),
            },
            data: {
                class: "selected-area",
            },
        };
        apiRestAPIUpdateTablesForReservation(options);
    });
}
if (notReservedRoomIDs.length > 0) {
    notReservedRoomIDs.forEach(function (roomID) {
        var options = {
            parameters: {
                where: JSON.stringify({ roomID: roomID }),
            },
            data: {
                class: "non-selected",
            },
        };
        apiRestAPIUpdateTablesForReservation(options);
    });
}

if (notReservedRoomIDs.length == 0 && filteredRoomIDs.length == 0) {
    App.to(Page);
    var options = {
        parameters: {
            where: JSON.stringify({"class": "selected-area"})
        },
        data: {
            class: "non-selected",
        },
    };
    apiRestAPIUpdateTables(options);
}












