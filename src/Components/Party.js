import { useState } from "react"
import CharacterCard from "./CharacterCard"

function Party({partyList, onMoveCharacter, onDelete, onCreateParty}){
    const [partyName, setPartyName] = useState("")
    // const [partyMembers, setPartyMembers] = useState([])

    const  myParty = partyList.map((character)=> (
        <CharacterCard
        key={character.name}
        character={character}
        onPartyClick={onMoveCharacter}
        onDelete={onDelete}
        origin="party"
        />
      ))


    function handleSubmit(e){
        e.preventDefault()

       const partyMembers = partyList.map(function(i){
        return i.name
       })
    //    console.log(partyMembers)
        const partyData={
            partyName: partyName,
            partyMembers: partyMembers
        }
    
    fetch("http://localhost:8001/partys",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify(partyData)
      })
      .then((r) => r.json())
      .then((newParty) => onCreateParty(newParty))
    }

    return (
        <div className="party">
            {myParty}
            <div></div>
            <div className="createParty">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    name="partyName"
                    placeholder="Enter party name..."
                    className="input-text"
                    onChange={(e)=> setPartyName(e.target.value)}
                    />
                    <input 
                    type="submit"
                     name="submit"
                     value="Create New Party"
                    className="submit"
                    />
                </form>
            </div>
        
        </div>
    )
}

export default Party