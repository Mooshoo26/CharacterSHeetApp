import React, { useState, useEffect } from "react";
import traitsData from "./data/traits.json"; // Assuming the JSON file is in the same folder
import "./css/Traits.css";

function Traits({ traits, onTraitsChange }) {
  const [selectedTrait, setSelectedTrait] = useState(null); // State for selected trait
  const [addedTraits, setAddedTraits] = useState(traits); // Initialize with the traits prop
  const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility

  // Update addedTraits when the prop changes (i.e., when data is loaded)
  useEffect(() => {
    setAddedTraits(traits);
  }, [traits]);

  // Handle trait selection
  const handleTraitChange = (e) => {
    const traitName = e.target.value;
    const trait = traitsData.find((t) => t.name === traitName);
    setSelectedTrait(trait);
  };

  // Handle adding trait to the character sheet
  const handleAddTrait = () => {
    if (selectedTrait && !addedTraits.find(t => t.name === selectedTrait.name)) {
      const updatedTraits = [...addedTraits, selectedTrait];
      setAddedTraits(updatedTraits);
      onTraitsChange(updatedTraits); // Inform the parent component about the added traits
    }
  };

  // Handle removing trait from the character sheet
  const handleRemoveTrait = (traitToRemove) => {
    const updatedTraits = addedTraits.filter((trait) => trait.name !== traitToRemove.name);
    setAddedTraits(updatedTraits);
    onTraitsChange(updatedTraits); // Inform the parent component about the updated traits
  };

  // Handle showing the modal for the selected trait
  const showModal = (trait) => {
    setSelectedTrait(trait);
    setModalVisible(true);
  };

  // Handle hiding the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="traits-container">
      <h2>Traits</h2>

      {/* Searchable Dropdown and Add Button */}
      <div className="traits-actions">
        <select onChange={handleTraitChange}>
          <option value="">--Select a Trait--</option>
          {traitsData.map((trait) => (
            <option key={trait.name} value={trait.name}>
              {trait.name}
            </option>
          ))}
        </select>

        {selectedTrait && (
          <button className="add-trait-btn" onClick={handleAddTrait}>Add Trait</button>
        )}
      </div>

      {/* List of Added Traits */}
      {addedTraits.length > 0 && (
        <div>
          <h3>Added Traits</h3>
          <ul className="added-traits-list">
            {addedTraits.map((trait) => (
              <li key={trait.name}>
                <div>
                  <strong>{trait.name}</strong> <br />
                  Cost: {trait.cost} <br />
                  Prerequisites: {trait.prerequisites.length > 0 ? trait.prerequisites.join(", ") : "None"}
                </div>
                <div>
                  <button className="remove-trait-btn" onClick={() => handleRemoveTrait(trait)}>
                    Remove
                  </button>
                  <button className="view-trait-btn" onClick={() => showModal(trait)}>
                    View Description
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal for Trait Description */}
      {modalVisible && selectedTrait && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{selectedTrait.name}</h3>
            <p><strong>Cost:</strong> {selectedTrait.cost}</p>
            <p><strong>Prerequisites:</strong> {selectedTrait.prerequisites.length > 0 ? selectedTrait.prerequisites.join(", ") : "None"}</p>
            <p>{selectedTrait.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Traits;
