import React from "react";
import { Alert } from "react-bootstrap";

export default function(props) {
  const onDelete = (id) => {
    props.onDelete(id);
  };

  return (
    <div className="notes-list">
      {props.notes.map((o) => (
        <Alert key={o.id} id={o.id}>
          <Alert.Heading>
            {o.time}{" "}
            <span className="pointer" onClick={() => onDelete(o.id)}>
              [X]
            </span>
          </Alert.Heading>
          <hr />
          <p className="mb-0">{o.note}</p>
        </Alert>
      ))}
    </div>
  );
}
