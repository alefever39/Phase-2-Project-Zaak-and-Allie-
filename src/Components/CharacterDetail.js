import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

function CharacterDetail({ character, onPartyAdd, onGoBack, onEditButton }) {
  const [currentHealth, setCurrentHealth] = useState(character.health);

  const skillsList = {
    Acrobatics: "dexterity",
    "Animal-Handling": "wisdom",
    Arcana: "intelligence",
    Athletics: "strength",
    Deception: "charisma",
    History: "intelligence",
    Insight: "wisdom",
    Intimidation: "charisma",
    Investigation: "intelligence",
    Medicine: "wisdom",
    Nature: "intelligence",
    Perception: "wisdom",
    Performance: "charisma",
    Persuasion: "charisma",
    Religion: "intelligence",
    "Sleight-Of-Hand": "dexterity",
    Stealth: "dexterity",
    Survival: "wisdom",
  };

  const skillProfs = character.proficiencyList
    .filter((prof) => prof.slice(0, 5) === "Skill")
    .map((prof) => prof.substring(7));

  const skillsListKeys = Object.keys(skillsList);
  const characterSkillsList = skillsListKeys.map((skill) => {
    const profficient = skillProfs.find((prof) => {
      const splitProf = prof.split(" ");
      const splitSkill = skill.split("-");
      if (splitProf[0] === splitSkill[0]) {
        return true;
      } else {
        return false;
      }
    })
      ? true
      : false;

    const skillModifier =
      (profficient ? parseInt(character.proficiencyBonus) : 0) +
      calculateStatModifier(character[skillsList[skill]]);
    return (
      <li
        key={skill}
        style={{
          listStyleType: profficient ? "disc" : "circle",
          textAlign: "left",
        }}
      >
        {skill}: {skillModifier}
      </li>
    );
  });

  const spells = character.spellList;
  const spellItems = spells.map((spell) => <li>{spell}</li>);

  const profs = character.proficiencyList;
  const profItems = profs.map((prof) => <li>{prof}</li>);

  const languages = character.languageList;
  const languageitems = languages.map((language) => <li>{language}</li>);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function calculateStatModifier(statLevel) {
    return Math.floor((statLevel - 10) / 2);
  }

  function handleChange(e) {
    setCurrentHealth(e.target.value);
  }

  return (
    <div className="characterDetail">
      <button onClick={(e) => onPartyAdd(e, character)}>Add To Party</button>
      <button onClick={onGoBack}>Go Back</button>
      <button onClick={() => onEditButton(character)}>Edit Character</button>
      <img
        className="detailImage"
        src={character.image}
        alt="character image"
      />
      <div>
        <div className="characterDeetsTop">
          <h1>{character.name}</h1>
          <b>Class: </b>
          <a>{capitalizeFirstLetter(character.class)} </a>
          <b>Race: </b>
          <a>{capitalizeFirstLetter(character.race)} </a>
          <div></div>
          <b>Health: </b>
          <a style={{ marginRight: "20px" }}>
            <input
              type="number"
              className="numberInput"
              value={currentHealth}
              onChange={handleChange}
            />{" "}
            /{character.health}{" "}
          </a>
          <b>AC: </b> <a style={{ marginRight: "10px" }}>{character.ac}</a>{" "}
          <b>Iniative: </b>
          <a> {Math.floor((character.dexterity - 10) / 2)}</a>
          <div></div>
          <b>Proficiency Bonus: </b>
          <a style={{ marginRight: "10px" }}> {character.proficiencyBonus}</a>
          <b>Speed: </b>
          <a> {character.speed}</a>
        </div>
        <div className="characterDeets">
          <h3>Stats</h3>
          <table className="statTable">
            <tr>
              <th>STR</th>
              <th>CON</th>
              <th>DEX</th>
              <th>INT</th>
              <th>WIS</th>
              <th>CHA</th>
            </tr>
            <tr>
              <td>{character.strength}</td>
              <td>{character.constitution}</td>
              <td>{character.dexterity} </td>
              <td>{character.intelligence} </td>
              <td>{character.wisdom} </td>
              <td>{character.charisma} </td>
            </tr>
            <tr>
              <td>{Math.floor((character.strength - 10) / 2)}</td>
              <td>{Math.floor((character.constitution - 10) / 2)}</td>
              <td>{Math.floor((character.dexterity - 10) / 2)}</td>
              <td>{Math.floor((character.intelligence - 10) / 2)}</td>
              <td>{Math.floor((character.wisdom - 10) / 2)}</td>
              <td>{Math.floor((character.charisma - 10) / 2)}</td>
            </tr>
          </table>
        </div>
        <hr></hr>
        <div className="characterContainer">
          <Tabs>
            <TabList className="bar">
              <Tab>Skills</Tab>
              <Tab>Spells</Tab>
              <Tab>Proficiencies</Tab>
              <Tab>Character Details</Tab>
              <Tab>Backstory</Tab>
            </TabList>
            <TabPanel>
              <div className="skills-div">
                <h2>Skills</h2>
                <div className="skills-list-div">
                  <ul className="profList">{characterSkillsList}</ul>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <h2>Spells</h2>
                <div>{spellItems}</div>
              </div>
            </TabPanel>
            <TabPanel>
              <h2>Proficiencies</h2>
              <div>{profItems}</div>
            </TabPanel>
            <TabPanel>
              <h2>Character Details</h2>
              <div className="row">
                <div className="column">
                  <p>Gender: {character.gender}</p>
                  <p>Hair: {character.hair}</p>
                  <p>Skin: {character.skin}</p>
                  <p>Eyes: {character.eyes}</p>
                  <p>Height: {character.height}</p>
                  <p>Weight: {character.weight}</p>
                </div>
                <div className="column">
                  <p>Alignment: {character.alignment}</p>
                  <p>Faith: {character.faith}</p>
                  <p>Background: {character.background}</p>
                  <p>Languages: {languageitems}</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <h3>Backstory: </h3>
              <p>{character.backstory}</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default CharacterDetail;
