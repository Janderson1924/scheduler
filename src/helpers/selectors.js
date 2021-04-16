export default function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayFilter => dayFilter.name === day);

  if (state.days.length === 0 || selectedDay.length === 0) {
    return [];
  }
  const appointments = selectedDay[0].appointments.map((appointment) => state.appointments[appointment]);
    return appointments;
}