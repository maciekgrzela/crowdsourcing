import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { Segment, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserWelcome = ({ user, editInfoRef }) => {
  return (
    <Segment padded className='user-dashboard__user-info py-4 mb-4'>
      <div className='user-dashboard__welcome'>
        <FaUserAstronaut size={50} className='mr-1' />
        <Header className='user-dashboard__header'>
          <Header.Content>
            Witaj {user.firstName} {user.lastName}!
          </Header.Content>
          <Header.Subheader style={{ paddingLeft: '5px', fontSize: '1.2rem' }}>
            W tym miejscu możesz zarządzać światem!
          </Header.Subheader>
        </Header>
      </div>
      <div className='user-dashboard__options'>
        <Dropdown icon='ellipsis horizontal' floating>
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              <Dropdown.Item
                onClick={() => {
                  editInfoRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                  });
                }}
              >
                Modyfikuj dane
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/logout'>Wyloguj się</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Segment>
  );
};

export default UserWelcome;
