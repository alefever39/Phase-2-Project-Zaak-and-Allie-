function CharacterDetail({character, onPartyAdd, onGoBack}){

    return(
        <div className="characterDetail">
            <button onClick={(e) => onPartyAdd(e, character)}>Add To Party</button>
            <button onClick={onGoBack}>Go Back</button>
            <p>{character.name}</p>
            <img src={character.image} alt="character" width="600"></img>
            <p>Class:{character.class} Race: {character.race}</p>
            <p>Health: {character.health}</p>
            <p>Backstory: {character.bio}</p>
            <hr></hr>
            
        </div>
    )
}

export default CharacterDetail