var today = new Date();
DateTimePickerStart.setDateValue(today); 
DateTimePickerStart.setMinDate(today); 

var username = AppCache.userInfo.username;
var options = {
    parameters: {
        "where": JSON.stringify({"createdBy": username})
    }
};

apiRestAPIGetReservationsForUser(options);





function calculateTimeLeftForCurrentReservation(reservations) {
    var currentTime = new Date();
    var todayFormatted = (currentTime.getMonth() + 1) + "/" + currentTime.getDate() + "/" + currentTime.getFullYear();

    for (let reservation of reservations) {
        var reservationDateParts = reservation.reservationDate.split("/");
        var reservationDate = new Date(
            parseInt(reservationDateParts[2]),
            parseInt(reservationDateParts[0]) - 1,
            parseInt(reservationDateParts[1])
        );

        if (reservationDate.toDateString() === currentTime.toDateString()) {
            var startTimeSplit = reservation.hourStart.split(":");
            var endTimeSplit = reservation.hourEnd.split(":");
            var startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]));
            var endTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]));

            if (currentTime >= startTime && currentTime <= endTime) {
                var timeLeftMs = endTime - currentTime;
                var timeLeftHours = Math.floor(timeLeftMs / (1000 * 60 * 60));
                var timeLeftMinutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

             
                if (timeLeftHours === 0) {
                    return `Available in : ${timeLeftMinutes} minutes.`;
                } else {
                    return `Available in : ${timeLeftHours} hours ${timeLeftMinutes} minutes.`;
                }
            }
        }
    }

    return "Available at the current time.";
}


