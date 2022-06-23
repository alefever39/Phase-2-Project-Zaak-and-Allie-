import PartyCard from "./PartyCard";

function PartySelect({
  partyMembers,
  onMoveCharacter,
  onDelete,
  partyName,
  onDetailClick,
  onDeleteParty,
  partyId,
}) {
  const partyCollection = partyMembers.map((character, index) => {
    return (
      <PartyCard
        key={character.name}
        character={character}
        onMoveCharacter={onMoveCharacter}
        onDelete={onDelete}
        partyName={partyName[index]}
        onDetailClick={onDetailClick}
        onDeleteParty={onDeleteParty}
        partyId={partyId[index]}
      />
    );
  });

  return (
    <div>
      <h1>Parties</h1>
      <div>{partyCollection}</div>
    </div>
  );
}

export default PartySelect;
