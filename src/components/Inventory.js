import React, { useState, useEffect } from "react";
import weaponsData from "./data/weapons.json"; // Assuming this JSON file contains weapons info
import armorData from "./data/armor.json"; // Assuming this JSON file contains armor info
import "./css/Inventory.css"; // Import the updated CSS

function Inventory({ inventory, onInventoryChange }) {
  const [selectedLeftWeapon, setSelectedLeftWeapon] = useState(inventory.leftWeapon);
  const [selectedRightWeapon, setSelectedRightWeapon] = useState(inventory.rightWeapon);
  const [selectedArmor, setSelectedArmor] = useState(inventory.armor);
  const [carriedItems, setCarriedItems] = useState(inventory.carriedItems);

  // Update state when inventory changes (e.g., when data is loaded)
  useEffect(() => {
    setSelectedLeftWeapon(inventory.leftWeapon);
    setSelectedRightWeapon(inventory.rightWeapon);
    setSelectedArmor(inventory.armor);
    setCarriedItems(inventory.carriedItems);
  }, [inventory]);

  // Handle weapon and armor selections
  // Inside Inventory Component

const handleWeaponChange = (hand, weaponName) => {
  const weapon = weaponsData.find((w) => w.name === weaponName);
  if (hand === "left") {
    setSelectedLeftWeapon(weapon);
    onInventoryChange({
      ...inventory,
      leftWeapon: weapon,
      rightWeapon: selectedRightWeapon,
    });
  } else {
    setSelectedRightWeapon(weapon);
    onInventoryChange({
      ...inventory,
      leftWeapon: selectedLeftWeapon,
      rightWeapon: weapon,
    });
  }
};


  const handleArmorChange = (armorName) => {
    const armor = armorData.find((a) => a.name === armorName);
    setSelectedArmor(armor);
    onInventoryChange({ ...inventory, armor: armor });
  };

  const handleCarriedItemsChange = (e) => {
    setCarriedItems(e.target.value);
    onInventoryChange({ ...inventory, carriedItems: e.target.value });
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      {/* Weapon Selection */}
      <div className="weapon-selection">
        <h3>Weapons</h3>
        <label>
          Left Hand:
          <select value={selectedLeftWeapon?.name || ""} onChange={(e) => handleWeaponChange("left", e.target.value)}>
            <option value="">--Select Weapon--</option>
            {weaponsData.map((weapon) => (
              <option key={weapon.name} value={weapon.name}>
                {weapon.name} (Damage: {weapon.damage}, Skill: {weapon.skill}, Cost: {weapon.cost}, Keywords: {weapon.keywords.join(", ")})
              </option>
            ))}
          </select>
        </label>

        <label>
          Right Hand:
          <select value={selectedRightWeapon?.name || ""} onChange={(e) => handleWeaponChange("right", e.target.value)}>
            <option value="">--Select Weapon--</option>
            {weaponsData.map((weapon) => (
              <option key={weapon.name} value={weapon.name}>
                {weapon.name} (Damage: {weapon.damage}, Skill: {weapon.skill}, Cost: {weapon.cost}, Keywords: {weapon.keywords.join(", ")})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Armor Selection */}
      <div className="armor-selection">
        <h3>Armor</h3>
        <label>
          Armor:
          <select value={selectedArmor?.name || ""} onChange={(e) => handleArmorChange(e.target.value)}>
            <option value="">--Select Armor--</option>
            {armorData.map((armor) => (
              <option key={armor.name} value={armor.name}>
                {armor.name} (Defence: {armor.defence}, Durability: {armor.durability}, Cost: {armor.cost})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Carried Items */}
      <div className="carried-items">
        <h3>Carried Items</h3>
        <textarea
          value={carriedItems}
          onChange={handleCarriedItemsChange}
          placeholder="List what your character is carrying..."
        />
      </div>
    </div>
  );
}

export default Inventory;
