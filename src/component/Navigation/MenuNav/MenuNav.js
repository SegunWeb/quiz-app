import React from 'react';
import { Menu } from 'semantic-ui-react'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {Link} from "react-router-dom";

import './menuNav.css'



const MenuNav = ({activeItem, handleItemClick, menu, onToggle}) => {

    const cls = [
        'menu-switch',
        'fa',
        menu ? 'fa-times' : 'fa-bars'
    ];
    const clsMenu =  [
        'menu-box',
        menu ? 'show' : 'hide'
    ];

    return (
        <div>
            <i onClick={onToggle} className={cls.join(' ')}/>

            <Menu className={clsMenu.join('  ')} inverted vertical>
                <Menu.Item
                    as={ Link }
                    name={'home'}
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    to='/'
                >
                    Главная
                </Menu.Item>
                <Menu.Item
                    name={'quiz'}
                    active={activeItem === 'quiz'}
                    onClick={handleItemClick}
                    as={ Link }
                    to='/quiz'
                >
                    Опросы
                </Menu.Item>
            </Menu>
            {
                menu ? <Backdrop onClick={onToggle}/> : null
            }
        </div>
    );
}

export default  MenuNav ;