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