const context = oEvent.oSource.getBindingContext();  
var roomID = context.getProperty("id");
const data = context.getObject();
modelSimpleForm1.setData(data);
DialogBookingDetails.open();
txtSimpleForm1roomID.setText(data.roomID);
txtSimpleForm1date.setText(data.reservationDate);
txtSimpleForm1hourStart.setText(data.hourStart);
txtSimpleForm1hourEnd.setText(data.hourEnd);
