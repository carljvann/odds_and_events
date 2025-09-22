const state = {
  numberBank: [],
  oddNumbers: [],
  evenNumbers: [],
};
/** sorter */
function addToBank(number) {
  state.numberBank.push(number);
  render();
}

function sortOne() {
  if (state.numberBank.length === 0) return;

  const number = state.numberBank.shift();
  if (number % 2 === 0) {
    state.evenNumbers.push(number);
  } else {
    state.oddNumbers.push(number);
  }
  render();
}

function sortAll() {
  while (state.numberBank.length > 0) {
    const number = state.numberBank.shift();
    if (number % 2 === 0) {
      state.evenNumbers.push(number);
    } else {
      state.oddNumbers.push(number);
    }
  }
  render();
}
//* UI Components*/
function createInputSection() {
  const section = document.createElement("div");
  section.className = "input-section";

  const input = document.createElement("input");
  input.type = "number";
  input.id = "numberInput";
  input.placeholder = "Enter a number";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Number";
  addButton.addEventListener("click", handleAddNumber);

  section.appendChild(input);
  section.appendChild(addButton);

  return section;
}

function createSortButtons() {
  const section = document.createElement("div");
  section.className = "sort-buttons";

  const sortOneButton = document.createElement("button");
  sortOneButton.textContent = "Sort 1";
  sortOneButton.addEventListener("click", handleSortOne);

  const sortAllButton = document.createElement("button");
  sortAllButton.textContent = "Sort All";
  sortAllButton.addEventListener("click", handleSortAll);

  section.appendChild(sortOneButton);
  section.appendChild(sortAllButton);

  return section;
}

function createNumberSection(title, numbers, className) {
  const section = document.createElement("div");
  section.className = `section ${className}`;

  const heading = document.createElement("h3");
  heading.textContent = title;

  const numbersList = document.createElement("div");
  numbersList.className = "numbers-list";

  if (numbers.length === 0) {
    numbersList.textContent = "No numbers";
  } else {
    numbersList.textContent = numbers.join(", ");
  }

  section.appendChild(heading);
  section.appendChild(numbersList);

  return section;
}

function createApp() {
  const app = document.createElement("div");
  app.className = "container";

  const title = document.createElement("h1");
  title.textContent = "Number Sorter";

  const inputSection = createInputSection();
  const sortButtons = createSortButtons();
  const bankSection = createNumberSection(
    "Number Bank",
    state.numberBank,
    "number-bank"
  );
  const oddSection = createNumberSection(
    "Odd Numbers",
    state.oddNumbers,
    "odd-numbers"
  );
  const evenSection = createNumberSection(
    "Even Numbers",
    state.evenNumbers,
    "even-numbers"
  );

  app.appendChild(title);
  app.appendChild(inputSection);
  app.appendChild(sortButtons);
  app.appendChild(bankSection);
  app.appendChild(oddSection);
  app.appendChild(evenSection);

  return app;
}

// Event Handlers (modify state only)
function handleAddNumber() {
  const input = document.getElementById("numberInput");
  const value = parseInt(input.value);

  if (!isNaN(value)) {
    addToBank(value);
    input.value = "";
  }
}

function handleSortOne() {
  sortOne();
}

function handleSortAll() {
  sortAll();
}

// Render Function
function render() {
  const existingApp = document.querySelector(".container");
  if (existingApp) {
    existingApp.remove();
  }

  const app = createApp();
  document.body.appendChild(app);

  // Add styles dynamically
  if (!document.getElementById("app-styles")) {
    const style = document.createElement("style");
    style.id = "app-styles";
    style.textContent = `
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: white;
                color: black;
            }
            
            .container {
                background: white;
                padding: 20px;
            }
            
            h1 {
                color: black;
                margin-bottom: 20px;
            }
            
            .input-section {
                margin-bottom: 20px;
            }
            
            input[type="number"] {
                padding: 5px;
                border: 1px solid black;
                background-color: white;
                color: black;
                margin-right: 10px;
            }
            
            button {
                padding: 5px 10px;
                background-color: white;
                color: black;
                border: 1px solid black;
                cursor: pointer;
                margin-right: 10px;
            }
            
            .sort-buttons {
                margin-bottom: 20px;
            }
            
            .section {
                margin-bottom: 20px;
            }
            
            .section h3 {
                margin: 0 0 10px 0;
                color: black;
            }
            
            .numbers-list {
                color: black;
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  render();
});
