function CharacterCard({
  character,
  origin,
  onDetailClick,
  onPartyClick,
  onDelete,
}) {
  function handleDelete() {
    fetch(`http://localhost:8001/characters/${character.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDelete(character));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="cardGrid">
      <div className="card">
        <div className="character" onClick={(e) => onDetailClick(e, character)}>
          <img
            className="cardImage"
            src={character.image}
            alt="character"
          ></img>
          <h2>{character.name}</h2>
          <b>Class: </b>
          <a>{capitalizeFirstLetter(character.class)}</a> <b>Race: </b>
          <a>{capitalizeFirstLetter(character.race)}</a>
          <div></div>
          <b>Health: </b> <a>{character.health}</a>
        </div>
        <hr></hr>
        <div className="btns">
          <button className="Party" onClick={(e) => onPartyClick(e, character)}>
            {origin === "party" ? "Remove From Party" : "Add To Party"}
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete Character
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
