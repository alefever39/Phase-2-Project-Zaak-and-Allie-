
import CharacterCard from "./CharacterCard"

function PartyCard({character, partyName, onMoveCharacter, onDelete, onDetailClick, onDeleteParty, partyId}){

    function handleDeleteParty(){
            fetch(`http://localhost:8001/partys/${partyId}`,{
            method:"DELETE",
        })
        .then((r)=> r.json())
        .then(()=> onDeleteParty(partyId))
        }
     

    const partyMembers = character.map((character)=>(
        <CharacterCard
        key= {character.name}
        character={character}
        origin="party"
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        onDetailClick={onDetailClick}
        />
    ))


    return(
        <div className="partySheet">
            <h1>{partyName}</h1>
            <div>{partyMembers}</div>
            <button className="delete" onClick={handleDeleteParty}>Delete Party</button>
        </div>
    )
}

export default PartyCard