import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import uuid from "react-uuid";
import Notes from "./Notes";
import createRequest from "../api/createRequest";

export default function Crud() {
  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);

  const handleСhange = (evt) => {
    const { value } = evt.target;
    setNote(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const payload = {
      id: uuid(),
      time: new Date().toLocaleTimeString(),
      note: evt.target.note.value,
    };

    try {
      await createRequest({ payload, method: "post" });
      const response = await createRequest({ method: "get" });
      console.log(response);
      setNotes([...response]);
    } catch (err) {
      return <p>Error: {err}</p>;
    }

    fetch("http://localhost:7777/notes", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const fetchData = async () => {
    //   const response = await createRequest({ method: "get" });
    //   setNotes([...response]);
    // };

    // setNote("");
    // fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await createRequest({ method: "get" });
      setNotes([...response]);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Alert variant={"success"}>ALL SUPER NOTES</Alert>
      <hr />
      <Notes notes={notes} />
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
