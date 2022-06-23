import PartyCard from "./PartyCard"

function PartySelect({partyMembers, onMoveCharacter, onDelete, partyName}){

    const partyCollection = partyMembers.map((character, index)=>{
    
        return(
        <PartyCard
        key= {character.name}
        character={character}
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        partyName={partyName[index]}
        />
        )
        })


    return(
        <div>
            <h1>Parties</h1>
            <div>
                {partyCollection}
            </div>
        </div>
    )
}

export default PartySelect