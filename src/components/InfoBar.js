import React, { useState, useEffect } from "react";
import "./css/InfoBar.css";
import parentRacesData from "./data/parentRaces.json";
import upbringingsData from "./data/upbringings.json"; // Assuming upbringings are stored in a JSON file

function InfoBar({ character, onNameChange, onAdvancementChange, onRaceChange, onUpbringingChange }) {
  const [parentRaces, setParentRaces] = useState([]);
  const [upbringings, setUpbringings] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", position: { top: 0, left: 0 } });

  // Load parent races and upbringings data from JSON files
  useEffect(() => {
    setParentRaces(parentRacesData);
    setUpbringings(upbringingsData);
  }, []);

  // Handle name change
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  // Handle advancement change
  const handleAdvancementChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    onAdvancementChange(value);
  };

  // Handle race change
  const handleRaceChange = (e) => {
    const { name, value } = e.target;
    onRaceChange(name, value);
  };

  // Handle upbringing change
  const handleUpbringingChange = (e) => {
    onUpbringingChange(e.target.value);
  };

  // Handle tooltip display on hover for parent races and upbringing
  const handleMouseOver = (e, type, value) => {
    let content = "";
    if (type === "race") {
      const raceInfo = parentRaces.find((r) => r.name === value);
      content = raceInfo ? raceInfo.effect : "";
    } else if (type === "upbringing") {
      const upbringingInfo = upbringings.find((u) => u.name === value);
      content = upbringingInfo ? upbringingInfo.description : "";
    }

    const { bottom, left } = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content,
      position: { top: bottom + window.scrollY + 5, left: left + window.scrollX },
    });
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="character-info-bar">
      <div className="name-section">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={character.name}
            placeholder="Enter character's name"
            onChange={handleNameChange}
          />
        </label>
      </div>

      <div className="parent-races-section">
        <label>
          Parent Race 1:
          <select
            name="parentRace1"
            value={character.parentRace1}
            onChange={handleRaceChange}
            onMouseOver={(e) => handleMouseOver(e, "race", character.parentRace1)}
            onMouseOut={handleMouseOut}
          >
            {parentRaces.map((race) => (
              <option key={race.name} value={race.name}>
                {race.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Parent Race 2:
          <select
            name="parentRace2"
            value={character.parentRace2}
            onChange={handleRaceChange}
            onMouseOver={(e) => handleMouseOver(e, "race", character.parentRace2)}
            onMouseOut={handleMouseOut}
          >
            {parentRaces.map((race) => (
              <option key={race.name} value={race.name}>
                {race.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="upbringing-section">
        <label>
          Upbringing:
          <select
            name="upbringing"
            value={character.upbringing}
            onChange={handleUpbringingChange}
            onMouseOver={(e) => handleMouseOver(e, "upbringing", character.upbringing)}
            onMouseOut={handleMouseOut}
          >
            {upbringings.map((upbringing) => (
              <option key={upbringing.name} value={upbringing.name}>
                {upbringing.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="advancement-points-section">
        <label>
          AP:
          <input
            type="number"
            name="advancementPoints"
            value={character.advancementPoints}
            onChange={handleAdvancementChange}
            min={0}
            step={1}
          />
        </label>
      </div>

      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: tooltip.position.top,
            left: tooltip.position.left,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

export default InfoBar;
