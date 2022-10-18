import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Notes from "./Notes";
import createRequest from "../api/createRequest";

export default function Crud() {
  const [text, setText] = useState();
  const [notes, setNotes] = useState([]);

  const onChange = (evt) => {
    const { value } = evt.target;
    setText(value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const note = {
      time: new Date().toLocaleTimeString(),
      note: evt.target.note.value,
    };
    setText("");

    await createRequest({ note, method: "post" });
    const response = await createRequest({ method: "get" });
    setNotes([...response]);
  };

  const handleDelete = async (id) => {
    await createRequest({ id, method: "delete" });
    const response = await createRequest({ method: "get" });
    setNotes([...response]);
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
      <Notes handleDelete={handleDelete} notes={notes} />
      <hr />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Text your new note:</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            onChange={onChange}
            value={text}
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
