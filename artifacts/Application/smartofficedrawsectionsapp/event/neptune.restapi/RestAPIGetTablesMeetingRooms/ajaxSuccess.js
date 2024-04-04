var response = xhr.responseJSON;

setTimeout(() => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var backgroundImage = new Image();
    backgroundImage.src =
        "https://gtmdemosystem.neptune-software.cloud/media/root/Kaan/Screen%20Shot%202024-03-23%20at%2003.57.16%20AM.png";
    var rectangles = [];
    var drawMode = false;
    var isDrawing = false;
    var deleteMode = false;
    var i = 1;

    function initializeRectanglesFromResponse() {
        response.forEach((area) => {
            rectangles.push({
                startX: parseFloat(area.startX),
                startY: parseFloat(area.startY),
                endX: parseFloat(area.endX),
                endY: parseFloat(area.endY),
                type: area.text,
                roomID: area.roomID,
                class: area.class,
            });
        });
    }

    var localViewIDDeleteButton = ButtonDelete.getId();
    var hboxControlbuttonDelete = sap.ui.getCore().byId(localViewIDDeleteButton);
    var hboxDomRefbuttonDelete = hboxControlbuttonDelete.getDomRef();

    hboxDomRefbuttonDelete.addEventListener("click", function () {
        deleteMode = !deleteMode;
        drawMode = null;
        canvas.style.cursor = deleteMode ? "pointer" : "auto";
    });

    canvas.addEventListener("click", function (event) {
        if (!deleteMode) return;
        var rect = canvas.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var clickY = event.clientY - rect.top;

        for (var i = rectangles.length - 1; i >= 0; i--) {
            var rect = rectangles[i];
            if (
                clickX >= rect.startX &&
                clickX <= rect.endX &&
                clickY >= rect.startY &&
                clickY <= rect.endY
            ) {
                sap.m.MessageBox.confirm("Are you sure you want to delete this?", {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.YES) {
                            rectangles.splice(i, 1);
                            redrawRectangles();
                        }
                    },
                });
                break;
            }
        }
    });

    var localViewIDButtonDrawTable = ButtonDrawTable.getId();
    var hboxControlButtonDrawTable = sap.ui.getCore().byId(localViewIDButtonDrawTable);
    var hboxDomRefButtonDrawTable = hboxControlButtonDrawTable.getDomRef();

    hboxDomRefButtonDrawTable.addEventListener("click", function () {
        deleteMode = false;
        drawMode = "Table";
        canvas.style.cursor = "crosshair";
    });

    var localViewIDButtonDrawMeetingRooms = ButtonDrawMeetingRooms.getId();
    var hboxControlButtonDrawMeetingRooms = sap.ui
        .getCore()
        .byId(localViewIDButtonDrawMeetingRooms);
    var hboxDomRefButtonDrawMeetingRooms = hboxControlButtonDrawMeetingRooms.getDomRef();
    hboxDomRefButtonDrawMeetingRooms.addEventListener("click", function () {
        deleteMode = false;
        drawMode = "Meeting-Room";
        canvas.style.cursor = "crosshair";
    });

    canvas.addEventListener("mousedown", function (event) {
        if (!drawMode) return;

        var rect = canvas.getBoundingClientRect();
        var startX = event.clientX - rect.left;
        var startY = event.clientY - rect.top;
        var roomID = generateUniqueRoomID(drawMode);
        var rectangle = {
            startX: startX,
            startY: startY,
            endX: startX,
            endY: startY,
            type: drawMode,
            roomID: roomID,
            class: "non-selected",
        };
        i++;
        function moveListener(event) {
            rectangle.endX = event.clientX - rect.left;
            rectangle.endY = event.clientY - rect.top;
            redrawRectangles();
        }

        function upListener() {
            canvas.removeEventListener("mousemove", moveListener);
            canvas.removeEventListener("mouseup", upListener);
            var width = Math.abs(rectangle.endX - rectangle.startX);
            if (width < 10) {
                sap.m.MessageToast.show("Please draw a selectable space larger place for better user experience");
                return;
            }
            rectangles.push(rectangle);
            modelModelTables.setData(rectangles);
            redrawRectangles();
        }
        function generateUniqueRoomID(baseID) {
            if (!i || i < 1) {
                i = 1;
            }
            var uniqueID = baseID + "-" + i;
            var existing = rectangles.some((rect) => rect.roomID === uniqueID);
            while (existing) {
                i++;
                uniqueID = baseID + "-" + i;
                existing = rectangles.some((rect) => rect.roomID === uniqueID);
            }
            return uniqueID;
        }
        canvas.addEventListener("mousemove", moveListener);
        canvas.addEventListener("mouseup", upListener);
    });

    function redrawRectangles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        rectangles.forEach(function (rect) {
            ctx.fillStyle =
                rect.type === "Meeting-Room" ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(
                rect.startX,
                rect.startY,
                rect.endX - rect.startX,
                rect.endY - rect.startY
            );
            ctx.strokeStyle = rect.type === "Meeting-Room" ? "green" : "red";
            ctx.strokeRect(
                rect.startX,
                rect.startY,
                rect.endX - rect.startX,
                rect.endY - rect.startY
            );

            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            var text = rect.roomID;

            var textWidth = ctx.measureText(text).width;
            var textHeight = parseInt(ctx.font, 10);

            var textX = rect.startX + (rect.endX - rect.startX) / 2 - textWidth / 2;

            var textY = rect.startY + (rect.endY - rect.startY) / 2 + textHeight / 2;

            ctx.fillText(text, textX, textY);
        });
    }

    backgroundImage.onload = function () {
        initializeRectanglesFromResponse();
        redrawRectangles();
        BusyDialog.close();
    };
}, 1000);

// var response = xhr.responseJSON;

// setTimeout(() => {
//     BusyDialog.close();
//     var canvas = document.getElementById("myCanvas");
//     var ctx = canvas.getContext("2d");
//     var backgroundImage = new Image();
//     backgroundImage.src = "https://gtmdemosystem.neptune-software.cloud/media/root/Kaan/Screen%20Shot%202024-03-23%20at%2003.57.16%20AM.png";
//     var rectangles = [];
//     var drawMode = false;
//     var isDrawing = false;
//     var deleteMode = false;
//     var startX, startY; // Başlangıç koordinatlarını saklamak için değişkenler
//     var i = 1;

//     function initializeRectanglesFromResponse() {
//         response.forEach((area) => {
//             rectangles.push({
//                 startX: parseFloat(area.startX),
//                 startY: parseFloat(area.startY),
//                 endX: parseFloat(area.endX),
//                 endY: parseFloat(area.endY),
//                 type: area.text,
//                 roomID: area.roomID,
//                 class: area.class,
//             });
//         });
//     }

//     var localViewIDDeleteButton = ButtonDelete.getId();
//     var hboxControlbuttonDelete = sap.ui.getCore().byId(localViewIDDeleteButton);
//     var hboxDomRefbuttonDelete = hboxControlbuttonDelete.getDomRef();

//     hboxDomRefbuttonDelete.addEventListener("click", function () {
//         deleteMode = !deleteMode;
//         drawMode = null;
//         canvas.style.cursor = deleteMode ? "pointer" : "auto";
//     });

//     canvas.addEventListener("mousedown", function (event) {
//         if (!drawMode || deleteMode) return;
//         isDrawing = true;
//         var rect = canvas.getBoundingClientRect();
//         startX = event.clientX - rect.left;
//         startY = event.clientY - rect.top;
//     });

//     canvas.addEventListener("mousemove", function (event) {
//         if (!isDrawing || !drawMode) return;
//         // Çizim yapılırken sürekli canvas'ı temizleme ve yeniden çizme
//         redrawRectangles();
//         var rect = canvas.getBoundingClientRect();
//         var currentX = event.clientX - rect.left;
//         var currentY = event.clientY - rect.top;
//         // Geçici çizimi göster
//         ctx.fillStyle = drawMode === "Meeting-Room" ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";
//         ctx.fillRect(startX, startY, currentX - startX, currentY - startY);
//     });

//     canvas.addEventListener("mouseup", function (event) {
//         if (!isDrawing || !drawMode) return;
//         isDrawing = false;
//         var rect = canvas.getBoundingClientRect();
//         var endX = event.clientX - rect.left;
//         var endY = event.clientY - rect.top;
//         // Çizim alanının büyüklüğünü kontrol et
//         if (Math.abs(endX - startX) < 37.8 || Math.abs(endY - startY) < 37.8) {
//             alert("Please draw a selectable space larger than 1cm.");
//             return;
//         }
//         // Uygun çizimi kaydet
//         rectangles.push({
//             startX: startX,
//             startY: startY,
//             endX: endX,
//             endY: endY,
//             type: drawMode,
//             roomID: `Room-${i++}`,
//             class: "non-selected",
//         });
//         redrawRectangles();
//     });

//     function redrawRectangles() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//         rectangles.forEach(function (rect) {
//             ctx.fillStyle = rect.type === "Meeting-Room" ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";
//             ctx.fillRect(rect.startX, rect.startY, rect.endX - rect.startX, rect.endY - rect.startY);
//             ctx.strokeStyle = rect.type === "Meeting-Room" ? "green" : "red";
//             ctx.strokeRect(rect.startX, rect.startY, rect.endX - rect.startX, rect.endY - rect.startY);
//             // Oda ID'sini çizim üzerine ekle
//             ctx.font = "12px Arial";
//             ctx.fillStyle = "black";
//             var textX = rect.startX + (rect.endX - rect.startX) / 2;
//             var textY = rect.startY + (rect.endY - rect.startY) / 2;
//             ctx.fillText(rect.roomID, textX, textY);
//         });
//     }

//     backgroundImage.onload = function () {
//         initializeRectanglesFromResponse();
//         redrawRectangles();
//     };
// }, 1000);
