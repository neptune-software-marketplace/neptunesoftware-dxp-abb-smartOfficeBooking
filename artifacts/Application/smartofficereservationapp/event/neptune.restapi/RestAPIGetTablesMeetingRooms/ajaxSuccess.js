var response = xhr.responseJSON;
var localViewID = HBox.getId();
var hboxControl = sap.ui.getCore().byId(localViewID);
var hboxDomRef = hboxControl.getDomRef();
var container = hboxDomRef;
var areas = response;

if (hboxDomRef) {
    var aElements = hboxDomRef.querySelectorAll("a");
    aElements.forEach(function (aElem) {
        aElem.parentNode.removeChild(aElem);
    });
} else {
}

areas.forEach(function (area) {
    var newArea = document.createElement("a");
    var style =
        "left: " +
        area.startX +
        "px; top: " +
        area.startY +
        "px; width: " +
        (area.endX - area.startX) +
        "px; height: " +
        (area.endY - area.startY) +
        "px;";
    newArea.setAttribute("id", area.roomID);
    newArea.setAttribute("class", area.class);
    newArea.setAttribute("style", style);
    newArea.setAttribute("roomID", area.roomID);
    newArea.textContent = area.text;
    container.appendChild(newArea);
});

function functionToCall(event) {
    var clickedElementId = event.target.id;
    var clickedElementText = event.target.text;
    var roomID = event.target.roomID;
    Title.setText(clickedElementId);
    var today = new Date();
    var day = today.getDate(); // Get the day
    var month = today.getMonth() + 1; // Get the month (add 1 as months are zero-indexed)
    var year = today.getFullYear(); // Get the year
    var hours = today.getHours(); // Get the hours
    var minutes = today.getMinutes(); // Get the minutes
    var seconds = today.getSeconds(); // Get the seconds
    var date = month + "/" + day + "/" + year;
    var today = new Date();
    DateTimePickerStart.setDateValue(today);
    DateTimePickerStart.setMinDate(today);
    var options = {
        parameters: {
            where: JSON.stringify({ roomID: roomID, reservationDate: date }),
        },
    };
    apiRestAPI_Smart_Office_Bookings(options);

    DialogBook.open();
}

var elements = document.getElementsByClassName("non-selected");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", functionToCall);
}
