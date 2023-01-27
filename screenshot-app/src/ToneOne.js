export default function Tone_one({ setFullPage, setFilename, setType }) {
  return (
    <div className="Tone-one">
      <h1>Screenshot Generator</h1>
      <h3>TAKE A SCREENSHOT OF ANY WEBSITE</h3>
      <div className="container">
        <input
          onChange={(event) => {
            setFilename(event.target.value);
          }}
          placeholder="Enter Filename"
        />
        <label className="Radio">
          <input type="radio" onClick={() => setFullPage(true)} />
          Whole-Page
        </label>
        <select onChange={(event) => setType(event.target.value)}>
          <option>Select FileType</option>
          <option value="jpeg">jpeg</option>
          <option value="png">png</option>
          <option value="webp">webp</option>
        </select>
      </div>
    </div>
  );
}
