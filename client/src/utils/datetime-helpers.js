// Function to parse time strings like "HH:MM" into date objects for today
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number); // Convert to numbers
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time;
}

// Function to check if current time is within the time range
// Range used in this function is between hours: E.g. "00:00 - 04:30"
export function isTimeInRange(hoursRange) {
    if (hoursRange === "*") return true;

    const now = new Date();

    const [startTime, endTime] = hoursRange.split(" - ");

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // If the end time is before the start time, assume the range extends to the next day
    if (end < start) {
        // If now is after start or before end, it's in range (across midnight scenario)
        return now >= start || now <= end;
    } else {
        // Regular scenario: start before end within the same day
        return now >= start && now <= end;
    }
}
