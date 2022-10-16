import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import uuid from "react-uuid";

export default function Crud() {
  const [note, setNote] = useState();
  const [data, setData] = useState([
    {
      id: uuid(),
      time: new Date().toLocaleTimeString(),
      note: "My first note",
    },
  ]);

  const handleСhange = (evt) => {
    const { value } = evt.target;
    setNote(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch("http://localhost:7777/notes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    handleAppend({
      id: uuid(),
      time: new Date().toLocaleTimeString(),
      note: evt.target.note.value,
    });
    setNote("");
  };

  const handleAppend = (o) => {
    data
      ? o.note && setData((prev) => [...prev, o])
      : o.note && setData([{ o }]);
  };

  const handleDelete = (id) => {
    setData((data) => data.filter((o) => o.id !== id));
  };

  const listing =
    data &&
    data.map((o) => {
      return (
        <Alert key={o.id} id={o.id}>
          <Alert.Heading>{o.time}</Alert.Heading>
          <hr />
          <p className="mb-0">{o.note}</p>
          <p onClick={() => handleDelete(o.id)}>(delete note)</p>
        </Alert>
      );
    });

  return (
    <Container>
      <Alert variant={"success"}>ALL SUPER NOTES</Alert>
      <hr />
      {listing}
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Text your new note:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleСhange}
            value={note}
          />
          <hr />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
