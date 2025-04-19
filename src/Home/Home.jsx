import React from "react";
import "./home.scss";
import HomeImage from "./HomeImage/HomeImage";
import ArchaeologicalItem from "../Components/ArchaeologicalItem/ArchaeologicalItem";
import WeatherApp from "../Components/WeatherApp/WeatherApp";

function Home({ searchValue }) {
  console.log(searchValue, "searchValue wwwwwwwww");

  return (
    <div>
      <HomeImage />
      <ArchaeologicalItem />
      {/* <WeatherApp /> */}
    </div>
  );
}

export default Home;
