import React, {Component} from 'react';
import MenuNav from "../../containers/Navigation/MenuNav/MenuNav";
import {connect} from 'react-redux'

class Layout extends Component {

    render() {
        return (
            <div>
                <MenuNav
                    isAuth={this.props.isAuth}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
       isAuth: !!state.auth.token
    }
};

export default connect(mapStateToProps)(Layout);