import RaceDetails from "./RaceDetails";
import { useEffect, useState } from "react";

function InfoCardContainer({ moreInfoDetails, onClick }) {
  const { infoType, infoList, iconList, spellLevel, readyToLoad } =
    moreInfoDetails;

  function handleClick(image, index) {
    onClick(image, index);
  }

  let cards = infoList.map((item) => {
    let image;

    if (iconList.length > 1) {
      image = iconList.find((icon) => icon.name === item.name).image;
    } else {
      image = iconList[0].image;
    }

    return (
      <div
        key={item.index}
        className="info-card"
        onClick={() => handleClick(image, item.index)}
      >
        <img src={image} alt={item.name}></img>
        <h3>{item.name}</h3>
      </div>
    );
  });

  // if (infoType === "none") {
  //   return (
  //     <img
  //       className="more-info-details"
  //       src="https://external-preview.redd.it/y4qMZUqJjJmoSNQxAnRXFNuXqoF0TtdsfAkSkpb1RPg.jpg?auto=webp&s=8dbab7089b5170dfb2c545a7f722f09999fe7c03"
  //     />
  //   );
  // }

  return <div className="info-card-container">{cards}</div>;
}

export default InfoCardContainer;
