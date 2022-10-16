import React from "react";
import { Alert } from "react-bootstrap";

export default function(props) {
  const handleDelete = (id) => {
    fetch("http://localhost:7777/notes/" + id, {
      method: "DELETE",
    });
  };

  return (
    <div className="notes-list">
      {props.notes.map((o) => (
        <Alert key={o.id} id={o.id}>
          <Alert.Heading>{o.time}</Alert.Heading>
          <hr />
          <p className="mb-0">{o.note}</p>
          <p onClick={() => handleDelete(o.id)}>(delete note)</p>
        </Alert>
      ))}
    </div>
  );
}
