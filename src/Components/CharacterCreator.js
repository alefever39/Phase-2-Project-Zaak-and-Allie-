import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InfoCardContainer from "./InfoCardContainer";
import DetailsContainer from "./DetailsContainer";

function CharacterCreator({
  editInfo = "none",
  onCreateCharacter,
  onEditCharacter,
  saveDest,
}) {
  //////////////////////////////
  // variable declarations
  let defaultForm;

  if (editInfo === "none") {
    defaultForm = {
      name: "",
      health: 0,
      race: "dragonborn",
      class: "barbarian",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      spellList: [],
      languageList: [],
      proficiencyList: [],
      proficiencyBonus: 1,
      background: "",
      backstory: "",
      gender: "male",
      hair: "",
      skin: "",
      eyes: "",
      height: 0,
      weight: 0,
      image: "",
      alignment: "",
      faith: "",
      ac: 10,
      speed: 30,
    };
  } else {
    defaultForm = editInfo;
  }

  //////////////////////////////
  // state declarations
  const [formData, setFormData] = useState(defaultForm);
  const [addToList, setAddToList] = useState({
    spell: "",
    proficiency: "",
    language: "",
  });
  const [getInfo, setGetInfo] = useState(true);

  const [moreInfoDetails, setMoreInfoDetails] = useState({
    infoType: "none",
    infoList: [],
    iconList: [],
    readyToLoad: false,
    displayDetails: false,
    detailImage: "",
    index: "",
    spellLevel: 0,
  });

  const { infoType, readyToLoad, displayDetails, spellLevel } = moreInfoDetails;
  const history = useHistory();

  ///////////////////////////////////////
  // algorithims
  function calculateStatModifier(statLevel) {
    return Math.floor((statLevel - 10) / 2);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //////////////////////////////////////
  // character creation functions
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleListChange(e) {
    setAddToList({ ...addToList, [e.target.name]: e.target.value });
  }

  function handleAddToList(e) {
    e.preventDefault();
    const currentList = formData[e.target.name];
    const changedItem = e.target.name.substring(0, e.target.name.length - 4);
    setFormData({
      ...formData,
      [e.target.name]: [...currentList, addToList[changedItem]],
    });
    setAddToList({
      spell: "",
      proficiency: "",
      language: "",
    });
  }

  //////////////////////////////////////
  // "More Info" functions

  // gets the information from the dnd API and the images from the local database based on what the moreInfo state currently is.
  //
  useEffect(() => {
    if (infoType !== "none") {
      let dndAddress;
      let localAddress;
      if (infoType !== "spells") {
        dndAddress = infoType;
        localAddress = infoType;
      } else {
        dndAddress = `classes/${formData.class}/levels/${spellLevel}/spells`;
        localAddress = infoType;
      }

      let tempInfoList;

      fetch(`https://www.dnd5eapi.co/api/${dndAddress}`)
        .then((response) => response.json())
        .then((data) => {
          tempInfoList = data.results;
          secondFetch();
        })
        .catch((error) => window.alert(error));

      function secondFetch() {
        fetch(`http://localhost:8001/${localAddress}`)
          .then((response) => response.json())
          .then((data) => {
            setMoreInfoDetails({
              ...moreInfoDetails,
              iconList: data,
              infoList: tempInfoList,
              readyToLoad: true,
            });
          })
          .catch((error) => window.alert(error));
      }
    }
  }, [getInfo]);

  function handleLevelChange(e) {
    setMoreInfoDetails({
      ...moreInfoDetails,
      spellLevel: parseInt(e.target.value),
    });
    setGetInfo((getInfo) => !getInfo);
  }

  // When a more info button is clicked this will set readyToLoad to false, clear infoList and iconList, and
  // switch the moreInfo state to match the clicked button.
  function handleInfoClick(e) {
    e.preventDefault();
    setMoreInfoDetails({
      ...moreInfoDetails,
      infoList: [],
      iconList: [],
      readyToLoad: false,
      infoType: e.target.name,
    });
    setGetInfo((getInfo) => !getInfo);
  }

  function handleGoBackClick(e) {
    e.preventDefault();
    setMoreInfoDetails({
      ...moreInfoDetails,
      displayDetails: false,
    });
  }

  // Checks if moreInfo is either "none" or if infoList doesn't match iconList. If both are not true, creates a card div for each of the items that
  // need to be rendered on the screen.

  function handleInfoCardClick(image, index) {
    setMoreInfoDetails({
      ...moreInfoDetails,
      detailImage: image,
      index: index,
      displayDetails: true,
    });
    // if (infoType === "races") {
    //   setDetailInfo(<RaceDetails image={image} race={index} />);
    // }
  }

  function MountInfoCardContainer() {
    if (infoType === "none") {
      return (
        <img
          className="more-info-details"
          src="https://external-preview.redd.it/y4qMZUqJjJmoSNQxAnRXFNuXqoF0TtdsfAkSkpb1RPg.jpg?auto=webp&s=8dbab7089b5170dfb2c545a7f722f09999fe7c03"
        />
      );
    } else if (!readyToLoad) {
      return <p>Loading...</p>;
    } else {
      return (
        <InfoCardContainer
          moreInfoDetails={moreInfoDetails}
          onClick={handleInfoCardClick}
        />
      );
    }
  }

  //////////////////////////////////////////
  // Handle Submit
  function handleSubmit(e) {
    e.preventDefault();

    if (editInfo === "none") {
      fetch("http://localhost:8001/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => onCreateCharacter(data))
        .catch((error) => window.alert(error));
      setFormData(defaultForm);
      history.push("/select");
    } else {
      fetch(`http://localhost:8001/characters/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => onEditCharacter(data))
        .catch((error) => window.alert(error));
      history.push(`/${saveDest}`);
    }
  }

  // FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM FORM
  ///////////////////////////////////////////////////////
  // The rendered page:
  return (
    <div id="character-creation">
      <div id="character-sheet">
        <h2>Character Sheet</h2>
        <form id="character-form" onSubmit={handleSubmit}>
          <fieldset>
            <h4>General Information</h4>
            {/* name */}
            <div>
              <label name="name">Name: </label>
              <input
                className="nameInput"
                type="text"
                name="name"
                placeholder="Enter Name Here"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <br />

            {/* health */}
            <div>
              <label name="name">Max HP: </label>
              <input
                className="numberInput"
                type="number"
                name="health"
                placeholder="Enter Max HP"
                onChange={handleChange}
                value={formData.health}
                style={{ "margin-right": "10px" }}
              />

              {/* AC */}
              <label name="ac">Armor Class (AC): </label>
              <input
                className="numberInput"
                type="number"
                name="ac"
                placeholder="Enter AC"
                onChange={handleChange}
                value={formData.ac}
                style={{ "margin-right": "10px" }}
              />

              {/* Speed */}
              <label name="ac">Speed: </label>
              <input
                className="numberInput"
                type="number"
                name="speed"
                placeholder="Enter Speed"
                onChange={handleChange}
                value={formData.speed}
              />
            </div>
            <br />

            {/* race inputs */}
            <div className="race-class">
              <div>
                <label name="race">Race: </label>
                <select
                  name="race"
                  onChange={handleChange}
                  value={formData.race}
                >
                  <option name="race" value="dragonborn">
                    Dragonborn
                  </option>
                  <option name="race" value="dwarf">
                    Dwarf
                  </option>
                  <option name="race" value="elf">
                    Elf
                  </option>
                  <option name="race" value="gnome">
                    Gnome
                  </option>
                  <option name="race" value="half-elf">
                    Half-Elf
                  </option>
                  <option name="race" value="Half-Orc">
                    Half-Orc
                  </option>
                  <option name="race" value="halfling">
                    Halfling
                  </option>
                  <option name="race" value="human">
                    Human
                  </option>
                  <option name="race" value="tiefling">
                    Tiefling
                  </option>
                </select>
                <button name="races" onClick={handleInfoClick}>
                  More Info
                </button>
              </div>

              {/* class inputs */}

              <div>
                <label name="class">Class: </label>
                <select
                  name="class"
                  onChange={handleChange}
                  value={formData.class}
                >
                  <option name="class" value="barbarian">
                    Barbarian
                  </option>
                  <option name="class" value="bard">
                    Bard
                  </option>
                  <option name="class" value="cleric">
                    Cleric
                  </option>
                  <option name="class" value="druid">
                    Druid
                  </option>
                  <option name="class" value="fighter">
                    Fighter
                  </option>
                  <option name="class" value="monk">
                    Monk
                  </option>
                  <option name="class" value="paladin">
                    Paladin
                  </option>
                  <option name="class" value="ranger">
                    Ranger
                  </option>
                  <option name="class" value="rogue">
                    Rogue
                  </option>
                  <option name="class" value="sorcerer">
                    Sorcerer
                  </option>
                  <option name="class" value="warlock">
                    Warlock
                  </option>
                  <option name="class" value="wizard">
                    Wizard
                  </option>
                </select>
                <button name="classes" onClick={handleInfoClick}>
                  More Info
                </button>
              </div>
            </div>
            <br />
          </fieldset>
          <br />

          {/* //////////////////////////////////////////// */}
          {/* Stat section */}
          <fieldset className="statSection">
            <div>
              <h4>Stats</h4>
            </div>
            <div className="statForm">
              {/* strength */}
              <fieldset className="statBlock">
                <legend>Strength (STR)</legend>
                <div id="strength">
                  <label name="strengthStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.strength)}
                  </p>
                </div>
              </fieldset>

              {/* dexterity */}
              <fieldset className="statBlock">
                <legend>Dexterity (DEX)</legend>
                <div>
                  <label name="dexterityStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="dexterity"
                    value={formData.dexterity}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.dexterity)}
                  </p>
                </div>
              </fieldset>

              {/* constitution */}
              <fieldset className="statBlock">
                <legend>Constitution (CON)</legend>
                <div>
                  <label name="constitutionStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="constitution"
                    value={formData.constitution}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.constitution)}
                  </p>
                </div>
              </fieldset>
              <br />

              {/* intelligence */}
              <fieldset className="statBlock">
                <legend>Intelligence (INT)</legend>
                <div>
                  <label name="intelligenceStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="intelligence"
                    value={formData.intelligence}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.intelligence)}
                  </p>
                </div>
              </fieldset>

              {/* wisdom */}
              <fieldset className="statBlock">
                <legend>Wisdom (WIS)</legend>
                <div>
                  <label name="wisdomStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="wisdom"
                    value={formData.wisdom}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.wisdom)}
                  </p>
                </div>
              </fieldset>

              {/* charisma */}
              <fieldset className="statBlock">
                <legend>Charisma (CHA)</legend>
                <div>
                  <label name="charsimaStat">Base Stat: </label>
                  <input
                    className="numberInput"
                    type="number"
                    name="charisma"
                    value={formData.charisma}
                    onChange={handleChange}
                  />
                  <br />
                  <p className="modifier">
                    Modifier: {calculateStatModifier(formData.charisma)}
                  </p>
                </div>
              </fieldset>
            </div>
            {/* More Info button */}
            <div>
              <button name="ability-scores" onClick={handleInfoClick}>
                More Info
              </button>
            </div>
          </fieldset>

          <br />

          {/* /////////////////////////////////////////////////////// */}
          {/* Spells list */}
          <fieldset>
            <h4>Spells</h4>

            <div>
              <input
                type="text"
                name="spell"
                placeholder="New Spell"
                value={addToList.spell}
                onChange={handleListChange}
              />
              <button onClick={handleAddToList} name="spellList">
                Add
              </button>

              <div>
                <p className="space-above">
                  class: {capitalizeFirstLetter(formData.class)}
                </p>
                <label name="level">Level: </label>
                <select
                  name="level"
                  value={spellLevel}
                  onChange={handleLevelChange}
                >
                  <option name="level" value="0">
                    0
                  </option>
                  <option name="level" value="1">
                    1
                  </option>
                  <option name="level" value="2">
                    2
                  </option>
                  <option name="level" value="3">
                    3
                  </option>
                  <option name="level" value="4">
                    4
                  </option>
                  <option name="level" value="5">
                    5
                  </option>
                  <option name="level" value="6">
                    6
                  </option>
                  <option name="level" value="7">
                    7
                  </option>
                  <option name="level" value="8">
                    8
                  </option>
                  <option name="level" value="9">
                    9
                  </option>
                </select>
                <button name="spells" onClick={handleInfoClick}>
                  More Info
                </button>
              </div>
            </div>
            <p
              className="space-above"
              style={{ "text-decoration": "underline" }}
            >
              Spell List
            </p>
            <ul className="formList">
              {formData.spellList.map((spell) => (
                <li key={spell}>{spell}</li>
              ))}
            </ul>
          </fieldset>
          <br />

          {/* /////////////////////////////////////////////////////// */}
          {/* Proficiencies selection */}
          <fieldset>
            <h4>
              Proficiency Bonus:{" "}
              <input
                className="numberInput"
                type="number"
                name="proficiencyBonus"
                value={formData.proficiencyBonus}
                onChange={handleChange}
              />
            </h4>
            <h4>Proficiencies</h4>
            <div>
              <input
                type="text"
                name="proficiency"
                placeholder="New Proficiency"
                value={addToList.proficiency}
                onChange={handleListChange}
              />
              <button onClick={handleAddToList} name="proficiencyList">
                Add
              </button>
              <button name="proficiencies" onClick={handleInfoClick}>
                More Info
              </button>
            </div>
            <p
              className="space-above"
              style={{ "text-decoration": "underline" }}
            >
              Proficiency List
            </p>
            <ul className="formList">
              {formData.proficiencyList.map((proficiency) => (
                <li key={proficiency}>{proficiency}</li>
              ))}
            </ul>
          </fieldset>
          <br />

          {/* /////////////////////////////////////////////////////// */}
          {/* Languages selection */}
          <fieldset>
            <h4>Languages</h4>
            <div>
              <input
                type="text"
                name="language"
                placeholder="New Language"
                value={addToList.language}
                onChange={handleListChange}
              />
              <button onClick={handleAddToList} name="languageList">
                Add
              </button>
              <button name="languages" onClick={handleInfoClick}>
                More Info
              </button>
            </div>
            <p
              className="space-above"
              style={{ "text-decoration": "underline" }}
            >
              Known Languages
            </p>
            <ul className="formList">
              {formData.languageList.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </fieldset>

          <br />

          {/* /////////////////////////////////////////////////////// */}
          {/* Character Details */}
          <fieldset>
            <h4>Character Details</h4>

            <div>
              {/* alignment */}
              <div>
                <label name="alignment">Alignment: </label>
                <input
                  className="textInput"
                  type="text"
                  name="alignment"
                  value={formData.alignment}
                  onChange={handleChange}
                />
                <button name="alignments" onClick={handleInfoClick}>
                  More Info
                </button>
              </div>

              {/* faith */}
              <div>
                <label name="faith">Faith: </label>
                <input
                  className="textInput"
                  type="text"
                  name="faith"
                  value={formData.faith}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

            <div>
              {/* gender */}
              <div>
                <label name="gender">Gender: </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option name="gender" value="Male">
                    Male
                  </option>
                  <option name="gender" value="Female">
                    Female
                  </option>
                  <option name="gender" value="Non-Binary">
                    Non-Binary
                  </option>
                </select>
              </div>

              {/* hair */}
              <div>
                <label name="hair">Hair: </label>
                <input
                  className="descriptionInput"
                  type="text"
                  name="hair"
                  value={formData.hair}
                  onChange={handleChange}
                />
              </div>

              {/* skin */}
              <div>
                <label name="skin">Skin: </label>
                <input
                  className="descriptionInput"
                  type="text"
                  name="skin"
                  value={formData.skin}
                  onChange={handleChange}
                />
              </div>

              {/* eyes */}
              <div>
                <label name="eyes">Eyes: </label>
                <input
                  className="descriptionInput"
                  type="text"
                  name="eyes"
                  value={formData.eyes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

            {/* height */}
            <div>
              <label name="height">Height: </label>
              <input
                className="numberInput"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            {/* weight */}
            <div>
              <label name="weight">Weight: </label>
              <input
                className="numberInput"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <br />

            {/* image input */}
            <div>
              <label name="image">Image: </label>
              <input
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            {/* background input */}
            <div>
              <label name="background">Background: </label>
              <input
                type="text"
                placeholder="Enter Background"
                name="background"
                value={formData.background}
                onChange={handleChange}
              />
            </div>
            <br />

            {/* backstory input */}
            <div>
              <label for="backstory">Backstory:</label>
              <br />
              <textarea
                id="backstory"
                name="backstory"
                onChange={handleChange}
                value={formData.backstory}
              ></textarea>
            </div>
          </fieldset>
          <br />

          {/* submit button */}
          <fieldset>
            <input
              type="submit"
              value={editInfo === "none" ? "Create Character" : "Save Edits"}
              className="submit"
            />
          </fieldset>
        </form>
      </div>
      <div id="moreInfo">
        <h2>More Info</h2>
        <div>
          {displayDetails ? (
            <DetailsContainer
              moreInfoDetails={moreInfoDetails}
              onClick={handleGoBackClick}
            />
          ) : (
            MountInfoCardContainer()
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCreator;
