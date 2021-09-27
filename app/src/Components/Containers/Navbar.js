import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import logo from '../../Assets/Images/logo.png';
import { RootStoreContext } from '../../Stores/RootStore';

const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { signedIn, activeNavbarItem, setActiveNavbarItem } =
    rootStore.commonStore;

  const toggleItem = (value) => {
    setActiveNavbarItem(value);
  };

  return (
    <Menu fixed='top'>
      <Menu.Item header>
        <img src={logo} alt='KUM' />
      </Menu.Item>
      <Menu.Item>
        <Link to='/'>
          <h3>Crowdsourcing App</h3>
        </Link>
      </Menu.Item>
      <Menu text className='mx-2'>
        {signedIn ? (
          <Menu.Item
            name='userPanel'
            active={activeNavbarItem === 'userPanel'}
            onClick={() => toggleItem('userPanel')}
            className='mr-1'
          >
            <Link
              to='/user'
              style={{
                textDecoration:
                  activeNavbarItem === 'userPanel' ? 'underline' : 'none',
              }}
            >
              <Icon name='dashboard' style={{ textDecoration: 'none' }} />
              Panel zarządzania
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
        <Menu.Item
          name='aboutExperiment'
          active={activeNavbarItem === 'aboutExperiment'}
          onClick={() => toggleItem('aboutExperiment')}
          className='mr-1'
        >
          <Link
            to='/about/experiment'
            style={{
              textDecoration:
                activeNavbarItem === 'aboutExperiment' ? 'underline' : 'none',
            }}
          >
            <Icon name='book' style={{ textDecoration: 'none' }} />
            Zasady eksperymentu
          </Link>
        </Menu.Item>
        <Menu.Item
          name='aboutUs'
          active={activeNavbarItem === 'aboutUs'}
          onClick={() => toggleItem('aboutUs')}
          className='mr-1'
        >
          <Link
            to='/about/kum'
            style={{
              textDecoration:
                activeNavbarItem === 'aboutUs' ? 'underline' : 'none',
            }}
          >
            <Icon name='users' style={{ textDecoration: 'none' }} />O Nas
          </Link>
        </Menu.Item>
      </Menu>
      <Menu.Menu position='right'>
        {signedIn ? (
          <Menu.Item name='logout'>
            <Link to='/logout'>
              <Button negative>Wyloguj się</Button>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item name='login'>
            <Link to='/login'>
              <Button positive>Zaloguj się</Button>
            </Link>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default observer(Navbar);
