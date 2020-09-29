import React from 'react';
import { Redirect } from '@reach/router';
import {
  Card, List, Input, Button,
} from 'semantic-ui-react';
import { v4 as uuidV4 } from 'uuid';
import Layout from './Layout';
import db from '../boundaries/database';

export default function Group({ groupId }) {
  const [group, setGroup] = React.useState({});
  const [updateTime, setUpdateTime] = React.useState(new Date());
  const [newPlayerName, setNewPlayerName] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    db.groups.get({ id: groupId }).then(setGroup);
  }, [updateTime]);

  function addPlayer() {
    const clone = { ...group };
    clone.players.push({
      id: uuidV4(),
      name: newPlayerName,
    });
    db.groups.update(groupId, clone);
    setUpdateTime(new Date());
    setNewPlayerName('');
  }

  function removeGroup() {
    db.groups.bulkDelete([group.id]);
    setRedirect(true);
  }

  function removePlayer(id) {
    const clone = { ...group };
    clone.players = clone.players.filter((p) => p.id !== id);
    db.groups.update(groupId, clone);
    setUpdateTime(new Date());
    setNewPlayerName('');
  }

  return (
    <Layout>
      <Card fluid className="group-players-card">
        <Card.Content className="group-players-card__content">
          <Card.Header>
            { group.name }
          </Card.Header>
          <div>
            <Button color="red" icon="delete" onClick={removeGroup} content="Remover Grupo" />
          </div>
        </Card.Content>
        <Card.Content>
          <List divided relaxed>
            {
              group.players && group.players.map((player) => (
                <List.Item key={player.id}>
                  <List.Content className="group-players-card__content">
                    <span>{player.name}</span>
                    <Button icon="delete" onClick={() => removePlayer(player.id)} />
                  </List.Content>
                </List.Item>
              ))
            }
            <List.Item>
              <Input
                fluid
                action={{
                  icon: 'plus',
                  content: 'Adicionar',
                  onClick: addPlayer,
                  color: 'green',
                }}
                placeholder="Novo Jogador"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
              />
            </List.Item>
          </List>
        </Card.Content>
      </Card>
      { redirect && <Redirect to="/groups" />}
    </Layout>
  );
}
