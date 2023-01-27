import { useState } from "react";
import axios from "axios";
import "./ToneOne";
import ToneOne from "./ToneOne";
import { Buffer } from "buffer";

function App() {
  const [url, setUrl] = useState("");
  const [filename, setFilename] = useState("screenshot");
  const [fullPage, setFullPage] = useState(false);
  const [type, setType] = useState("png");

  console.log({ type, filename, fullPage, url });

  const handleSumbit = () => {
    const name = filename + "." + type;
    console.log({ name });

    const data = {
      url: url,
      name: name,
      bool: fullPage,
    };
    console.log("data", data);

    axios
      .post("https://screenshot-server-o1zt.onrender.com/details", data, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const b64response = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        let newscr = `data:image/${type};base64,` + b64response;
        document.getElementById("imgD").src = newscr;
        const final = document.getElementById("imgD");

        let link = document.getElementById("download");
        link.setAttribute("download", name);
        link.setAttribute("href", newscr);
        final.onload = () => {
          link.click();
        };
      });
  };
  return (
    <div className="App">
      <ToneOne
        setFullPage={(bool) => setFullPage(bool)}
        setFilename={(name) => setFilename(name)}
        setType={(type) => setType(type)}
      />
      <div className="Tone-two">
        <input
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          placeholder="Paste URL"
        />
        <button onClick={handleSumbit}>Submit</button>
        <a id="download" href="blank" download="">
          <img id="imgD" src="" alt="fromserver" />
        </a>
      </div>
    </div>
  );
}

export default App;
