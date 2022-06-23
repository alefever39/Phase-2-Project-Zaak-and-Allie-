import React from "react"

function Filters({ onClassFilter, onRaceFilter}){
    return(
        <div className="filterGrid">
            <div className="classFilter">
                <h4>Choose A Class:</h4>
                <select className="ui selection dropdown" name="type" id="class" aria-label="class" 
                onChange={(e)=> onClassFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="barbarian">Barbarian</option>
                <option value="bard">Bard</option>
                <option value="cleric">Cleric</option>
                <option value="druid">Druid</option>
                <option value="fighter">Fighter</option>
                <option value="monk">Monk</option>
                <option value="paladin">Paladin</option>
                <option value="ranger">Ranger</option>
                <option value="rogue">Rogue</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="warlock">Warlock</option>
                <option value="wizard">Wizard</option>
                </select>
            </div>
            <div className="raceFilter">
                <h4>Choose A Race:</h4>
                <select className="ui selection dropdown" name="type" id="race" aria-label="race" 
                onChange={(e)=> onRaceFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="dragonborn">Dragonborn</option>
                <option value="dwarf">Dwarf</option>
                <option value="elf">Elf</option>
                <option value="half-Elf">Half-Elf</option>
                <option value="halfling">Halfling</option>
                <option value="half-Orc">Half-Orc</option>
                <option value="human">Human</option>
                <option value="tiefling">Tiefling</option>
                </select>
            </div>

        </div>
    )
}

export default Filters