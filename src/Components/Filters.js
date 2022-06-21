import React from "react"

function Filters({ onClassFilter, onRaceFilter}){
    return(
        <div className="filterGrid">
            <div className="classFilter">
                <h4>Choose A Class:</h4>
                <select className="ui selection dropdown" name="type" id="class" aria-label="class" 
                onChange={(e)=> onClassFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Barbarian">Barbarian</option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Fighter">Fighter</option>
                <option value="Monk">Monk</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Rogue">Rogue</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
                </select>
            </div>
            <div className="raceFilter">
                <h4>Choose A Race:</h4>
                <select className="ui selection dropdown" name="type" id="race" aria-label="race" 
                onChange={(e)=> onRaceFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Dragonborn">Dragonborn</option>
                <option value="Dwarf">Dwarf</option>
                <option value="Elf">Elf</option>
                <option value="Half-Elf">Half-Elf</option>
                <option value="Halfling">Halfling</option>
                <option value="Half-Orc">Half-Orc</option>
                <option value="Human">Human</option>
                <option value="Tiefling">Tiefling</option>
                </select>
            </div>

        </div>
    )
}

export default Filters