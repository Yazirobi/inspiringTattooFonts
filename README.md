# Tattoo Design Draft Platform (inspiringTattooFonts)
> A web page project where users can choose their preferred fonts and explore a birth flower gallery to create tattoo design drafts.

---

## Key Features

* **Simple Font Selector:** Preview and choose various typography styles.
* **Flower Gallery:** Browse and explore birth flower tattoo designs.
* **Real-time Canvas Preview:** Combine text and imagery dynamically on the screen.

---

## Tech Stack & Environment

| Category | Tools & Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla JS) |
| **Code Editors** | Sublime Text, Visual Studio Code (VS Code) |

---

## Project Structure

```text
inspiringTattooFonts/
│
├── index.html          # Main web page structure (Font selection & Gallery layout)
├── css/
│   └── style.css       # Web page styling, font typography, and gallery grid layout
└── js/
    └── main.js         # Real-time font preview and gallery image filtering logic
```

---

## Getting Started

### 1. Prerequisites
* A modern web browser (Chrome, Edge, Safari, etc.)
* This is a lightweight web application that runs directly by opening files without any server build process.

### 2. Editor Setup & Running the Project
1. Launch **Sublime Text** or **VS Code**.
2. Open the project folder (`inspiringTattooFonts`) in your editor.
3. Select `index.html` and run it using one of the following methods:
   * **Sublime Text:** Right-click `index.html` in the file explorer and select **Open in Browser**.
   * **VS Code:** Install the **Live Server** extension and click **Go Live** at the bottom right of the window, or simply double-click `index.html` to open it in your browser.

---

## Code Example

### JavaScript: Real-time Font Preview & Flower Matching Logic
```javascript
// Dynamically updates the user's text input with the selected font style in real-time
function updateTattooPreview(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const inputTxt = section.querySelector('.tattoo-name-input').value;
  const inputDob = section.querySelector('.tattoo-dob-input').value;
  const selectFont = section.querySelector('.tattoo-font-select').value;
  const previewNameDisplay = section.querySelector('.preview-name-text');
  const previewDobDisplay = section.querySelector('.preview-dob-text');

  if (inputTxt.trim() === "") {
    previewNameDisplay.innerText = "John Doe";
  } else {
    previewNameDisplay.innerText = inputTxt;
  }

  if (inputDob.trim() === "") {
    previewDobDisplay.innerText = "00.00.0000";
  } else {
    previewDobDisplay.innerText = inputDob;
  }

  previewNameDisplay.className = "preview-name-text"; // Reset classes
  previewNameDisplay.classList.add(`font-${selectFont}`);
}
```

---

## Roadmap
- [x] Phase 1: Build basic HTML/CSS layouts and integrate custom font files.
- [x] Phase 2: Implement real-time typography styling previews using JavaScript.
- [x] Phase 3: Add a Drag & Drop feature to combine text with flower gallery images.
- [ ] Phase 4: Implement local storage saving and draft image download features.

---

## License
This project is an academic and personal portfolio project under the **MIT License**.
