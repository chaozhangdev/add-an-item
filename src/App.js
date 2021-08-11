import React from "react";
import styled from "styled-components";

export function App() {
  return (
    <Container>
      <h1>hello App</h1>
      <Button>click me</Button>
      <p>hello</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: red;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;
