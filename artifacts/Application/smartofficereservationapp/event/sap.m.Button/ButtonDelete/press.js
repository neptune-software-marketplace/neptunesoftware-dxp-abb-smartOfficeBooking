const context = oEvent.oSource.getBindingContext();  
var id = context.getProperty("id");
var roomID = context.getProperty("roomID");
var options = {
    parameters: {
        "where": JSON.stringify({"id": id})
    }
};
apiRestAPIDeleteBooking(options);
var options = {
    parameters: {
       "where": JSON.stringify({"roomID": roomID})
    },
    data: {
        "class": "non-selected",
    }
};
apiRestAPIUpdateTables(options);
