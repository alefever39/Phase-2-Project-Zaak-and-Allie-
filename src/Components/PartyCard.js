
import CharacterCard from "./CharacterCard"

function PartyCard({character, partyName, onMoveCharacter, onDelete}){

        

    const partyMembers = character.map((character)=>(
        <CharacterCard
        key= {character.name}
        character={character}
        origin="party"
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        />
    ))


    return(
        <div className="partySheet">
            <h2>{partyName}</h2>
            <div>{partyMembers}</div>
            <hr></hr>
        </div>
    )
}

export default PartyCard