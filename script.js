// Bible Books Data
const BIBLE_BOOKS = {
  "Old Testament": [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  ],
  "New Testament": [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
  ],
};

// Data stores
let BIBLE_DATA = {};
let SONG_DATA = {};

// State - Changed to support navigation through multiple items
let currentContent = {
  type: null, // 'song' or 'verse'
  items: [], // Array of {title, text, citation} objects
  currentIndex: 0,
  mainTitle: "", // Overall title (e.g., "Hymn #123" or "Scripture Reading")
};

// DOM Elements
const elements = {
  tabs: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
  bookSelect: document.getElementById("bookName"),
  loadSongBtn: document.getElementById("loadSong"),
  loadVerseBtn: document.getElementById("loadVerse"),
  previewSection: document.getElementById("previewSection"),
  previewMeta: document.getElementById("previewMeta"),
  previewText: document.getElementById("previewText"),
  startProjectionBtn: document.getElementById("startProjection"),
  projectionWindow: document.getElementById("projectionWindow"),
  closeProjectionBtn: document.getElementById("closeProjection"),
  projTitle: document.getElementById("projectionTitle"),
  projText: document.getElementById("projectionText"),
  projInfo: document.getElementById("projectionVerseInfo"),
  statusBadge: document.getElementById("connectionStatus"),
  prevBtn: document.getElementById("prevButton"),
  nextBtn: document.getElementById("nextButton"),
  inputs: {
    song: document.getElementById("songNumber"),
    version: document.getElementById("bibleVersion"),
    book: document.getElementById("bookName"),
    chapter: document.getElementById("chapter"),
    start: document.getElementById("startVerse"),
    end: document.getElementById("endVerse"),
  },
};

// --- Data Loading and Parsing ---

async function loadLocalData() {
  try {
    elements.statusBadge.textContent = "Loading data...";
    const [bibleRes, songRes] = await Promise.all([
      fetch("verses-1769.json"),
      fetch("SDAH.sps"),
    ]);

    if (!bibleRes.ok) throw new Error("Failed to load Bible data.");
    BIBLE_DATA = await bibleRes.json();

    if (!songRes.ok) throw new Error("Failed to load Song data.");
    const spsText = await songRes.text();
    SONG_DATA = parseSps(spsText);

    elements.statusBadge.textContent = "Ready";
    elements.statusBadge.style.color = "#4ade80"; // Green color for ready
  } catch (error) {
    console.error("Data loading error:", error);
    elements.statusBadge.textContent = "Error";
    elements.statusBadge.style.color = "#f87171"; // Red color for error
    alert("Failed to load local data files. Please ensure verses-1769.json and SDAH.sps are in the same directory.");
  }
}

function parseSps(text) {
  const songs = {};
  const lines = text.split("\n");

  for (const line of lines) {
    if (!line.startsWith("##") && line.includes("#$#")) {
      const parts = line.split("#$#");
      const number = parseInt(parts[0], 10);
      if (isNaN(number)) continue;

      const title = parts[1] || "Unknown Title";
      let lyrics = parts[6] || "";

      // Parse into stanzas for navigation
      const stanzas = [];
      const stanzaParts = lyrics.split("@$");

      for (const stanzaPart of stanzaParts) {
        if (stanzaPart.trim()) {
          const stanzaLines = stanzaPart.split("@%");
          const stanzaTitle = stanzaLines[0].trim();
          const stanzaText = stanzaLines.slice(1).join("\n").trim();

          if (stanzaText) {
            stanzas.push({
              title: stanzaTitle,
              text: stanzaText
            });
          }
        }
      }

      songs[number] = { title, stanzas };
    }
  }
  return songs;
}


// --- Initialization ---

function init() {
  populateBooks();
  setupEventListeners();
  loadLocalData();
}

// --- UI Setup ---

function populateBooks() {
  for (const [testament, books] of Object.entries(BIBLE_BOOKS)) {
    const group = document.createElement("optgroup");
    group.label = testament;
    books.forEach((book) => {
      const option = document.createElement("option");
      option.value = book;
      option.textContent = book;
      group.appendChild(option);
    });
    elements.bookSelect.appendChild(group);
  }
}

function setupEventListeners() {
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  elements.loadSongBtn.addEventListener("click", loadSong);
  elements.loadVerseBtn.addEventListener("click", loadVerse);

  elements.startProjectionBtn.addEventListener("click", openProjection);
  elements.closeProjectionBtn.addEventListener("click", closeProjection);

  // Navigation buttons
  elements.prevBtn.addEventListener("click", () => navigateContent(-1));
  elements.nextBtn.addEventListener("click", () => navigateContent(1));

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !elements.projectionWindow.classList.contains("hidden")) {
      closeProjection();
    } else if (e.key === "ArrowLeft") {
      navigateContent(-1);
    } else if (e.key === "ArrowRight") {
      navigateContent(1);
    } else if (e.key === " " && currentContent.items.length > 0) {
      e.preventDefault();
      toggleProjection();
    }
  });

  // Enter key in song number field
  elements.inputs.song.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadSong();
    }
  });
}

function switchTab(tabId) {
  elements.tabs.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  elements.tabContents.forEach((content) => {
    content.classList.toggle("active", content.id === `${tabId}Section`);
  });
  elements.previewSection.classList.add("hidden");

  // Reset content when switching tabs
  currentContent = {
    type: null,
    items: [],
    currentIndex: 0,
    mainTitle: "",
  };
}

// --- Content Loading Logic ---

function loadSong() {
  const number = elements.inputs.song.value;
  if (!number) return alert("Please enter a song number.");

  const song = SONG_DATA[number];

  if (song) {
    // Convert stanzas to navigable items
    currentContent = {
      type: "song",
      mainTitle: `Hymn #${number}`,
      items: song.stanzas.map(stanza => ({
        title: `${song.title} - ${stanza.title}`,
        text: stanza.text,
        citation: `Hymn #${number} - ${song.title}`,
      })),
      currentIndex: 0,
    };
    updatePreview();
    updateNavigationButtons();
  } else {
    alert(`Song #${number} not found.`);
  }
}

async function loadVerse() {
  const book = elements.inputs.book.value;
  const chapter = elements.inputs.chapter.value;
  const startVerse = parseInt(elements.inputs.start.value, 10);
  const endVerse = parseInt(elements.inputs.end.value, 10) || startVerse;

  if (!book || !chapter || !startVerse) {
    return alert("Please fill in Book, Chapter, and Start Verse.");
  }

  elements.loadVerseBtn.textContent = "Loading...";
  elements.loadVerseBtn.disabled = true;

  const verses = [];
  let citation = `${book} ${chapter}:${startVerse}`;
  if (startVerse !== endVerse) {
    citation += `-${endVerse}`;
  }

  // Create individual verse items for navigation
  for (let i = startVerse; i <= endVerse; i++) {
    const key = `${book} ${chapter}:${i}`;
    const verseText = BIBLE_DATA[key];
    const cleanText = verseText ? verseText.replace(/^#\s*/, '') : `[${key} not found]`;

    verses.push({
      title: `${book} ${chapter}:${i}`,
      text: cleanText,
      citation: `${book} ${chapter}:${i} (KJV)`,
    });
  }

  currentContent = {
    type: "verse",
    mainTitle: "Scripture Reading",
    items: verses,
    currentIndex: 0,
  };

  updatePreview();
  updateNavigationButtons();

  elements.loadVerseBtn.textContent = "Load Passage";
  elements.loadVerseBtn.disabled = false;
}


// --- Navigation ---

function navigateContent(direction) {
  if (currentContent.items.length === 0) return;

  const newIndex = currentContent.currentIndex + direction;

  if (newIndex >= 0 && newIndex < currentContent.items.length) {
    currentContent.currentIndex = newIndex;
    updatePreview();
    updateNavigationButtons();
    updateProjection();
  }
}

function updateNavigationButtons() {
  if (currentContent.items.length === 0) {
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = true;
    return;
  }

  elements.prevBtn.disabled = currentContent.currentIndex === 0;
  elements.nextBtn.disabled = currentContent.currentIndex === currentContent.items.length - 1;
}

// --- UI Update & Projection ---

function updatePreview() {
  if (currentContent.items.length === 0) return;

  const currentItem = currentContent.items[currentContent.currentIndex];
  const position = `${currentContent.currentIndex + 1} of ${currentContent.items.length}`;

  elements.previewMeta.textContent = `${position} - ${currentItem.citation}`;
  elements.previewText.textContent = currentItem.text;
  elements.previewSection.classList.remove("hidden");
}

function toggleProjection() {
  if (elements.projectionWindow.classList.contains("hidden")) {
    openProjection();
  } else {
    closeProjection();
  }
}

function openProjection() {
  if (currentContent.items.length === 0) {
    alert("Please load some content first!");
    return;
  }

  elements.projectionWindow.classList.remove("hidden");
  updateProjection();

  // Try to enter fullscreen
  if (elements.projectionWindow.requestFullscreen) {
    elements.projectionWindow.requestFullscreen().catch(err => {
      console.log("Fullscreen request failed:", err);
    });
  }
}

function updateProjection() {
  if (currentContent.items.length === 0) return;

  const currentItem = currentContent.items[currentContent.currentIndex];

  elements.projTitle.textContent = currentItem.title;
  elements.projText.textContent = currentItem.text;
  elements.projInfo.textContent = currentItem.citation;
}

function closeProjection() {
  elements.projectionWindow.classList.add("hidden");

  // Exit fullscreen if active
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

// Run Init
init();

// Log keyboard shortcuts
console.log(`
🎵 Scripture & Song Projector - Keyboard Shortcuts:
- Arrow Left/Right: Navigate between verses/stanzas
- Spacebar: Toggle projection on/off
- Escape: Close projection
- Enter (in song number field): Load song
`);
