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

(function () {
  const input = document.getElementById("search");
  const suggestionBox = document.getElementById("suggestion-box");

  const onFocus = () => {
    suggestionBox.style.display = "block";
  };

  const onBlur = (e) => {
    if (e.target === input || e.target === suggestionBox) {
      return;
    }
    suggestionBox.style.display = "none";
  };

  const onChange = (e) => {
    processData(e.target.value);
  };

  const processData = async (value) => {
    suggestionBox.innerHTML = "";
    if (!value) {
      return;
    }
    try {
      const response = await getSuggestions(value);
      if (response.length > 0) {
        const list = document.createElement("ul");
        response.forEach((item) => {
          const listItems = document.createElement("li");
          listItems.style.cursor = "pointer";
          listItems.innerText = item;
          list.appendChild(listItems);
        });
        suggestionBox.innerHTML = "";
        suggestionBox.appendChild(list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClick = (e) => {
    if (e.target === suggestionBox) {
      return;
    }
    const text = e.target.innerText;
    input.value = text;
    input.focus();
  };

  input.addEventListener("focus", onFocus);
  window.addEventListener("click", onBlur);
  input.addEventListener("keyup", onChange);
  suggestionBox.addEventListener("click", onClick, true);
})();