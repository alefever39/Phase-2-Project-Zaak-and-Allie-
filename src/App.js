import "./App.css";
import React, { useState, useEffect} from "react"
import {  Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import CharacterCreator from "./Components/CharacterCreator"
import CharcaterSelection from "./Components/CharacterSelection"
import Home from "./Components/Home"
import Header from "./Components/Header";
import Party from "./Components/Party";
import CharacterDetail from "./Components/CharacterDetail";


// API base level https://www.dnd5eapi.co/
// additional API information https://www.dnd5eapi.co/docs/#get-/api/proficiencies/-index-


function App() {

  const [characters, setCharacter] = useState([])
  const [party, setParty] = useState([])
  const [classFilter, setClassFilter] = useState ("All")
  const [raceFilter, setRaceFilter] = useState ("All")
  const [detailView, setDetailView] = useState (false)
  const [characterSelection, setCharacterSelection] = useState({})
  
 
  useEffect(()=>{
    fetch("http://localhost:8001/characters")
    .then((r)=> r.json())
    .then((characters) => setCharacter(characters))
}, [])

//Detail View
function characterSelected(e, character){
  setDetailView(true)
  setCharacterSelection(character)
}

function onGoBack() {
  setDetailView(false);
}

//Filtering
  function handleClassFilter(classFilter){
    setClassFilter(classFilter)
  }

  function handleRaceFilter(raceFilter){
    setRaceFilter(raceFilter)
  }

  const charactersToDisplay= characters
    .filter((character)=>{ 
      if (classFilter === "All") return true
      return character.class === classFilter
    })
    .filter((character)=>{
      if(raceFilter ==="All") return true
      return character.race === raceFilter
    })

//Add to Party
  function handleAddParty(e, characterToAdd){
    const partyList = party.find(
      (character)=>character.id === characterToAdd.id
    )
    if(!partyList){
      setParty([...party, characterToAdd])
    }
  }
//Remove From Party
  function handleRemoveParty(e, characterToMove){
    setParty((party)=>
    party.filter((character)=>character.id !== characterToMove.id))
  }


//Delete Character
  function handleDeleteCharacter(characterToDelete){
    const updatedcharacter = characters.filter((character)=> character.id !== characterToDelete.id)
    const updatedParty = party.filter((character)=> character.id !== characterToDelete.id)
    setCharacter(updatedcharacter)
    setParty(updatedParty)
  }


  return (
    <div className="App">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/create">
          <CharacterCreator />
        </Route>
        <Route exact path="/select">
            <div className="Party">Build Your Party</div>
            <Party 
              partyList={party}
              onMoveCharacter = {handleRemoveParty}
              onDelete={handleDeleteCharacter}
              />
            <hr></hr>
          {detailView ? (
            <CharacterDetail 
            character={characterSelection}
            onPartyAdd={handleAddParty} 
            onGoBack={onGoBack}
            />)
            : (
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
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
