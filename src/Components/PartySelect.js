import PartyCard from "./PartyCard"

function PartySelect({partyMembers, onMoveCharacter, onDelete, partyName, onDetailClick, onDeleteParty, partyId}){

    console.log(partyMembers)

    const partyCollection = partyMembers.map((character, index)=>{
        return(
        <PartyCard
        key= {partyId[index]}   
        character={character}
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        partyName={partyName[index]}
        onDetailClick={onDetailClick}
        onDeleteParty={onDeleteParty}
        partyId={partyId[index]}
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