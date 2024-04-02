var selectedDate = DateTimePickerEnd.getDateValue();
var firstSelectedDate = DateTimePickerStart.getDateValue();

if (selectedDate && firstSelectedDate) {
    if (selectedDate < firstSelectedDate) {
        DateTimePickerEnd.setDateValue(firstSelectedDate);
    }
}
