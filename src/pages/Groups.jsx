
import React from 'react';
import { Link } from '@reach/router';
import { Card, List, Input } from 'semantic-ui-react';
import { v1 as uuidV1 } from 'uuid';
import Layout from './Layout';
import db from '../boundaries/database';

export default function Groups() {
  const [groups, setGroups] = React.useState([]);
  const [updateTime, setUpdateTime] = React.useState(new Date());
  const [newGroupName, setNewGroupName] = React.useState('');

  React.useEffect(() => {
    db.groups.toArray().then(setGroups);
  }, [updateTime]);

  function addGroup() {
    db.groups.add({ id: uuidV1(), name: newGroupName, players: [] });
    setUpdateTime(new Date());
    setNewGroupName('');
  }

  return (
    <Layout>
      <Card fluid>
        <Card.Content>
          <List divided relaxed>
            {
            groups.map((group) => (
              <Link className="item" to={`/groups/${group.id}`} rel="listitem" key={group.id}>
                <List.Icon name="users" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{group.name}</List.Header>
                  <List.Description>
                    { group.players.map((player) => player.name).join(', ') }
                  </List.Description>
                </List.Content>
              </Link>
            ))
          }
            <List.Item>
              <Input
                fluid
                action={{
                  icon: 'plus',
                  content: 'Adicionar',
                  onClick: addGroup,
                }}
                placeholder="Novo Grupo"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    </Layout>
  );
}
