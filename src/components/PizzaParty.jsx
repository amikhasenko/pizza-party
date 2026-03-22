import { useState, useEffect } from "react";

const PIZZAS = [
  {
    id: "margherita",
    name: "🧀",
    label: "Cheese Pizza",
    color: "#FF6B35",
    bgGradient: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
    emoji: "🍕",
    base: ["dough", "tomato", "cheese"],
    toppings: [],
    seasoning: ["olive-oil", "salt"],
  },
  {
    id: "veggie",
    name: "🥦",
    label: "Veggie Pizza",
    color: "#4CAF50",
    bgGradient: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    emoji: "🥗",
    base: ["dough", "tomato", "cheese"],
    toppings: ["tomatoes", "pepper", "broccoli"],
    seasoning: ["olive-oil", "salt", "black-pepper"],
  },
  {
    id: "tuna",
    name: "🐟",
    label: "Tuna Pizza",
    color: "#2196F3",
    bgGradient: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    emoji: "🐠",
    base: ["dough", "tomato", "cheese"],
    toppings: ["tuna", "onion-mix"],
    seasoning: ["olive-oil", "salt", "black-pepper"],
  },
  {
    id: "chicken",
    name: "🍗",
    label: "Chicken Pizza",
    color: "#FF9800",
    bgGradient: "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)",
    emoji: "🐔",
    base: ["dough", "tomato", "cheese"],
    toppings: ["chicken", "pepper", "tomatoes"],
    seasoning: ["olive-oil", "salt", "black-pepper"],
  },
  {
    id: "eggplant",
    name: "🍆",
    label: "Silly Eggplant",
    color: "#9C27B0",
    bgGradient: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
    emoji: "🤪",
    base: ["dough", "tomato", "cheese"],
    toppings: ["eggplant", "onion-mix"],
    seasoning: ["olive-oil", "salt", "black-pepper"],
    funny: true,
  },
  {
    id: "onion-boom",
    name: "💥",
    label: "Onion Boom!",
    color: "#F44336",
    bgGradient: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
    emoji: "😂",
    base: ["dough", "tomato", "cheese"],
    toppings: ["onion-mix", "onion-mix", "onion-mix"],
    seasoning: ["olive-oil", "salt", "black-pepper"],
    funny: true,
  },
];

const INGREDIENTS = {
  dough: { emoji: "🫓", label: "Dough" },
  tomato: { emoji: "🥫", label: "Tomato Sauce" },
  cheese: { emoji: "🧀", label: "Cheese" },
  tomatoes: { emoji: "🍅", label: "Tomatoes" },
  pepper: { emoji: "🫑", label: "Pepper" },
  "onion-mix": { emoji: "🧅", label: "Onions" },
  broccoli: { emoji: "🥦", label: "Broccoli" },
  tuna: { emoji: "🐟", label: "Tuna" },
  chicken: { emoji: "🍗", label: "Chicken" },
  eggplant: { emoji: "🍆", label: "Eggplant" },
  "olive-oil": { emoji: "🫒", label: "Olive Oil" },
  salt: { emoji: "🧂", label: "Salt" },
  "black-pepper": { emoji: "⚫", label: "Pepper" },
};

function BouncingEmoji({ emoji, delay, size = 64 }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: size,
        animation: `bounceIn 0.5s ${delay}s both, float 3s ${delay}s infinite ease-in-out`,
        cursor: "default",
        userSelect: "none",
      }}
    >
      {emoji}
    </span>
  );
}

function PizzaCard({ pizza, onClick, index }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: pizza.bgGradient,
        border: `4px solid ${pizza.color}`,
        borderRadius: 32,
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transform: pressed ? "scale(0.93)" : "scale(1)",
        boxShadow: pressed
          ? `0 2px 8px ${pizza.color}44`
          : `0 8px 24px ${pizza.color}33, 0 2px 8px ${pizza.color}22`,
        animation: `popIn 0.4s ${index * 0.08}s both ease-out`,
        minHeight: 160,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {pizza.funny && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: 22,
            animation: "wiggle 1s infinite",
          }}
        >
          ⭐
        </span>
      )}
      <span style={{ fontSize: 72, lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
        {pizza.emoji}
      </span>
      <span style={{ fontSize: 40, lineHeight: 1 }}>{pizza.name}</span>
    </button>
  );
}

function IngredientBubble({ ingredient, index, section }) {
  const [tapped, setTapped] = useState(false);
  const info = INGREDIENTS[ingredient];
  if (!info) return null;

  const sectionColors = {
    base: { bg: "#FFF9C4", border: "#FFD54F" },
    toppings: { bg: "#C8E6C9", border: "#66BB6A" },
    seasoning: { bg: "#FFCCBC", border: "#FF8A65" },
  };
  const colors = sectionColors[section] || sectionColors.base;

  return (
    <button
      onClick={() => setTapped(!tapped)}
      style={{
        background: tapped ? colors.border : colors.bg,
        border: `3px solid ${colors.border}`,
        borderRadius: 28,
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        cursor: "pointer",
        transition: "transform 0.15s ease, background 0.2s ease",
        transform: tapped ? "scale(1.08)" : "scale(1)",
        animation: `popIn 0.35s ${index * 0.07 + 0.15}s both ease-out`,
        minWidth: 100,
        minHeight: 110,
        WebkitTapHighlightColor: "transparent",
        boxShadow: tapped
          ? `0 0 0 4px ${colors.border}66, 0 4px 12px ${colors.border}44`
          : `0 3px 10px rgba(0,0,0,0.08)`,
      }}
    >
      <span style={{ fontSize: 52, lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
        {info.emoji}
      </span>
      {tapped && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#5D4037",
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
            textAlign: "center",
            animation: "popIn 0.2s ease-out",
          }}
        >
          {info.label}
        </span>
      )}
    </button>
  );
}

function SectionLabel({ emoji, color, delay = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        animation: `fadeSlideIn 0.4s ${delay}s both ease-out`,
      }}
    >
      <div
        style={{
          height: 3,
          flex: 1,
          maxWidth: 60,
          borderRadius: 2,
          background: color,
          opacity: 0.4,
        }}
      />
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <div
        style={{
          height: 3,
          flex: 1,
          maxWidth: 60,
          borderRadius: 2,
          background: color,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export default function PizzaParty() {
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [screen, setScreen] = useState("select");

  useEffect(() => {
    if (selectedPizza) setScreen("detail");
  }, [selectedPizza]);

  const goBack = () => {
    setScreen("select");
    setTimeout(() => setSelectedPizza(null), 50);
  };

  const pizza = PIZZAS.find((p) => p.id === selectedPizza);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFFDE7 0%, #FFF9C4 30%, #FFF3E0 70%, #FFE0B2 100%)",
        fontFamily: "'Fredoka', 'Nunito', 'Quicksand', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(12deg); }
          75% { transform: rotate(-12deg); }
        }
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(255,107,53,0); }
        }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        html, body { overscroll-behavior: none; }
      `}</style>

      {/* Floating background decorations */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        {["🍕", "🧀", "🍅", "🥦", "🫒", "⭐"].map((e, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              fontSize: 28 + (i % 3) * 8,
              opacity: 0.08,
              top: `${10 + (i * 17) % 80}%`,
              left: `${5 + (i * 23) % 85}%`,
              animation: `float ${3 + (i % 3)}s ${i * 0.5}s infinite ease-in-out`,
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "20px 20px 40px" }}>
        {/* ===== SELECTION SCREEN ===== */}
        {screen === "select" && (
          <div style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            {/* Header with Hero Image */}
            <div style={{ textAlign: "center", marginBottom: 24, paddingTop: 8 }}>
              {/* Hero illustration */}
              <div
                style={{
                  width: 200,
                  height: 200,
                  margin: "0 auto 12px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "5px solid #FF6B35",
                  boxShadow: "0 8px 32px rgba(255,107,53,0.25), 0 0 0 8px rgba(255,107,53,0.08)",
                  animation: "popIn 0.5s 0.1s both ease-out",
                }}
              >
                <img
                  src="pizza-hero.png"
                  alt="Pizza Party!"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                <BouncingEmoji emoji="🍕" delay={0.2} size={44} />
                <BouncingEmoji emoji="🎉" delay={0.35} size={44} />
                <BouncingEmoji emoji="🍕" delay={0.5} size={44} />
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#E65100",
                  margin: 0,
                  textShadow: "0 2px 8px rgba(230,81,0,0.15)",
                  fontFamily: "'Nunito', sans-serif",
                  letterSpacing: "-0.5px",
                  animation: "fadeSlideIn 0.5s 0.4s both ease-out",
                }}
              >
                Pick Your Pizza!
              </h1>
            </div>

            {/* Pizza Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {PIZZAS.filter((p) => !p.funny).map((p, i) => (
                <PizzaCard key={p.id} pizza={p} index={i} onClick={() => setSelectedPizza(p.id)} />
              ))}
            </div>

            {/* Funny pizzas section */}
            <SectionLabel emoji="🤪" color="#9C27B0" delay={0.4} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                marginTop: 12,
              }}
            >
              {PIZZAS.filter((p) => p.funny).map((p, i) => (
                <PizzaCard key={p.id} pizza={p} index={i + 4} onClick={() => setSelectedPizza(p.id)} />
              ))}
            </div>
          </div>
        )}

        {/* ===== DETAIL SCREEN ===== */}
        {screen === "detail" && pizza && (
          <div style={{ animation: "slideInRight 0.35s ease-out" }}>
            {/* Back button */}
            <button
              onClick={goBack}
              style={{
                background: "white",
                border: `3px solid ${pizza.color}`,
                borderRadius: 20,
                padding: "12px 24px",
                fontSize: 28,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: 600,
                color: pizza.color,
                boxShadow: `0 4px 12px ${pizza.color}22`,
                animation: "popIn 0.3s ease-out, pulseGlow 2s 1s infinite",
                WebkitTapHighlightColor: "transparent",
                marginBottom: 20,
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 32 }}>👈</span>
            </button>

            {/* Pizza header card */}
            <div
              style={{
                background: pizza.bgGradient,
                border: `4px solid ${pizza.color}`,
                borderRadius: 32,
                padding: "24px 20px",
                textAlign: "center",
                marginBottom: 28,
                boxShadow: `0 8px 32px ${pizza.color}22`,
                animation: "popIn 0.4s 0.1s both ease-out",
              }}
            >
              <span style={{ fontSize: 80, display: "block", lineHeight: 1, marginBottom: 4 }}>
                {pizza.emoji}
              </span>
              <span style={{ fontSize: 48 }}>{pizza.name}</span>
              {pizza.funny && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 20, animation: "wiggle 0.8s infinite" }}>⭐</span>
                  <span style={{ fontSize: 20, animation: "wiggle 0.8s 0.2s infinite" }}>⭐</span>
                  <span style={{ fontSize: 20, animation: "wiggle 0.8s 0.4s infinite" }}>⭐</span>
                </div>
              )}
            </div>

            {/* Base ingredients */}
            <SectionLabel emoji="🫓" color="#FFD54F" delay={0.2} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                marginTop: 10,
                marginBottom: 24,
              }}
            >
              {pizza.base.map((ing, i) => (
                <IngredientBubble key={`base-${i}`} ingredient={ing} index={i} section="base" />
              ))}
            </div>

            {/* Toppings */}
            {pizza.toppings.length > 0 && (
              <>
                <SectionLabel emoji="🥗" color="#66BB6A" delay={0.35} />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(pizza.toppings.length, 3)}, 1fr)`,
                    gap: 12,
                    marginTop: 10,
                    marginBottom: 24,
                  }}
                >
                  {pizza.toppings.map((ing, i) => (
                    <IngredientBubble key={`top-${i}`} ingredient={ing} index={i} section="toppings" />
                  ))}
                </div>
              </>
            )}

            {/* Seasoning */}
            <SectionLabel emoji="🧂" color="#FF8A65" delay={0.5} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(pizza.seasoning.length, 3)}, 1fr)`,
                gap: 12,
                marginTop: 10,
                marginBottom: 24,
              }}
            >
              {pizza.seasoning.map((ing, i) => (
                <IngredientBubble key={`seas-${i}`} ingredient={ing} index={i} section="seasoning" />
              ))}
            </div>

            {/* Big pizza at bottom */}
            <div style={{ textAlign: "center", marginTop: 16, animation: "popIn 0.5s 0.6s both ease-out" }}>
              <span style={{ fontSize: 100, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))", animation: "float 4s infinite ease-in-out" }}>
                🍕
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
