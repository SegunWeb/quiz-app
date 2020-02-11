import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Layout from "./hoc/Layout/Layout";
// import HomePage from "./containers/HomePage/HomePage";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from './containers/Quiz-creator/Quiz-creator';
import Auth from './containers/Auth/Auth';
import QuizList from "./containers/QuizList/QuizList";

const App = () => {
  return (
      <Container fluid>
        <Layout>
            <Switch>
                {/*<Route path={'/'} exact component={HomePage}/>*/}
                <Route path={"/"} exact component={QuizList}/>
                <Route path={"/quiz/:id"} component={Quiz}/>
                <Route path={"/quiz-creator"} component={QuizCreator}/>
                <Route path={"/auth"} component={Auth}/>
                <Route render={() => (<h2>this is not path... 404</h2>)}/>
            </Switch>
        </Layout>
      </Container>
  );
};
export default App;
