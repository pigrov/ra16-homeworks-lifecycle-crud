import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import Notes from "./Notes";
import Form from "./Form";
import createRequest from "../api/createRequest";

export default function Crud() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState();

  const onChange = (value) => {
    setText(value);
  };

  const onSubmit = async (value) => {
    const data = await createRequest({ method: "get" });
    const existingNote = data.find((o) => o.note === value);
    if (existingNote) {
      return;
    }

    const note = {
      time: new Date().toLocaleTimeString(),
      note: value,
    };
    setText("");

    await createRequest({ note, method: "post" });
    const response = await createRequest({ method: "get" });
    setNotes([...response]);
  };

  const onDelete = async (id) => {
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
      <Notes onDelete={onDelete} notes={notes} />
      <hr />
      <Form onSubmit={onSubmit} onChange={onChange} text={text} />
    </Container>
  );
}
