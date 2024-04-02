var firstSelectedDate = DateTimePickerStart.getDateValue();
var startOfDay = new Date(firstSelectedDate.getFullYear(), firstSelectedDate.getMonth(), firstSelectedDate.getDate(), 9, 0, 0); 
DateTimePickerStart.setDateValue(startOfDay);
var endOfDay = new Date(firstSelectedDate.getFullYear(), firstSelectedDate.getMonth(), firstSelectedDate.getDate(), 18, 0, 0);
DateTimePickerEnd.setDateValue(endOfDay);
TextTotalMeetingTime.setText("All day");
