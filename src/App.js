import React from 'react';
import { Container } from 'semantic-ui-react'
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";

function App() {
  return (
      <Container fluid>
        <Layout>
            <Quiz/>
        </Layout>
      </Container>
  );
}

export default App;
