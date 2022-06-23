import CharacterCard from "./CharacterCard"
import Filters from "./Filters";

function CharacterSelection({characterList, onDetailClick, onPartyAdd, onDelete, onClassFilter, onRaceFilter }) {
    // console.log(characterList)   
     const characterCollection = characterList.map((character)=>(
        <CharacterCard
        key= {character.name}
        character={character}
        onPartyClick = {onPartyAdd}
        onDelete={onDelete}
        origin="selection"
        onDetailClick={onDetailClick}
        />
    ))


 
    return(
        <div>
            <Filters onClassFilter={onClassFilter} onRaceFilter={onRaceFilter}/>
            <div> 
                {characterCollection}
            </div>
        </div>
    

    )
}

export default CharacterSelection;
