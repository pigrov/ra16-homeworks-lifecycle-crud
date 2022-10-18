import React from "react";

const createRequest = async ({ id, note, method }) => {
  const baseURL = "http://localhost:7777/notes/";
  const requestURL = method === "delete" ? baseURL + `${id}` : baseURL;

  try {
    const request = await fetch(requestURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const response = await request.json();
    return response;
  } catch (err) {
    return <p>Error: {err}</p>;
  }
};

export default createRequest;
