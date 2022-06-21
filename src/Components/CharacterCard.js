
function CharacterCard({character, origin, onDetailClick, onPartyClick, onDelete}) {

    function handleCharacterClick(){
        onPartyClick(character)
    }

    function handleDelete(){
        fetch(`http://localhost:3000/characters/${character.id}`,{
        method:"DELETE",
    })
    .then((r)=> r.json())
    .then(()=> onDelete(character))
    }

    return (

    <div className="cardGrid">
        <div className="card">
            <div className="character" onClick={(e) => onDetailClick(e, character)}>
            <img src={character.image} alt="character" width="300"></img>
            <h2>{character.name}</h2>
            <p>Class:{character.class} Race: {character.race}</p>
            <p>Health: {character.health}</p>
            </div>
            <hr></hr>
            <div className="btns">
                <button className="Party" onClick={handleCharacterClick}>{origin === "party" ? "Remove From Party" : "Add To Party"}</button>
                <button className="delete" onClick={handleDelete}>Delete Character</button>
            </div>
        </div>
    </div> 
        
    )

}

export default CharacterCard;

