import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./Components/NavBar";
import CharacterCreator from "./Components/CharacterCreator";
import CharcaterSelection from "./Components/CharacterSelection";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Party from "./Components/Party";
import CharacterDetail from "./Components/CharacterDetail";
import PartySelect from "./Components/PartySelect";

// API base level https://www.dnd5eapi.co/
// additional API information https://www.dnd5eapi.co/docs/#get-/api/proficiencies/-index-

function App() {
  const [characters, setCharacter] = useState([]);
  const [party, setParty] = useState([]);
  const [classFilter, setClassFilter] = useState("All");
  const [raceFilter, setRaceFilter] = useState("All");
  const [detailView, setDetailView] = useState(false);
  const [characterSelection, setCharacterSelection] = useState({});
  const [partys, setNewParty] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editChar, setEditChar] = useState({});

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8001/partys")
      .then((r) => r.json())
      .then((groups) => setGroups(groups));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/characters")
      .then((r) => r.json())
      .then((characters) => setCharacter(characters));
  }, []);

  //create character
  //updates state when create character form is submitted
  function onCreateCharacter(newCharacter) {
    setCharacter((characters) => [...characters, newCharacter]);
  }

  //Edit Character
  //updates state when the edit character form is submitted
  function onEditCharacter(newCharacter) {
    const newCharacters = characters.map((character) =>
      character.id === newCharacter.id ? newCharacter : character
    );
    setCharacter(newCharacters);
    setCharacterSelection(newCharacter);
  }

  //Detail View
  function characterSelected(e, character) {
    setDetailView(true);
    setCharacterSelection(character);
  }

  function onGoBack() {
    setDetailView(false);
  }

  function onEditButton(charToEdit) {
    setEditChar(charToEdit);
    history.push("/edit");
  }

  //Filtering
  function handleClassFilter(classFilter) {
    setClassFilter(classFilter);
  }

  function handleRaceFilter(raceFilter) {
    setRaceFilter(raceFilter);
  }

  const charactersToDisplay = characters
    .filter((character) => {
      if (classFilter === "All") return true;
      return character.class === classFilter;
    })
    .filter((character) => {
      if (raceFilter === "All") return true;
      return character.race === raceFilter;
    });

  //Add to Party
  function handleAddParty(e, characterToAdd) {
    const partyList = party.find(
      (character) => character.id === characterToAdd.id
    );
    if (!partyList) {
      setParty([...party, characterToAdd]);
    }
  }
  //Remove From Party
  function handleRemoveParty(e, characterToMove) {
    setParty((party) =>
      party.filter((character) => character.id !== characterToMove.id)
    );
  }

  //Delete Character
  function handleDeleteCharacter(characterToDelete) {
    const updatedcharacter = characters.filter(
      (character) => character.id !== characterToDelete.id
    );
    const updatedParty = party.filter(
      (character) => character.id !== characterToDelete.id
    );
    setCharacter(updatedcharacter);
    setParty(updatedParty);
  }

  //Create Party
  function createParty(newParty) {
    setNewParty([...partys, newParty]);
  }

  const partyDisplay = groups.map((group) =>
    characters.filter((character) =>
      group.partyMembers.find((partyMember) => partyMember === character.name)
    )
  );

    const partyName = groups.map(group=> group.partyName)
    const partyId = groups.map(group=> group.id)
    
//Delete Party
  function handleDeleteParty(partyToDelete){
    const updatedparty = groups.filter((party)=> party.id !== partyToDelete.id)
    setGroups(updatedparty)
  }

  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/create">
          <CharacterCreator
            onCreateCharacter={onCreateCharacter}
            onEditCharacter={onEditCharacter}
          />
        </Route>
        <Route exact path="/edit">
          <CharacterCreator
            onCreateCharacter={onCreateCharacter}
            onEditCharacter={onEditCharacter}
            editInfo={editChar}
          />
        </Route>
        <Route exact path="/select">
            <h2 className="Party">Build Your Party</h2>
            <Party 
              partyList={party}
              onMoveCharacter = {handleRemoveParty}
              onDelete={handleDeleteCharacter}
              onCreateParty={createParty}
              />
            <hr></hr>
          {detailView ? (
            <CharacterDetail
              character={characterSelection}
              onPartyAdd={handleAddParty}
              onGoBack={onGoBack}
              onEditButton={onEditButton}
            />
          ) : (
            <CharcaterSelection
              characterList={charactersToDisplay}
              onDetailClick={characterSelected}
              onPartyAdd={handleAddParty}
              onDelete={handleDeleteCharacter}
              onClassFilter={handleClassFilter}
              onRaceFilter={handleRaceFilter}
            />
          )}
        </Route>
        <Route path="/party">
        {detailView ? (
            <CharacterDetail 
            character={characterSelection}
            onPartyAdd={handleAddParty} 
            onGoBack={onGoBack}
            />)
            : (
          <PartySelect 
            partyMembers={partyDisplay} 
            partyName={partyName}
            onMoveCharacter={handleRemoveParty}
            onDelete={handleDeleteCharacter}
            onDetailClick={characterSelected}
            onDeleteParty={handleDeleteParty}
            partyId={partyId}
            />
            )}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
