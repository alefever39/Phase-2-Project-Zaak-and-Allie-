import { useEffect, useState } from "react";

function SpellDetails({ moreInfoDetails }) {
  const [spellInfo, setSpellInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/spells/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setSpellInfo(data);
        setReadyToLoad((readyToLoad) => (readyToLoad = true));
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  let spellLevelDamage;
  if (spellInfo.damage) {
    if (spellInfo.damage["damage_at_character_level"]) {
      const keys = Object.keys(spellInfo.damage["damage_at_character_level"]);
      spellLevelDamage = keys.map((key) => (
        <li key={key}>
          Level {key}: {spellInfo.damage["damage_at_character_level"][key]}
        </li>
      ));
    } else {
      const keys = Object.keys(spellInfo.damage["damage_at_slot_level"]);
      spellLevelDamage = keys.map((key) => (
        <li key={key}>
          Slot Level {key}: {spellInfo.damage["damage_at_slot_level"][key]}
        </li>
      ));
    }
  }

  return (
    <div id="spell-details">
      <div>
        <h2>{spellInfo.name}</h2>
        <p>Description</p>
        <p>{spellInfo.desc}</p>
        <p>At higher levels</p>
        <p>{spellInfo["higher_level"]}</p>
      </div>
      {spellInfo.concentration ? (
        <p className="space-above">Range: {spellInfo.range}</p>
      ) : null}
      {spellInfo.components ? (
        <p className="space-above">Components: {spellInfo.components}</p>
      ) : null}
      {spellInfo.material ? <p>Material: {spellInfo.material}</p> : null}
      {spellInfo.ritual ? <p>This is a ritual spell</p> : null}
      {spellInfo.duration ? <p>Duration: {spellInfo.duration}</p> : null}
      {spellInfo.concentration ? <p>This is a concentration spell</p> : null}
      {spellInfo["casting_time"] ? (
        <p>Casting time: {spellInfo["casting_time"]}</p>
      ) : null}
      {spellInfo.level ? <p>Spell level: {spellInfo.level}</p> : null}
      {spellInfo["attack_type"] ? (
        <p>Attack type: {spellInfo["attack_type"]}</p>
      ) : null}
      <div className="space-above">
        {spellInfo.damage ? (
          <p>Damage type: {spellInfo.damage["damage_type"].name}</p>
        ) : null}
        {spellInfo.damage ? (
          <div>
            <p>Damage at...</p>
            <ul className="no-style-ul">{spellLevelDamage}</ul>
          </div>
        ) : null}
        {spellInfo.dc ? (
          <p className="space-above">
            DC Type: {spellInfo.dc["dc_type"].name}, Success:{" "}
            {spellInfo.dc["dc_success"] === "none" ? (
              <span>No Effect</span>
            ) : (
              <span>{spellInfo.dc["dc_success"]} damage</span>
            )}
          </p>
        ) : null}
        {spellInfo["area_of_effect"] ? (
          <p>
            Area of effect: {spellInfo["area_of_effect"].size} foot{" "}
            {spellInfo["area_of_effect"].type}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default SpellDetails;
