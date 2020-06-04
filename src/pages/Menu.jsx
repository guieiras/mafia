
import React from 'react';
import { Card, List } from 'semantic-ui-react';
import { Link } from '@reach/router';
import Layout from './Layout';

export default function Home() {
  return (
    <Layout>
      <Card fluid>
        <Card.Content>
          <List divided relaxed>
            <Link className="item" to="/new" rel="listitem">
              <List.Icon name="plus" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Novo Jogo</List.Header>
                <List.Description>Inicia um novo jogo de Cidade Dorme</List.Description>
              </List.Content>
            </Link>
            <Link className="item" to="/setups" rel="listitem">
              <List.Icon name="block layout" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Carregar jogo pré-existente</List.Header>
                <List.Description>Carrega um jogo existente</List.Description>
              </List.Content>
            </Link>
            <Link className="item" to="/groups" rel="listitem">
              <List.Icon name="users" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Grupos de Jogo</List.Header>
                <List.Description>Gerencia os grupos de jogo</List.Description>
              </List.Content>
            </Link>
          </List>
        </Card.Content>
      </Card>
    </Layout>
  );
}
