import RaceDetails from "./RaceDetails";
import ClassDetails from "./ClassDetails";
import StatDetails from "./StatDetails";
import SpellDetails from "./SpellDetails";
import ProficiencyDetails from "./ProficiencyDetails";
import LanguageDetails from "./LanguageDetails";
import AlignmentDetails from "./AlignmentDetails";

function DetailsContainer({ moreInfoDetails, onClick }) {
  const { infoType, detailImage, index } = moreInfoDetails;
  let detailType;

  if (infoType === "races") {
    detailType = <RaceDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "classes") {
    detailType = <ClassDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "ability-scores") {
    detailType = <StatDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "spells") {
    detailType = <SpellDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "proficiencies") {
    detailType = <ProficiencyDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "languages") {
    detailType = <LanguageDetails moreInfoDetails={moreInfoDetails} />;
  } else if (infoType === "alignments") {
    detailType = <AlignmentDetails moreInfoDetails={moreInfoDetails} />;
  }

  return (
    <div id="details-container" onClick={onClick}>
      <img src={detailImage} alt={index} />
      {detailType}
    </div>
  );
}

export default DetailsContainer;
