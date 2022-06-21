import CharacterCard from "./CharacterCard"

function Party({partyList, onMoveCharacter, onDelete}){

    const  myParty = partyList.map((character)=> (
        <CharacterCard
        key={character.id}
        character={character}
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        origin="party"
        />
      ))


    return (
        <div className="party">
            {myParty}
        </div>
    )
}

export default Party