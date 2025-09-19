import React, { useState, useRef, useContext } from "react";

import { createContext, useState } from "react";

export const TICKET_STATES = {
  TO_DO: "TO DO",
  READY_FOR_DEVELOPMENT: "READY FOR DEVELOPMENT",
  IN_PROGRESS: "IN PROGRESS",
  QA_IN_PROGRESS: "QA IN PROGRESS",
  DONE: "DONE",
};

const dummyTickets = [
  { title: "Ticket - 1", id: 1, status: TICKET_STATES.IN_PROGRESS },
  { title: "Ticket - 2", id: 2, status: TICKET_STATES.DONE },
  { title: "Ticket - 3", id: 3, status: TICKET_STATES.TO_DO },
  { title: "Ticket - 4", id: 4, status: TICKET_STATES.QA_IN_PROGRESS },
  { title: "Ticket - 5", id: 5, status: TICKET_STATES.READY_FOR_DEVELOPMENT },
  { title: "Ticket - 6", id: 6, status: TICKET_STATES.READY_FOR_DEVELOPMENT },
  { title: "Ticket - 7", id: 7, status: TICKET_STATES.TO_DO },
];

export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([...dummyTickets]);

  return (
    <BoardContext.Provider value={{ tickets, setTickets }}>
      {children}
    </BoardContext.Provider>
  );
};

const Card = ({ ticket, handleDragStart, handleDragEnd }) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, ticket)}
      onDragEnd={(e) => handleDragEnd(e)}
      style={{
        userSelect: "none",
        padding: 16,
        margin: "0 0 8px 0",
        backgroundColor: "white",
        cursor: "move",
      }}
    >
      {ticket.title}
    </div>
  );
};

const StateColumn = ({
  state,
  handleDragStart,
  handleDrop,
  handleDragOver,
  tickets,
  handleDragEnd,
}) => {
  console.log(state, tickets);
  const currentTickets = tickets.filter((ticket) => ticket.status === state);

  return (
    <section
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, state)}
      style={{
        background: "#f0f0f0",
        padding: "1rem",
        width: 250,
        minHeight: 300,
      }}
    >
      <header className="column-title">{state}</header>
      {currentTickets.map((ticket) => (
        <Card
          ticket={ticket}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </section>
  );
};

const DrapDrop = ({ states }) => {
  const { tickets, setTickets } = useContext(BoardContext);
  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDragStart = (e, ticket, state) => {
    dragItem.current = ticket;
    dragContainer.current = state;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, state) => {
    console.log("drop", state);
    console.log("current", dragItem.current, dragContainer.current);

    const item = dragItem.current;
    setTickets((prev) => {
      return prev.map((ticket) => {
        console.log("updating", ticket.title, item);
        if (ticket.id === item.id) {
          return { ...ticket, status: state };
        }

        return ticket;
      });
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {states.map((state) => (
        <StateColumn
          state={state}
          key={state}
          tickets={tickets}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export default DrapDrop;
