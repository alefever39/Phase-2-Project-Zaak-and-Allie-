import { useEffect, useState } from "react";

function ClassDetails({ moreInfoDetails }) {
  const [classInfo, setClassInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/classes/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setClassInfo(data);
        setReadyToLoad(true);
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  const profChoices = classInfo["proficiency_choices"].map(
    (choiceList, index) => {
      return (
        <div key={index}>
          <p>Choose {choiceList.choose} from the following:</p>
          <ul className="profList">
            {choiceList.from.map((prof) => (
              <li key={prof.name}>{prof.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  );

  const profGiven = classInfo["proficiencies"].map((prof) => {
    return <li key={prof.index}>{prof.name}</li>;
  });

  const profSaveThrow = classInfo["saving_throws"].map((prof) => {
    return <li key={prof.index}>{prof.name} saving throws</li>;
  });

  return (
    <div id="class-details">
      <h2>{classInfo.name}</h2>
      <p>Hit Die: {classInfo["hit_die"]}</p>
      <div id="profs">
        <h4>Proficiencies:</h4>
        {profChoices}
        <div>
          <p>You are proficient in:</p>
          <ul className="profList">
            {profGiven}
            {profSaveThrow}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClassDetails;
