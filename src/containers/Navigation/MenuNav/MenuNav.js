import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react'
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import {Link} from "react-router-dom";

import './menuNav.css'


class MenuNav extends Component {


    state = {
        menu: false,
        activeItem: 'home'
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name, menu: false });
    handlerOnToggle = () => {
        this.setState({
            menu: !this.state.menu,
        })
    };

    renderLinks = (links) => {

        return links.map((link, i) => {
            const {name, label,  active, to} = link;
            return (
                <Menu.Item
                    key={i}
                    as={Link}
                    onClick={this.handleItemClick}
                    to={to}
                    name={name}
                    active={active}
                >{label}</Menu.Item>
            )
        })

    };

    render() {
        const  {menu} = this.state;
        const cls = [
            'menu-switch',
            'fa',
            menu ? 'fa-times' : 'fa-bars'
        ];
        const clsMenu = [
            'menu-box',
            menu ? 'show' : 'hide'
        ];

        const {activeItem} = this.state;

        const links = [
            {to: '/', label: 'Главная',  name: 'home', active: activeItem === 'home',},
            {to: '/quiz', label: 'Опросы',  name: 'quiz', active: activeItem === 'quiz',},
        ];

        if(this.props.isAuth) {
            links.push( {to: '/quiz-creator', label: 'Создание опроса', name: 'quiz-creator', active: activeItem === 'quiz-creator'},);
            links.push( {to: '/logout', label: 'Выйти', name: 'logout', active: activeItem === 'logout'},);
        } else {
            links.push( {to: '/auth', label: 'Авторизация',  name: 'auth', active: activeItem === 'auth',},)
        }

        return (
            <div>
                <i onClick={this.handlerOnToggle} className={cls.join(' ')}/>

                <Menu className={clsMenu.join('  ')} inverted vertical>
                    {this.renderLinks(links)}
                </Menu>
                {
                    menu ? <Backdrop onClick={this.handlerOnToggle}/> : null
                }
            </div>
        );
    }
}
export default MenuNav;