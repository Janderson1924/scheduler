import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW));
  };

  function deleteAppointment(event) {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
        id={props.id}
        />
      )}
      {mode === CREATE && <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
    />}
      {mode === SAVING && <Status message='Saving..' />}
      {mode === DELETING && <Status message="Deleting.."/>}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={deleteAppointment} onCancel={() => back()} />}
      {mode === EDIT && <Form
          name={props.name}
          value={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}/>}
    </article>
  );
}
