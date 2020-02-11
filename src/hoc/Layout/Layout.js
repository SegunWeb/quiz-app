import React, {Component} from 'react';
import MenuNav from "../../containers/Navigation/MenuNav/MenuNav";

class Layout extends Component {

    render() {
        return (
            <div>
                <MenuNav/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;