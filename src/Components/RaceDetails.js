import { useEffect, useState } from "react";

function RaceDetails({ moreInfoDetails }) {
  const [raceInfo, setRaceInfo] = useState({});

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/races/${index}`)
      .then((response) => response.json())
      .then((data) => setRaceInfo(data))
      .catch((error) => window.alert(error));
  }, []);

  return (
    <div id="race-details">
      <h2>{raceInfo.name}</h2>
      <p>Speed: {raceInfo.speed}</p>
      <p>Size: {raceInfo.size}</p>
      <p>Size Description: </p>
      <p>{raceInfo["size_description"]}</p>
    </div>
  );
}

export default RaceDetails;
