
import React from 'react';
import { Redirect } from '@reach/router';
import { Card, List, Input } from 'semantic-ui-react';
import { v4 as uuidV4 } from 'uuid';
import Layout from './Layout';
import db from '../boundaries/database';
import Check from '../components/check';

export default function NewGame() {
  const [groups, setGroups] = React.useState([]);
  const [players, setPlayers] = React.useState({});
  const [roles, setRoles] = React.useState([]);
  const [newPlayerName, setNewPlayerName] = React.useState('');
  const [redirect, setRedirect] = React.useState(null);

  React.useEffect(() => { db.groups.toArray().then(setGroups); }, []);

  function toggleVisibility(groupId) {
    const clone = [...groups];
    clone.forEach((group, i) => {
      if (group.id === groupId) { clone[i].visible = !clone[i].visible; }
    });

    setGroups(clone);
  }

  function addPlayerFromInput() {
    setPlayers({ ...players, [new Date().getTime()]: newPlayerName });
    setNewPlayerName('');
  }

  function addPlayersFromGroup(newPlayers) {
    setPlayers({ ...players, ...newPlayers });
  }


  function removePlayers(...indexes) {
    const clone = { ...players };
    indexes.forEach((index) => { delete clone[index]; });
    setPlayers(clone);
  }

  return (
    <Layout>
      <Card fluid>
        <Card.Content>
          <Card.Header>Jogadores</Card.Header>
        </Card.Content>
        <Card.Content>
          <List divided relaxed>
            {
              groups.reduce((memo, group) => [...memo,
                <List.Item key={group.id}>
                  <Check
                    checked={group.players.every((player) => players[player.id])}
                    onCheck={() => addPlayersFromGroup(
                      group.players.reduce(
                        (obj, player) => ({ ...obj, [player.id]: player.name }), {},
                      ),
                    )}
                    onUncheck={() => removePlayers(...group.players.map((player) => player.id))}
                  />
                  <List.Content onClick={() => toggleVisibility(group.id)} key={group.id}>
                    <List.Header>{group.name}</List.Header>
                  </List.Content>
                </List.Item>,
                group.visible && group.players.map((player) => (
                  <List.Item key={player.id}>
                    <Check
                      checked={players[player.id]}
                      onCheck={() => addPlayersFromGroup({ [player.id]: player.name })}
                      onUncheck={() => removePlayers(player.id)}
                    />
                    <List.Content>
                      <List.Description>{player.name}</List.Description>
                    </List.Content>
                  </List.Item>
                )),
              ], [])
            }
            {
              Object.keys(players).filter((key) => !key.includes('-')).map((key) => (
                <List.Item key={key}>
                  <List.Icon name="remove" color="red" size="large" onClick={() => removePlayers(key)} />
                  <List.Content>
                    <List.Description>{players[key]}</List.Description>
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
                  onClick: addPlayerFromInput,
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
      <Card fluid>
        <Card.Content>
          <Card.Header>Cidade</Card.Header>
        </Card.Content>
      </Card>
      { redirect && <Redirect to={`/games/${redirect}`} />}
    </Layout>
  );
}
