
import { useEffect, useState } from "react";
// import { Card, Form, Grid } from "semantic-ui-react";

function CharacterCreator() {
  const defaultForm = {
    name: "",
    health: 0,
    race: "Human",
    class: "Barbarian",
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    spellList: [],
    languageList: [],
    proficiencyList: [],
    background: "",
    backstory: "",
    gender: "Male",
    hair: "",
    skin: "",
    eyes: "",
    height: 0,
    weight: 0,
    image: "",
    alignment: "",
    faith: "",
  };
  const [formData, setFormData] = useState(defaultForm);
  const [addToList, setAddToList] = useState({
    spell: "",
    proficiency: "",
    language: "",
  });

  function calculateStatModifier(statLevel) {
    return Math.floor((statLevel - 10) / 2);
  }

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    fetch("http://localhost:8001/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => window.alert(error));
    setFormData(defaultForm);
  }

  return (
    <div>
      <form id="character-form" onSubmit={handleSubmit}>
        <fieldset>
          <h4>General Information</h4>
          {/* name */}
          <label name="name">Name: </label>
          <input
            className="nameInput"
            type="text"
            name="name"
            placeholder="Enter Name Here"
            onChange={handleChange}
            value={formData.name}
          />
          <br />
          <br />

          {/* health */}
          <label name="name">Max HP: </label>
          <input
            className="numberInput"
            type="number"
            name="health"
            placeholder="Enter Max HP"
            onChange={handleChange}
            value={formData.health}
          />
          <br />
          <br />

          {/* race inputs */}
          <label name="race">Race: </label>
          <select name="race" onChange={handleChange} value={formData.race}>
            <option name="race">Dwarf</option>
            <option name="race">Elf</option>
            <option name="race">Halfling</option>
            <option name="race">Human</option>
            <option name="race">Dragonborn</option>
            <option name="race">Gnome</option>
            <option name="race">Half-Elf</option>
            <option name="race">Half-Orc</option>
            <option name="race">Tiefling</option>
          </select>

          {/* class inputs */}
          <label name="class">Class: </label>
          <select name="class" onChange={handleChange} value={formData.class}>
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
          <br />
        </fieldset>
        <br />

        {/* Stat section */}
        <fieldset className="statSection">
          <h4>Stats</h4>
          <div className="statForm">
            <fieldset className="statBlock">
              <legend>Strength</legend>
              <label name="strengthStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
              />
              <br />
              <label name="strengthModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="strengthModifier"
                value={calculateStatModifier(formData.strength)}
              />
            </fieldset>
            <fieldset className="statBlock">
              <legend>Dexterity</legend>
              <label name="dexterityStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="dexterity"
                value={formData.dexterity}
                onChange={handleChange}
              />
              <br />
              <label name="dexterityModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="dexterityModifier"
                value={calculateStatModifier(formData.dexterity)}
              />
            </fieldset>
            <fieldset className="statBlock">
              <legend>Constitution</legend>
              <label name="constitutionStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="constitution"
                value={formData.constitution}
                onChange={handleChange}
              />
              <br />
              <label name="constitutionModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="constitutionModifier"
                value={calculateStatModifier(formData.constitution)}
              />
            </fieldset>
            <fieldset className="statBlock">
              <legend>Intelligence</legend>
              <label name="intelligenceStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="intelligence"
                value={formData.intelligence}
                onChange={handleChange}
              />
              <br />
              <label name="intelligenceModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="intelligenceModifier"
                value={calculateStatModifier(formData.intelligence)}
              />
            </fieldset>
            <fieldset className="statBlock">
              <legend>Wisdom</legend>
              <label name="wisdomStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="wisdom"
                value={formData.wisdom}
                onChange={handleChange}
              />
              <br />
              <label name="wisdomModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="wisdomModifier"
                value={calculateStatModifier(formData.wisdom)}
              />
            </fieldset>
            <fieldset className="statBlock">
              <legend>Charisma</legend>
              <label name="charsimaStat">Base Stat: </label>
              <input
                className="numberInput"
                type="number"
                name="charisma"
                value={formData.charisma}
                onChange={handleChange}
              />
              <br />
              <label name="charsimaModifier">Modifier: </label>
              <input
                type="number"
                className="numberInput"
                name="charsimaModifier"
                value={calculateStatModifier(formData.charisma)}
              />
            </fieldset>
          </div>
        </fieldset>

        <br />

        {/* Spells list */}
        <fieldset>
          <h4>Spells</h4>
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
          <ul>
            {formData.spellList.map((spell) => (
              <li key={spell}>{spell}</li>
            ))}
          </ul>
        </fieldset>
        <br />

        {/* Proficiencies selection */}
        <fieldset>
          <h4>Proficiencies</h4>
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
          <ul>
            {formData.proficiencyList.map((proficiency) => (
              <li key={proficiency}>{proficiency}</li>
            ))}
          </ul>
        </fieldset>
        <br />

        {/* Languages selection */}
        <fieldset>
          <h4>Languages</h4>
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
          <ul>
            {formData.languageList.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </fieldset>

        <br />

        {/* Character Details */}
        <fieldset>
          <h4>Character Details</h4>

          {/* alignment */}
          <label name="alignment">Alignment: </label>
          <input
            className="textInput"
            type="text"
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
          />

          {/* faith */}
          <label name="faith">Faith: </label>
          <input
            className="textInput"
            type="text"
            name="faith"
            value={formData.faith}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* gender */}
          <label name="gender">Gender: </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option name="gender">Male</option>
            <option name="gender">Female</option>
            <option name="gender">Non Binary</option>
          </select>

          {/* hair */}
          <label name="hair">Hair: </label>
          <input
            className="descriptionInput"
            type="text"
            name="hair"
            value={formData.hair}
            onChange={handleChange}
          />

          {/* skin */}
          <label name="skin">Skin: </label>
          <input
            className="descriptionInput"
            type="text"
            name="skin"
            value={formData.skin}
            onChange={handleChange}
          />

          {/* eyes */}
          <label name="eyes">Eyes: </label>
          <input
            className="descriptionInput"
            type="text"
            name="eyes"
            value={formData.eyes}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* height */}
          <label name="height">Height: </label>
          <input
            className="numberInput"
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />

          {/* weight */}
          <label name="weight">Weight: </label>
          <input
            className="numberInput"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* image input */}
          <label name="image">Image: </label>
          <input
            type="text"
            placeholder="Enter Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          {/* background input */}
          <label name="background">Background: </label>
          <input
            type="text"
            placeholder="Enter Background"
            name="background"
            value={formData.background}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* backstory input */}
          <label for="backstory">Backstory:</label>
          <textarea
            id="backstory"
            name="backstory"
            rows="20"
            cols="75"
            onChange={handleChange}
            value={formData.backstory}
          ></textarea>
        </fieldset>
        <br />

        {/* submit button */}
        <input type="submit" value="Create Character" />
      </form>
      <section></section>
    </div>
  );
}

export default CharacterCreator;

{
  /* <div>
<h3>Character Creator</h3>
<br />
<Form id="character-form">
  <Form.Input fluid label="Character Name" placeholder="Enter Name" />
  <h4>General Information</h4>
  <Grid width="3" id="generalInfo">
    <Grid.Row>
      <Grid.Column>
        <Form.Field label="Gender" control="select">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonBinary">Non Binary</option>
        </Form.Field>
      </Grid.Column>
      <Grid.Column>
        <Form.Field
          label="Height (ft)"
          control="input"
          type="number"
          step="any"
        />
      </Grid.Column>
      <Grid.Column>
        <Form.Field
          label="Weight (lbs)"
          control="input"
          type="number"
          step="any"
        />
      </Grid.Column>
    </Grid.Row>

    <Grid.Column>
      <Grid.Row>
        <Form.Input fluid label="Eye Color" placeholder="Marigold" />
      </Grid.Row>
    </Grid.Column>
  </Grid>
  <br />
  <label name="gender">Gender: </label>
  <select name="gender">
    <option name="gender">Male</option>
    <option name="gender">Female</option>
    <option name="gender">Non Binary</option>
  </select>
  <br />
  <label name="class">Race: </label>
  <select name="class">
    <option name="class">Dwarf</option>
    <option name="class">Elf</option>
    <option name="class">Halfling</option>
    <option name="class">Human</option>
    <option name="class">Dragonbon</option>
    <option name="class">Gnome</option>
    <option name="class">Half-Elf</option>
    <option name="class">Half-Orc</option>
    <option name="class">Tiefling</option>
  </select>
  <br />
  <label name="class">Class: </label>
  <select name="class" onChange={onClassChange} value={formData.class}>
    <option name="class" value="barbarian">
      Barbarian
    </option>
    <option name="class" value="bard">
      Bard
    </option>
    <option name="class">Cleric</option>
    <option name="class">Druid</option>
    <option name="class">Fighter</option>
    <option name="class">Monk</option>
    <option name="class">Paladin</option>
    <option name="class">Ranger</option>
    <option name="class">Rogue</option>
    <option name="class">Sorcerer</option>
    <option name="class">Warlock</option>
    <option name="class">Wizard</option>
  </select>
  <br />
  <label name="name">image: </label>
  <input type="text" placeholder="Enter Image URL" />
  <br />
  <label name="name">Max Hit Points: </label>
  <input type="text" placeholder="Enter Max HP" />
  <fieldset>
    <legend>Stats</legend>
    <fieldset>
      <legend>Strength: </legend>
      <label name="dexteritystat">Base Stat: </label>
      <input type="number" />
      <label name="strengthModifier">Modifier: </label>
      <input type="number" className="modifier" name="strengthModifier" />
    </fieldset>
    <fieldset>
      <legend>Dexterity: </legend>
      <label name="dexteritystat">Base Stat: </label>
      <input type="number" />
      <label name="dexterityModifier">Modifier: </label>
      <input
        type="number"
        className="modifier"
        name="dexterityModifier"
      />
    </fieldset>
    <br />

    <fieldset>
      <legend>Spells</legend>
      <label name="spellLevel">Level: </label>
      <select
        name="spellLevel"
        onChange={onSpellLevelChange}
        value={spellLevel}
      >
        <option name="spellLevel">-</option>
        <option name="spellLevel">0</option>
        <option name="spellLevel">1</option>
        <option name="spellLevel">2</option>
        <option name="spellLevel">3</option>
        <option name="spellLevel">4</option>
        <option name="spellLevel">5</option>
        <option name="spellLevel">6</option>
        <option name="spellLevel">7</option>
        <option name="spellLevel">8</option>
        <option name="spellLevel">9</option>
      </select>
      <ul>
        Spell List:
        {spells}
      </ul>
    </fieldset>
  </fieldset>
</Form>
<Card>
  <h3>Testing</h3>
</Card>
</div> */
}
