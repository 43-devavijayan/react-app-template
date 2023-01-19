// import React, { useState } from "React";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Navigate } from "react-big-calendar";
import { Views } from "react-big-calendar";
import { useState, useEffect, useCallback } from "react";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales

})



function App() {
  const DnDCalendar = withDragAndDrop(Calendar)

  const CalendarToolbar = ({ onView, label, views, onNavigate }) => (
    <div className="rbc-toolbar-view">
      <h2 className="label"> {label}  </h2>
      <div className="rbc-toolbar-buttons">
        {/* <div className="button-views">{views.map(view => (
          <button
            key={view}
            className="button"
            onClick={() => onView(view)}>
            {view}
          </button>
        ))}
        </div> */}
        <div className="button-overall">
          <div className="button-views" onClick={() => onView(Views.MONTH)}>{"Month"}</div>
          <div className="button-views" onClick={() => onView(Views.WEEK)}>{"Week"}</div>
          <div className="button-views" onClick={() => onView(Views.DAY)}>{"Day"}</div>
          <div className="button-views" onClick={() => onView(Views.AGENDA)}>{"Agenda"}</div>
        </div>

        <div className="rbc-toolbar-group">
          <span className="rbc-btn-group">
            <button className="button-group" onClick={() => onNavigate(Navigate.PREVIOUS)}>{"<"}</button>
          </span>
          <span className="rbc-btn-group">
            <button className="button-group" onClick={() => onNavigate(Navigate.TODAY)}>{"Today"}</button>
          </span>
          <span className="rbc-btn-group">
            <button className="button-group" onClick={() => onNavigate(Navigate.NEXT)}>{">"}</button>
          </span>
        </div>
      </div>

    </div>
  );

  const events = [
    {
      id: uuidv4(),
      Name: "Devasangeetha",
      meetingUrl: "test/fhwir",
      startTime: new Date(2023, 0, 22, 9, 0, 0),
      endTime: new Date(2023, 0, 22, 10, 0, 0),
      title: "Deployment",
      allDay: true
    },
    {
      id: uuidv4(),
      Name: "Devasangeetha",
      meetingUrl: "test/fhwir",
      startTime: new Date(2023, 0, 23, 9, 0, 0),
      endTime: new Date(2023, 0, 23, 10, 0, 0),
      title: "Issues on new build",
      allDay: false
    },
    {
      id: uuidv4(),
      Name: "Devasangeetha",
      meetingUrl: "test/fhwir",
      startTime: new Date(2023, 0, 23, 11, 0, 0),
      endTime: new Date(2023, 0, 23, 12, 30, 0),
      title: "Review",
      allDay: false
    },
    {
      id: uuidv4(),
      Name: "Devasangeetha",
      meetingUrl: "test/fhwir",
      startTime: new Date(2023, 0, 17, 13, 0, 0),
      endTime: new Date(2023, 0, 17, 14, 0, 0),
      title: "Daily scrum",
      allDay: false
    }
  ]


  const [appoinmentDetails, setTrainings] = useState([])
  useEffect(() => {
    getTrainings()
  }, []);

  const getTrainings = () => {
    fetch("http://localhost:5169/api/appoinment")
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error("Error"))
  }

  useEffect(() => {
    postTraining()
  }, []);

  const trainingData = {
    id: uuidv4(),
    Name: "Naren",
    meetingUrl: "test/fhwir",
    startTime: new Date(2023, 0, 20, 11, 0, 0),
    endTime: new Date(2023, 0, 20, 12, 30, 0),
    title: "Post Test",
    allDay: false
  }

  // // console.log(trainingData)
  const postTraining = () => {
    fetch("http://localhost:5169/api/appoinment/Post", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: {
        "id": uuidv4(),
        "Name": "Naren",
        "meetingUrl": "test/fhwir",
        "startTime": new Date(2023, 0, 20, 11, 0, 0),
        "endTime": new Date(2023, 0, 20, 12, 30, 0),
        "title": "Post Test",
        "allDay": false
      }
    });
    setTrainings([...appoinmentDetails,trainingData]);
  };
  const handleSelect = () => {
    const Name = window.prompt("Name");
    const title = window.prompt("Title");
    const meetingUrl = window.prompt("MeetingUrl");
    const startTime = window.prompt("startTime");
    const endTime = window.prompt("endTime");
    if (title) {
      var newEvent = {
        id: uuidv4(),
        Name: Name,
        meetingUrl: meetingUrl,
        startTime: new Date(2023, 0, 20, 11, 0, 0),
        endTime: new Date(2023, 0, 20, 11, 0, 0),
        title: title,
        allDay: false
      };
      setTrainings([...appoinmentDetails, newEvent]);
    }
  }
  // console.log(appoinmentDetails);
  const [myEvents, setMyEvents] = useState(events)

  const moveEvent = useCallback(({ event, start, end }) => {

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setTrainings(...appoinmentDetails, nextEvents);
  }, [setTrainings])

  const resizeEvent = useCallback(({ event, start, end }) => {

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setTrainings(...appoinmentDetails, nextEvents);
  }, [])

  const allAppoinments = appoinmentDetails.map((appointment) => {
    return {
      id: appointment.id,
      Name: appointment.name,
      meetingUrl: appointment.meetingUrl,
      startTime: new Date(appointment.startTime),
      endTime: new Date(appointment.endTime),
      title: appointment.title,
      allDay: false
    }
  })

  // const CreateAppoinment = () => {
  //   return (<div className="delete-content">
  //     <FontAwesomeIcon icon={faPlus} onClick={openModal} />
  //     <Modal
  //       isOpen={modalIsOpen}
  //       onRequestClose={closeModal}
  //       style={customStyles}
  //     >
  //     </Modal>
  //   </div>)
  // }
  const list = [...allAppoinments, ...events];
  console.log('events:', list);
  return (

    <div className="App">
      <div id="calendar-section">
        <div id="calendar-wrapper">
          <DnDCalendar
            // resizable
            selectable
            localizer={localizer}
            defaultView={Views.DAY}
            components={{ toolbar: CalendarToolbar }}
            views={['month', 'week', 'day', 'agenda']}
            step={30}
            events={list}
            startAccessor="startTime"
            endAccessor="endTime"
            // draggableAccessor={(event) => true}
            onEventDrop={moveEvent}
            resizable
            onEventResize={resizeEvent}
            // onSelectEvent={handleSelect}
            eventPropGetter={event => {

              const eventData = list.find(ot => ot.id === event.id);

              const backgroundColor = eventData.allDay ? "lightgreen" : "rgb(5, 209, 216) ";

              // const colorHover = eventData.allDay ? "lightgreen" : "rgb(5, 209, 216) ";

              return { style: { backgroundColor } };

            }}
            style={{ height: "100vh" }} />
        </div>
        <div className="create-appoinment"><FontAwesomeIcon icon={faPlus} onClick={handleSelect} /></div>
      </div>
    </div>
  );
}

export default App;
