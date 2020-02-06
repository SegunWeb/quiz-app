import React, {Component} from 'react';
import MenuNav from "../../component/Navigation/MenuNav/MenuNav";

class Layout extends Component {

    state = {
        menu: false,
        activeItem: 'home'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    handlerOnToggle = () => {
        this.setState({
            menu: !this.state.menu,
        })
    };

    render() {
        const { activeItem, menu } = this.state;

        return (
            <div>
                <MenuNav
                    activeItem={ activeItem }
                    handleItemClick={this.handleItemClick}
                    onToggle={this.handlerOnToggle}
                    menu={menu}

                />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;