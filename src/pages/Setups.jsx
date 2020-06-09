import React from 'react';
import {
  Card, Input, Button, Label, Table,
} from 'semantic-ui-react';
import { v4 as uuidV4 } from 'uuid';
import Layout from './Layout';
import db from '../boundaries/database';
import Role, { RoleLibrary } from '../roles';
import RoleSelector from '../components/NewGame/RoleSelector';
import i18n from '../i18n';

export default function Setups() {
  const initialRoles = { narrator: 1, assassin: 1 };
  const [setups, setSetups] = React.useState([]);
  const [updateTime, setUpdateTime] = React.useState(new Date());
  const [newSetupName, setNewSetupName] = React.useState('');
  const [newSetupPlayers, setNewSetupPlayers] = React.useState(6);
  const [newSetupRoles, setNewSetupRoles] = React.useState(initialRoles);

  React.useEffect(() => {
    db.setups.toArray().then(setSetups);
  }, [updateTime]);

  function addSetup() {
    if (!newSetupName) { return; }
    db.setups.add({
      id: uuidV4(),
      name: newSetupName,
      players: newSetupPlayers,
      roles: newSetupRoles,
    }).then(() => {
      setUpdateTime(new Date());
      setNewSetupName('');
      setNewSetupRoles(initialRoles);
      setNewSetupPlayers(6);
    });
  }

  function handleMinus() {
    setNewSetupPlayers(newSetupPlayers === 6 ? 6 : newSetupPlayers - 1);
  }

  function handlePlus() {
    setNewSetupPlayers(newSetupPlayers + 1);
  }

  function removeSetup(setupId) {
    db.setups.bulkDelete([setupId]).then(() => {
      setUpdateTime(new Date());
    });
  }

  return (
    <Layout>
      <Card fluid>
        <Card.Content>
          <Card.Header>Meus Setups</Card.Header>
        </Card.Content>
        <Card.Content>
          { setups.length ? (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Jogadores</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  setups.map((setup) => (
                    <Table.Row key={setup.id}>
                      <Table.Cell>{setup.name}</Table.Cell>
                      <Table.Cell>{setup.players}</Table.Cell>
                      <Table.Cell>
                        { Object.keys(setup.roles).reduce((memo, role) => [
                          ...memo, ...new Array(
                            setup.roles[role],
                          ).fill(null).map(() => {
                            const roleObject = Role(role);
                            let color;
                            switch (roleObject.team) {
                              case 'city':
                                color = 'blue';
                                break;
                              case 'mafia':
                                color = 'red';
                                break;
                              case 'neutral':
                                color = 'yellow';
                                break;
                              default:
                                color = 'teal';
                            }
                            return (
                              <Label circle color={color}>
                                <i className={`game-icon game-icon-${roleObject.icon}`} />
                              </Label>
                            );
                          }),
                        ], [])}
                      </Table.Cell>
                      <Table.Cell>
                        <Button icon="delete" color="red" onClick={() => { removeSetup(setup.id); }} />
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          ) : <Card.Description>Nenhum configuração adicionada</Card.Description> }
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>Minhas configurações</Card.Header>
        </Card.Content>
        <Card.Content className="new-setup">
          <Input
            fluid
            label="Nome do setup"
            value={newSetupName}
            onChange={(e) => setNewSetupName(e.target.value)}
          />
          <div className="input-numeric">
            <Label size="large">Número de Jogadores</Label>
            <div className="input-numeric__input">
              <Button icon="minus" onClick={handleMinus} />
              <Label size="large">{newSetupPlayers}</Label>
              <Button icon="plus" onClick={handlePlus} />
            </div>
          </div>
          <div className="list-roles">
            {
              RoleLibrary.reduce((memo, [role, options]) => [...memo,
                ...new Array(options.amount).fill(null).map((_e, index) => (
                  <RoleSelector
                    key={`${role.id}${index}`}
                    text={i18n.roles[role.id]}
                    icon={role.icon}
                    checked={newSetupRoles[role.id] > index}
                    lockUncheck={newSetupRoles[role.id] <= options.force}
                    onCheck={
                      () => setNewSetupRoles(
                        { ...newSetupRoles, [role.id]: (newSetupRoles[role.id] || 0) + 1 },
                      )
                    }
                    onUncheck={
                      () => setNewSetupRoles(
                        { ...newSetupRoles, [role.id]: newSetupRoles[role.id] - 1 },
                      )
                    }
                  />
                )),
              ], [])
            }
          </div>
          <Button fluid color="green" content="Criar configuração" onClick={addSetup} />
        </Card.Content>
      </Card>
    </Layout>
  );
}
