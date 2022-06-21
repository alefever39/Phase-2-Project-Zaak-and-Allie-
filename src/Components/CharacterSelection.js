import CharacterCard from "./CharacterCard"
import Filters from "./Filters";

function CharacterSelection({characterList, onDetailClick, onPartyAdd, onDelete, onClassFilter, onRaceFilter }) {

    const characterCollection = characterList.map((character)=>(
        <CharacterCard
        key= {character.name}
        character={character}
        onPartyAdd = {onPartyAdd}
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
