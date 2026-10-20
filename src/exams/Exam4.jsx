import usePreferences from "../context/usePreferences.js";

export default function Dashboard() {
  const { theme } = usePreferences();

  return (
    <section className={`preferences-dashboard ${theme}`}>
      <h3>Dashboard</h3>
      <p>Current theme: {theme}</p>

      <Toolbar />
      <ArticlePreview />
    </section>
  );
}

function Toolbar() {
  return (
    <div className="toolbar">
      <h4>Toolbar</h4>
      <PreferencesPanel />
    </div>
  );
}

function PreferencesPanel() {
  const { theme, fontSize, toggleTheme, setFontSize } = usePreferences();

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} theme
      </button>

      <label htmlFor="font-size">Font size</label>
      <select
        id="font-size"
        value={fontSize}
        onChange={(event) => setFontSize(Number(event.target.value))}
      >
        <option value={14}>14 pixels</option>
        <option value={16}>16 pixels</option>
        <option value={18}>18 pixels</option>
      </select>
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();

  return (
    <article
      className={`article-preview ${theme}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <h4>Article Preview</h4>
      <p>
        React Context shares preferences across nested components without
        passing preference props through every level.
      </p>
      <p>
        Theme: {theme} | Font size: {fontSize}px
      </p>
    </article>
  );
}