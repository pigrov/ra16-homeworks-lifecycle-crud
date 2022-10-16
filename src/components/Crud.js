import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import uuid from "react-uuid";
import Notes from "./Notes";

const createRequest = async ({ id, payload, method }) => {
  const baseURL = "http://localhost:7777/notes/";
  const requestURL = method === "delete" ? baseURL + `${id}` : baseURL;
  const request = await fetch(requestURL, {
    method: method,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!request.ok) {
    throw new Error("Что-то пошло не так...");
  }
  const response = await request.json();
  return response;
};

export default function Crud() {
  const [note, setNote] = useState();
  const [notes, setNotes] = useState([]);

  const handleСhange = (evt) => {
    const { value } = evt.target;
    setNote(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      id: uuid(),
      time: new Date().toLocaleTimeString(),
      note: evt.target.note.value,
    };

    fetch("http://localhost:7777/notes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNote("");
    const fetchData = async () => {
      const response = await createRequest({ method: "get" });
      setNotes([...response]);
    };
    fetchData();
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
