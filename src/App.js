import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Layout from "./hoc/Layout/Layout";
import HomePage from "./component/Pages/HomePage/HomePage";
import Quiz from "./containers/Quiz/Quiz";

const App = () => {
  return (
      <Container fluid>
        <Layout>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={"/quiz"} component={Quiz}/>
                <Route render={() => (<h2>this is not path... 404</h2>)}/>
            </Switch>

        </Layout>
      </Container>
  );
};
export default App;
