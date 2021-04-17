export function getAppointmentsForDay(state, chosenDay) {
  for (let day of state.days) {
    if (day.name === chosenDay) {
      return day.appointments.map(id => state.appointments[id]);
    }
  }
  return [];
};

export function getInterviewersForDay(state, chosenDay) {
  for (let day of state.days) {
    if (day.name === chosenDay) {
      return day.interviewers.map(id => state.interviewers[id]);
    }
  }
  return [];
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