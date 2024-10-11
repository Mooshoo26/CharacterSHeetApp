import React from "react";
import "./css/SecondaryAttributes.css";

function SecondaryAttributes({
  health,
  maxHealth,
  exertion,
  maxExertion,
  fatigue,
  durability,
  maxDurability,
  evasion,
  defence,
  movement,
  onHealthChange,
  onExertionChange,
  onFatigueChange,
  onDurabilityChange
}) {
  return (
    <div className="secondary-attributes-container">
      {/* Health */}
      <div>
        <label>Health (Max: {maxHealth})</label>
        <div className="numeric-control-container">
          <button onClick={() => onHealthChange(health - 1)} disabled={health <= -maxHealth}>
            -
          </button>
          <input type="number" value={health} readOnly />
          <button onClick={() => onHealthChange(health + 1)} disabled={health >= maxHealth}>
            +
          </button>
        </div>
      </div>

      {/* Exertion */}
      <div>
        <label>Exertion (Max: {maxExertion})</label>
        <div className="numeric-control-container">
          <button onClick={() => onExertionChange(exertion - 1)} disabled={exertion <= 0}>
            -
          </button>
          <input type="number" value={exertion} readOnly />
          <button onClick={() => onExertionChange(exertion + 1)} disabled={exertion >= maxExertion}>
            +
          </button>
        </div>
      </div>

      {/* Fatigue */}
      <div>
        <label>Fatigue</label>
        <div className="numeric-control-container">
          <button onClick={() => onFatigueChange(fatigue - 1)} disabled={fatigue <= 0}>
            -
          </button>
          <input type="number" value={fatigue} readOnly />
          <button onClick={() => onFatigueChange(fatigue + 1)}>
            +
          </button>
        </div>
      </div>

      {/* Evasion */}
      <div>
        <label>Evasion</label>
        <div className="attribute-display">{evasion}</div>
      </div>

      {/* Durability */}
      <div>
        <label>Durability (Max: {maxDurability})</label>
        <div className="numeric-control-container">
          <button onClick={() => onDurabilityChange(durability - 1)} disabled={durability <= 0}>
            -
          </button>
          <input type="number" value={durability} readOnly />
          <button onClick={() => onDurabilityChange(durability + 1)} disabled={durability >= maxDurability}>
            +
          </button>
        </div>
      </div>

      {/* Defence */}
      <div>
        <label>Defence</label>
        <div className="attribute-display">{defence}</div>
      </div>

      {/* Movement */}
      <div>
        <label>Movement (m)</label>
        <div className="attribute-display">{movement}</div>
      </div>
    </div>
  );
}

export default SecondaryAttributes;
