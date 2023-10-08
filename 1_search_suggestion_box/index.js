import React, {
  useState,
  useRef,
  useEffect,
} from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

// DUMMY Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(4)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [SuggestionVisible, setSuggestionVisible] = useState(false);
  const [listItems, setListItems] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    fetchSuggestionData(value);
  };

  const fetchSuggestionData = async (query) => {
    try {
      let response = await getSuggestions(query);
      setListItems(response);
    } catch (err) {
      setListItems([]);
      console.error(err);
    }
  };
  return (
    <main className="App">
      <input
        type="text"
        id="search"
        name="search"
        placeholder="search..."
        onFocus={() => setSuggestionVisible(true)}
        onBlur={() => setSuggestionVisible(false)}
        onChange={handleChange}
        value={searchQuery}
      />
      {SuggestionVisible && (
        <div id="suggestion-box">
          {listItems.map((item) => (
            <li onClick={(e) => setSearchQuery(e)}>{item}</li>
          ))}
        </div>
      )}
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
