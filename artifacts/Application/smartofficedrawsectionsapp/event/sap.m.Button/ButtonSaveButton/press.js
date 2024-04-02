var data = modelModelTables.getData();

var options = {
    parameters: {
        "where": JSON.stringify({"text": "Meeting-Room"})
    }
};

apiRestAPIDeleteAll(options);
var options = {
    parameters: {
        "where": JSON.stringify({"text": "Table"})
    }
};

apiRestAPIDeleteAll(options);

for (let i = 0; i < data.length; i++) {
    var options1 = {
        data: {
            roomID: data[i].roomID,
            class: data[i].class,
            text: data[i].type,
            startX: data[i].startX,
            startY: data[i].startY,
            endX: data[i].endX,
            endY: data[i].endY,
        },
    };

    apiRestAPISaveTables(options1);
}



sap.m.MessageToast.show("Floor plan saved");


