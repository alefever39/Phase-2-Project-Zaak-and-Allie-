import { useEffect, useState } from "react";

function LanguageDetails({ moreInfoDetails }) {
  const [langInfo, setLangInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/languages/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setLangInfo(data);
        setReadyToLoad((readyToLoad) => (readyToLoad = true));
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  const typSpeak = langInfo["typical_speakers"].map((speaker) => (
    <li key={speaker}>{speaker}</li>
  ));

  return (
    <div id="lang-details">
      <h2>{langInfo.name}</h2>
      <p>Language type: {langInfo.type}</p>
      <p>Script: {langInfo.script ? langInfo.script : "None"}</p>
      <p className="space-above">Typical Speakers</p>
      <ul className="no-style-ul">{typSpeak}</ul>
    </div>
  );
}

export default LanguageDetails;
