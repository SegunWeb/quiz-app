import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Layout from "./hoc/Layout/Layout";
// import HomePage from "./containers/HomePage/HomePage";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from './containers/Quiz-creator/Quiz-creator';
import Auth from './containers/Auth/Auth';
import QuizList from "./containers/QuizList/QuizList";
import {connect} from 'react-redux'
// import {logout} from "./redux/actions/auth_actions";
import Logout from "./containers/Logout/Logout";
import {autoLogin} from './redux/actions/auth_actions'



class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                {/*<Route path={'/'} exact components={HomePage}/>*/}
                <Route path={"/quiz/:id"} component={Quiz}/>
                {/*<Route path={"/quiz-creator"} component={QuizCreator}/>*/}
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={QuizList}/>
                <Redirect to={'/'}/>
                <Route render={() => (<h2>this is not path... 404</h2>)}/>
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    {/*<Route path={'/'} exact components={HomePage}/>*/}
                    <Route path={"/quiz-creator"} component={QuizCreator}/>
                    <Route path={"/quiz/:id"} component={Quiz}/>
                    <Route path={'/logout'} component={Logout}/>
                    {/*<Route path={"/auth"} component={Auth}/>*/}
                    <Route path={"/"} exact component={QuizList}/>
                    <Redirect to={'/'}/>
                    <Route render={() => (<h2>this is not path... 404</h2>)}/>
                </Switch>
            )
        }

        return (
            <Container fluid>
                <Layout>
                    {routes}
                </Layout>
            </Container>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
         autoLogin: () => dispatch(autoLogin())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
