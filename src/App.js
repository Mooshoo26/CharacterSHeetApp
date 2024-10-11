import React, { useState, useEffect } from "react";
import Attributes from "./components/Attributes";
import InfoBar from "./components/InfoBar";
import SecondaryAttributes from "./components/SecondaryAttributes";
import Skills from "./components/Skills";
import Traits from "./components/Traits";
import Spells from "./components/Spells";
import Inventory from "./components/Inventory";
import "./App.css";

function App() {
  // Load data from localStorage if it exists
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("characterSheetData");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  const initialData = loadFromLocalStorage() || {
    character: {
      name: "",
      parentRace1: "Elf 1",
      parentRace2: "Elf 1",
      upbringing: "Commoner", // Default upbringing
      advancementPoints: 0,
      strength: "1d4",
      agility: "1d4",
      endurance: "1d4",
      mind: "1d4",
      willpower: "1d4",
      health: 12,
      exertion: 6,
      fatigue: 0,
      durability: 0,
      maxDurability: 0,
      evasion: 7,
      defence: 0,
      movement: 12,
    },
    skills: {
      athletics: "-",
      acrobatics: "-",
      sleightOfHand: "-",
      stealth: "-",
      arcane: "-",
      lore: "-",
      medicine: "-",
      naturalism: "-",
      perception: "-",
      animalHandling: "-",
      deception: "-",
      insight: "-",
      intimidation: "-",
      performance: "-",
      persuasion: "-",
      tradition: "-",
      boxing: "-",
      bladed: "-",
      blunt: "-",
      bows: "-",
      crossbows: "-",
      swift: "-",
      death: "-",
      healing: "-",
      nature: "-",
      occult: "-",
      purity: "-",
      war: "-",
      alteration: "-",
      conjuration: "-",
      evocation: "-",
      hysterics: "-",
      mysticism: "-",
      necromancy: "-",
    },
    craftingSkills: {
      alchemy: false,
      engineering: false,
      smithing: false,
    },
    spells: [],
    traits: [],
    inventory: {
      leftWeapon: null,
      rightWeapon: null,
      armor: null,
      carriedItems: "",
    },
  };

  const [character, setCharacter] = useState(initialData.character);
  const [skills, setSkills] = useState(initialData.skills);
  const [craftingSkills, setCraftingSkills] = useState(initialData.craftingSkills);
  const [spells, setSpells] = useState(initialData.spells);
  const [traits, setTraits] = useState(initialData.traits);
  const [inventory, setInventory] = useState(initialData.inventory);

  // Define attributeValues to map dice to numeric values
  const attributeValues = {
    "1d4": 4,
    "1d6": 6,
    "1d8": 8,
    "1d10": 10,
    "1d12": 12,
  };

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      character,
      skills,
      craftingSkills,
      spells,
      traits,
      inventory,
    };
    localStorage.setItem("characterSheetData", JSON.stringify(dataToSave));
  }, [character, skills, craftingSkills, spells, traits, inventory]);

  // Update secondary attributes dynamically when primary attributes change
  useEffect(() => {
    const maxHealth = calculateMaxHealth();
    const maxExertion = calculateMaxExertion();
    const evasion = calculateEvasion();

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: Math.min(prevCharacter.health, maxHealth),
      exertion: Math.min(prevCharacter.exertion, maxExertion),
      evasion,
    }));
  }, [character.strength, character.endurance, character.agility]);

  // Check if either parent race is "Elf 1" to update movement
  useEffect(() => {
    if (character.parentRace1 === "Elf 1" || character.parentRace2 === "Elf 1") {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        movement: 14,
      }));
    } else {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        movement: 12,
      }));
    }
  }, [character.parentRace1, character.parentRace2]);

  useEffect(() => {
    const baseEvasion = Math.floor(attributeValues[character.agility] / 2) + 4;
  
    const leftWeaponName = inventory.leftWeapon ? inventory.leftWeapon.name : null;
    const rightWeaponName = inventory.rightWeapon ? inventory.rightWeapon.name : null;
  
    const shieldBonus =
      (leftWeaponName === "Shield" || leftWeaponName === "Buckler" ||
       rightWeaponName === "Shield" || rightWeaponName === "Buckler") ? 1 : 0;
  
    const armorName = inventory.armor ? inventory.armor.name : null;
    const armorPenalty =
      (armorName === "Chain" || armorName === "Scale" || armorName === "Plate") ? -1 : 0;
  
    const newEvasion = baseEvasion + shieldBonus + armorPenalty;
  
    if (character.evasion !== newEvasion) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        evasion: newEvasion,
      }));
    }
  }, [inventory.leftWeapon, inventory.rightWeapon, inventory.armor, character.agility, attributeValues]);

  // Update defense and durability from armor selection
  useEffect(() => {
    if (inventory.armor) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        defence: inventory.armor.defence,
        durability: inventory.armor.durability,
        maxDurability: inventory.armor.durability,
      }));
    }
  }, [inventory]);

  // Calculate max health based on Endurance * 2 + Strength
  const calculateMaxHealth = () => {
    const enduranceValue = attributeValues[character.endurance];
    const strengthValue = attributeValues[character.strength];
    return enduranceValue * 2 + strengthValue;
  };

  // Calculate max exertion based on Endurance
  const calculateMaxExertion = () => {
    return attributeValues[character.endurance];
  };

  // Calculate evasion based on (Agility / 2) + 4
  const calculateEvasion = () => {
    return Math.floor(attributeValues[character.agility] / 2) + 4;
  };

  const handleSave = async () => {
    try {
      const data = {
        character,
        skills,
        craftingSkills,
        spells,
        traits,
        inventory,
      };
      const json = JSON.stringify(data, null, 2);

      if ("showSaveFilePicker" in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `${character.name || "character"}.json`,
          types: [
            {
              description: "JSON file",
              accept: { "application/json": [".json"] },
            },
          ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(new Blob([json], { type: "application/json" }));
        await writable.close();
      } else {
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${character.name || "character"}.json`;
        link.click();
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleLoad = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setCharacter(data.character);
      setSkills(data.skills);
      setCraftingSkills(data.craftingSkills);
      setSpells(data.spells || []);
      setTraits(data.traits || []);
      setInventory(
        data.inventory || {
          leftWeapon: null,
          rightWeapon: null,
          armor: null,
          carriedItems: "",
        }
      );
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="App">
      <h1>Character Sheet</h1>

      <InfoBar
        character={character}
        onNameChange={(newName) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            name: newName,
          }))
        }
        onRaceChange={(name, value) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: value,
          }))
        }
        onUpbringingChange={(upbringing) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            upbringing,
          }))
        }
        onAdvancementChange={(newPoints) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            advancementPoints: Math.max(newPoints, 0),
          }))
        }
      />

      <Attributes attributes={character} onChange={(name, value) =>
        setCharacter((prevCharacter) => ({
          ...prevCharacter,
          [name]: value,
        }))
      } />

      <SecondaryAttributes
        health={character.health}
        maxHealth={calculateMaxHealth()}
        exertion={character.exertion}
        maxExertion={calculateMaxExertion()}
        fatigue={character.fatigue}
        durability={character.durability}
        maxDurability={character.maxDurability}
        evasion={character.evasion}
        defence={character.defence}
        movement={character.movement}
        onDurabilityChange={(newValue) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            durability: Math.max(Math.min(newValue, character.maxDurability), 0),
          }))
        }
        onHealthChange={(newValue) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            health: Math.max(Math.min(newValue, calculateMaxHealth()), -calculateMaxHealth()),
          }))
        }
        onExertionChange={(newValue) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            exertion: Math.max(Math.min(newValue, calculateMaxExertion()), 0),
          }))
        }
        onFatigueChange={(newValue) =>
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            fatigue: Math.max(newValue, 0),
          }))
        }
      />

      <Skills
        skills={skills}
        onChange={(name, value) =>
          setSkills((prevSkills) => ({
            ...prevSkills,
            [name]: value,
          }))
        }
        craftingSkills={craftingSkills}
        onCraftingChange={(name, checked) =>
          setCraftingSkills((prevSkills) => ({ ...prevSkills, [name]: checked }))
        }
      />

      <Traits traits={traits} onTraitsChange={setTraits} />
      <Spells spells={spells} onSpellsChange={setSpells} />
      <Inventory inventory={inventory} onInventoryChange={(newInventory) =>
        setInventory((prevInventory) => ({
          ...prevInventory,
          ...newInventory,
        }))
      } />

      {/* Save and Load Buttons */}
      <div className="save-load-buttons">
        <button onClick={handleSave}>Save Character</button>
        <input
          type="file"
          accept="application/json"
          onChange={handleLoad}
          style={{ display: "inline-block", marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}

export default App;