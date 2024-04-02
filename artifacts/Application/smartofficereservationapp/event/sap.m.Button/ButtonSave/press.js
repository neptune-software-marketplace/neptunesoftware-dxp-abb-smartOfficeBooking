DialogBook.close();
var roomName = Title.getText();
var today = new Date();
var dateTimeStart = new Date(DateTimePickerStart.getDateValue());
var dateTimeEnd = new Date(DateTimePickerEnd.getDateValue());
var startHour = formatTime(dateTimeStart.getHours(), dateTimeStart.getMinutes());
var endHour = formatTime(dateTimeEnd.getHours(), dateTimeEnd.getMinutes());
var date1 =
    dateTimeStart.getMonth() +
    1 +
    "/" +
    dateTimeStart.getDate() +
    "/" +
    dateTimeStart.getFullYear();
var updatedDate = new Date(dateTimeStart.getTime() + 60 * 60 * 1000);
var username = AppCache.userInfo.username;
var meetingTime = TextTotalMeetingTime.getText();
DateTimePickerEnd.setDateValue(updatedDate);

function formatTime(hour, minute) {
    var formattedHour = hour < 10 ? "0" + hour : hour.toString();
    var formattedMinute = minute < 10 ? "0" + minute : minute.toString();
    return formattedHour + ":" + formattedMinute;
}

function checkReservationConflict(startHour, endHour, date, roomID) {
    var reservations = modelModelArrayRoomsAndTableBookings.getData();
    for (var i = 0; i < reservations.length; i++) {
        var reservation = reservations[i];
        if (
            reservation.reservationDate === date &&
            reservation.roomID === roomID &&
            startHour < reservation.hourEnd &&
            endHour > reservation.hourStart
        ) {
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.error(
                "There is a previous reservation in the time slot you selected!! Please choose a different time slot"
            );
            return "conflict";
        }
    }
    return "no conflict";
}

if (meetingTime == "All Day") {
    var options = {
        parameters: {
            where: JSON.stringify({ roomID: roomName }),
        },
        data: {
            class: "selected-Table",
        },
    };
    apiRestAPIUpdateTablesForReservation(options);
}

var options = {
    data: {
        roomID: roomName,
        username: username,
        hourStart: startHour,
        hourEnd: endHour,
        details: "Reservation",
        belongOffice: "Oslo central office",
        booked: "true",
        reservationDate: date1,
        totalMeetingTime: meetingTime,
    },
};

var conflictCheck = checkReservationConflict(startHour, endHour, date1, roomName);
if (conflictCheck === "no conflict") {
    apiRestAPIPOSTBooking(options);
} else {
}
