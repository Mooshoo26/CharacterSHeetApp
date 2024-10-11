import React from "react";
import './css/Attributes.css';  // Import the Attributes-specific CSS

function Attributes({ attributes, onChange }) {
  const diceOptions = ["1d4", "1d6", "1d8", "1d10", "1d12"];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="attributes-container">
      <label>
        Strength:
        <select name="strength" value={attributes.strength} onChange={handleSelectChange}>
          {diceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Agility:
        <select name="agility" value={attributes.agility} onChange={handleSelectChange}>
          {diceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Endurance:
        <select name="endurance" value={attributes.endurance} onChange={handleSelectChange}>
          {diceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Mind:
        <select name="mind" value={attributes.mind} onChange={handleSelectChange}>
          {diceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Willpower:
        <select name="willpower" value={attributes.willpower} onChange={handleSelectChange}>
          {diceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Attributes;
