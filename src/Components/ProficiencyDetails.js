import { useEffect, useState } from "react";

function ProficiencyDetails({ moreInfoDetails }) {
  const [profInfo, setProfInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/proficiencies/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setProfInfo(data);
        setReadyToLoad((readyToLoad) => (readyToLoad = true));
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  return (
    <div id="prof-details">
      <h2>{profInfo.name}</h2>
      <p>Proficiency type: {profInfo.type}</p>
    </div>
  );
}

export default ProficiencyDetails;
