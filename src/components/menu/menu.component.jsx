import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

import { auth } from '../../firebase/firebase.utils';

import uabcLogo from '../../assets/uabc-logo-white.png';

const HomeMenu = ({ history, userMenu }) => {
    const handleDropdownItem = (e, data) => {
        const registerOpt = data.children;

        history.push('/registro/' + registerOpt.toLowerCase());
    };

    const handleMenuItem = async (e, { name }) => {
        if (name === 'cerrar-sesion') {
            await auth.signOut();
            history.push('/');
        } else {
            history.push('/' + name);
        }
    };

    return (
        <Menu
            stackable
            size="large"
            style={{
                position: 'sticky',
                top: 0,
                borderRadius: 0,
                zIndex: 100,
                fontFamily: 'ProximaNova',
                backgroundColor: '#00723F',
            }}
        >
            <Menu.Item
                style={{ color: 'white' }}
                onClick={() => history.push('/')}
            >
                <img src={uabcLogo} alt="uabc_logo" />
            </Menu.Item>

            {userMenu ? (
                <Menu.Item
                    style={{ color: 'white' }}
                    name="student"
                    onClick={handleMenuItem}
                >
                    <Icon name="book" />
                    Carga de Asignaturas
                </Menu.Item>
            ) : (
                <>
                    <Dropdown
                        item
                        style={{ color: 'white' }}
                        text="Registro de Usuarios"
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                icon="user plus"
                                onClick={handleDropdownItem}
                            >
                                Estudiante
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleDropdownItem}>
                                Profesor
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item
                        style={{ color: 'white' }}
                        name="profesores"
                        onClick={handleMenuItem}
                    >
                        <Icon name="users" />
                        Panel de Profesores
                    </Menu.Item>

                    <Menu.Item
                        style={{ color: 'white' }}
                        name="estudiantes"
                        onClick={handleMenuItem}
                    >
                        <Icon name="student" />
                        Panel de Estudiantes
                    </Menu.Item>

                    <Menu.Item
                        style={{ color: 'white' }}
                        name="asignaturas"
                        onClick={handleMenuItem}
                    >
                        <Icon name="book" />
                        Vincular Asignaturas
                    </Menu.Item>
                </>
            )}

            <Menu.Item
                style={{ color: 'white', marginLeft: 'auto' }}
                name="cerrar-sesion"
                onClick={handleMenuItem}
            >
                <Icon name="sign out" />
                Cerrar Sesión
            </Menu.Item>
        </Menu>
    );
};

export default HomeMenu;
