import React from "react";
import "./css/Skills.css";

function Skills({ skills, onChange, craftingSkills = {}, onCraftingChange }) {
  const diceOptions = ["-","1d4", "1d6", "1d8", "1d10", "1d12"];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleCraftingChange = (e) => {
    const { name, checked } = e.target;
    onCraftingChange(name, checked);
  };

  return (
    <div className="skills-container">
      <div className="skills-title">Skills</div>

      {/* Strength-based Skills */}
      <div className="skill-category">
        <h3>Strength</h3>
        <label>
          Athletics:
          <select name="athletics" value={skills.athletics} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Agility-based Skills */}
      <div className="skill-category">
        <h3>Agility</h3>
        <label>
          Acrobatics:
          <select name="acrobatics" value={skills.acrobatics} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sleight of Hand:
          <select name="sleightOfHand" value={skills.sleightOfHand} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Stealth:
          <select name="stealth" value={skills.stealth} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Mind-based Skills */}
      <div className="skill-category">
        <h3>Mind</h3>
        <label>
          Arcane:
          <select name="arcane" value={skills.arcane} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Lore:
          <select name="lore" value={skills.lore} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Medicine:
          <select name="medicine" value={skills.medicine} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Naturalism:
          <select name="naturalism" value={skills.naturalism} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Perception:
          <select name="perception" value={skills.perception} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Willpower-based Skills */}
      <div className="skill-category">
        <h3>Willpower</h3>
        <label>
          Animal Handling:
          <select name="animalHandling" value={skills.animalHandling} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Deception:
          <select name="deception" value={skills.deception} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Insight:
          <select name="insight" value={skills.insight} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Intimidation:
          <select name="intimidation" value={skills.intimidation} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Performance:
          <select name="performance" value={skills.performance} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Persuasion:
          <select name="persuasion" value={skills.persuasion} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tradition:
          <select name="tradition" value={skills.tradition} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Fighting Skills */}
      <div className="skill-category">
        <h3>Fighting</h3>
        <label>
          Boxing:
          <select name="boxing" value={skills.boxing} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Bladed:
          <select name="bladed" value={skills.bladed} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Blunt:
          <select name="blunt" value={skills.blunt} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Bows:
          <select name="bows" value={skills.bows} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Crossbows:
          <select name="crossbows" value={skills.crossbows} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Swift:
          <select name="swift" value={skills.swift} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Religious Domains */}
      <div className="skill-category">
        <h3>Religious Domains</h3>
        <label>
          Death:
          <select name="death" value={skills.death} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Healing:
          <select name="healing" value={skills.healing} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Nature:
          <select name="nature" value={skills.nature} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Occult:
          <select name="occult" value={skills.occult} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Purity:
          <select name="purity" value={skills.purity} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          War:
          <select name="war" value={skills.war} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Arcane Domains */}
      <div className="skill-category">
        <h3>Arcane Domains</h3>
        <label>
          Alteration:
          <select name="alteration" value={skills.alteration} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Conjuration:
          <select name="conjuration" value={skills.conjuration} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Evocation:
          <select name="evocation" value={skills.evocation} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Hysterics:
          <select name="hysterics" value={skills.hysterics} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mysticism:
          <select name="mysticism" value={skills.mysticism} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Necromancy:
          <select name="necromancy" value={skills.necromancy} onChange={handleSelectChange}>
            {diceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Crafting Skills with tickboxes on the right */}
      <div className="skill-category">
        <h3>Crafting</h3>
        <label>
          Alchemy
          <input
            type="checkbox"
            name="alchemy"
            checked={craftingSkills.alchemy || false}
            onChange={handleCraftingChange}
            style={{ marginLeft: "10px" }} // Space between label and checkbox
          />
        </label>

        <label>
          Engineering
          <input
            type="checkbox"
            name="engineering"
            checked={craftingSkills.engineering || false}
            onChange={handleCraftingChange}
            style={{ marginLeft: "10px" }} // Space between label and checkbox
          />
        </label>

        <label>
          Smithing
          <input
            type="checkbox"
            name="smithing"
            checked={craftingSkills.smithing || false}
            onChange={handleCraftingChange}
            style={{ marginLeft: "10px" }} // Space between label and checkbox
          />
        </label>
      </div>
    </div>
  );
}

export default Skills;