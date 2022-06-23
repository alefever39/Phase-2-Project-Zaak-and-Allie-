import { useEffect, useState } from "react";

function StatDetails({ moreInfoDetails }) {
  const [statInfo, setStatInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/ability-scores/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setStatInfo(data);
        setReadyToLoad((readyToLoad) => (readyToLoad = true));
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  const skills = statInfo.skills.map((skill) => (
    <li key={skill.index}>{skill.name}</li>
  ));

  return (
    <div id="race-details">
      <h2>{statInfo["full_name"]}</h2>
      <p>Description</p>
      <p>{statInfo.desc}</p>
      <p className="space-above">Skills affected by this stat</p>
      <ul className="profList">{skills}</ul>
    </div>
  );
}

export default StatDetails;
