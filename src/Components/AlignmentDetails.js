import { useEffect, useState } from "react";

function AlignmentDetails({ moreInfoDetails }) {
  const [alignInfo, setAlignInfo] = useState({});
  const [readyToLoad, setReadyToLoad] = useState(false);

  const { index } = moreInfoDetails;

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/alignments/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setAlignInfo(data);
        setReadyToLoad((readyToLoad) => (readyToLoad = true));
      })
      .catch((error) => window.alert(error));
  }, []);

  if (!readyToLoad) {
    return <p>Loading...</p>;
  }

  return (
    <div id="lang-details">
      <h2>
        {alignInfo.name} ({alignInfo.abbreviation})
      </h2>
      <p>Description</p>
      <p>{alignInfo.desc}</p>
    </div>
  );
}

export default AlignmentDetails;
