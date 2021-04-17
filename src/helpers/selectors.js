export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayFilter => dayFilter.name === day);

  if (state.days.length === 0 || selectedDay.length === 0) {
    return [];
  }
  const appointments = selectedDay[0].appointments.map((appointment) => state.appointments[appointment]);
    return appointments;
};

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let interviewerScheduled = {}
  for (let key in state.interviewers) {
    if (state.interviewers[key].id === interview.interviewer)
      interviewerScheduled = state.interviewers[key]
  }
  const interviewObj = {
    student: interview.student,
    interviewer: interviewerScheduled
  };
  return interviewObj
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter(dayFilter => dayFilter.name === day);

  if (state.days.length === 0 || selectedDay.length === 0) {
    return [];
  }
  const interviews = selectedDay[0].appointments.map((appointment) => state.appointments[appointment]);
    return interviews;
};
