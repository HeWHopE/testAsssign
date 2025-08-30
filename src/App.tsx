import "./App.css";
import { useState } from "react";
import { planets, moons } from "./data";

function App() {
  const [selectedMoons, setSelectedMoons] = useState<Record<number, number[]>>(
    {}
  );

  const handleMoonClick = (planetId: number, moonId: number) => {
    setSelectedMoons((prev) => ({
      ...prev,
      [planetId]: prev[planetId]?.includes(moonId)
        ? prev[planetId].filter((id) => id !== moonId)
        : [...(prev[planetId] || []), moonId],
    }));
  };

  return (
    <div className="container">
      {planets.map((planet) => {
        const activeMoons = selectedMoons[planet.id] || [];
        return (
          <div key={planet.id} className="planet-row">
            <div
              className="planet-wrapper"
              style={{
                width: 100 + activeMoons.length * 20 + "px",
                height: 100 + activeMoons.length * 20 + "px",
              }}
            >
              <div className="planet">
                {planet.title} {activeMoons.length}
              </div>

              {activeMoons.map((_, i) => (
                <div
                  key={i}
                  className="ring"
                  style={{
                    width: 100 + (i + 1) * 20 + "px",
                    height: 100 + (i + 1) * 20 + "px",
                  }}
                />
              ))}
            </div>

            <div className="moons">
              {moons
                .filter((m) => m.planetId === planet.id)
                .map((moon) => (
                  <div
                    key={moon.id}
                    className={`moon ${
                      activeMoons.includes(moon.id) ? "active-moon" : ""
                    }`}
                    onClick={() => handleMoonClick(planet.id, moon.id)}
                  >
                    {moon.title}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
