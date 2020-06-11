import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';

export default function Layout({ children }) {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Link to="/" className="header item">
            Cidade Dorme
          </Link>
        </Container>
      </Menu>
      <Container style={{ paddingTop: '4em' }}>
        { children }
      </Container>
    </div>
  );
}
