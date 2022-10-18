import React from "react";
import { Form, Button } from "react-bootstrap";

export default function(props) {
  const onChange = (evt) => {
    props.onChange(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(evt.target.note.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Text your new note:</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          onChange={onChange}
          value={props.text}
        />
        <hr />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
