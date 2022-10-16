import React from "react";
import { Container } from "react-bootstrap";
import uuid from "react-uuid";

export default function Crud(props) {
  return <Container>{uuid()}</Container>;
}
