import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const spotsRemaining = (dayOfWeek, days, appointments) => {
    let spotsLeft = 0;
    const chosenDay = days.find(day => day.name === dayOfWeek);
    for (let appointment in appointments) {
      if (appointments[appointment].interview === null && chosenDay.appointments.includes(appointments[appointment].id)) {
        spotsLeft++
      }
    }
    return { 
      ...chosenDay, 
      spots: spotsLeft 
    };
  };

  const updatedDays = (dayObject, arrayOfDays) => {
    return arrayOfDays.map((day) => (day.name === dayObject.name ? dayObject : day));
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updatedDays(spotsRemaining(state.day, state.days, appointments), state.days);
    return axios.put(`api/appointments/${id}`, { interview })
    .then(() => setState((prev) => {
      return { ...prev, appointments, days };
    }));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updatedDays(spotsRemaining(state.day, state.days, appointments), state.days);
    return axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(() => setState((prev) => {
      return { ...prev, appointments, days };
    }));
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
