import React from 'react';
import { Menu } from 'semantic-ui-react'
import Backdrop from "../../UI/Backdrop/Backdrop";

import './menuNav.css'


const MenuNav = ({activeItem, handleItemClick, menu, onToggle}) => {

    const cls = [
        'menu-switch',
        'fa',
        menu ? 'fa-times' : 'fa-bars'
    ];
    const clsMenu =  [
        'menu-box',
        menu ? 'active' : 'close'
    ];

    return (
        <div>
            <i onClick={onToggle} className={cls.join(' ')}/>

            <Menu className={clsMenu.join('  ')} inverted vertical>
                <Menu.Item
                    name={'home'}
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                >
                    Главная
                </Menu.Item>
                <Menu.Item
                    name={'quiz'}
                    active={activeItem === 'quiz'}
                    onClick={handleItemClick}
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