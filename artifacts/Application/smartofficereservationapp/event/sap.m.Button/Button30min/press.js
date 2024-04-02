var selectedDate = DateTimePickerEnd.getDateValue();
var firstSelectedDate = DateTimePickerStart.getDateValue();
var updatedDate = new Date(firstSelectedDate.getTime() + 30 * 60 * 1000); 
DateTimePickerEnd.setDateValue(updatedDate);
TextTotalMeetingTime.setText("30 min");