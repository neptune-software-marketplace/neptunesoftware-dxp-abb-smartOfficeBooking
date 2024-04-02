var firstSelectedDate = DateTimePickerStart.getDateValue();
var updatedDate = new Date(firstSelectedDate.getTime() + 60 * 60 * 1000);
DateTimePickerEnd.setDateValue(updatedDate);
TextTotalMeetingTime.setText("1 hour");