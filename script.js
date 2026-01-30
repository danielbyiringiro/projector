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

// Projection theme state
let projectionTheme = 'dark'; // 'dark' or 'light'

// DOM Elements
const elements = {
  tabs: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
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
  darkThemeBtn: document.getElementById("darkThemeBtn"),
  lightThemeBtn: document.getElementById("lightThemeBtn"),
  inputs: {
    song: document.getElementById("songNumber"),
    verseSearch: document.getElementById("verseSearch"),
  },
};

// --- Data Loading and Parsing ---

async function loadLocalData() {
  try {
    elements.statusBadge.textContent = "Loading data...";
    const [bibleRes, songRes] = await Promise.all([
      fetch("verses-1769.json"),
      fetch("sdah.json"),
    ]);

    if (!bibleRes.ok) throw new Error("Failed to load Bible data.");
    BIBLE_DATA = await bibleRes.json();

    if (!songRes.ok) throw new Error("Failed to load Song data.");
    const songJson = await songRes.json();
    SONG_DATA = parseJsonHymnal(songJson);

    elements.statusBadge.textContent = "Ready";
    elements.statusBadge.style.color = "#4ade80"; // Green color for ready
  } catch (error) {
    console.error("Data loading error:", error);
    elements.statusBadge.textContent = "Error";
    elements.statusBadge.style.color = "#f87171"; // Red color for error
    alert("Failed to load local data files. Please ensure verses-1769.json and sdah.json are in the same directory.");
  }
}

function parseJsonHymnal(hymnalArray) {
  const songs = {};

  for (const hymn of hymnalArray) {
    const number = hymn.number;
    const title = hymn.title || "Unknown Title";
    const stanzas = [];

    // Convert the lyrics array to stanzas
    for (const lyric of hymn.lyrics) {
      const stanzaType = lyric.type; // "verse" or "refrain"
      const stanzaIndex = lyric.index;
      const stanzaText = lyric.lines.join("\n");

      // Create a title for the stanza
      let stanzaTitle;
      if (stanzaType === "refrain") {
        stanzaTitle = "Refrain";
      } else {
        stanzaTitle = `Verse ${stanzaIndex}`;
      }

      stanzas.push({
        title: stanzaTitle,
        text: stanzaText
      });
    }

    songs[number] = { title, stanzas };
  }

  return songs;
}

// Parse verse reference like "John 3", "John 3:16" or "John 3:16-18"
function parseVerseReference(reference) {
  // Trim whitespace
  reference = reference.trim();

  // Match pattern: Book Chapter or Book Chapter:Verse or Book Chapter:Verse-Verse
  // Examples: "John 3", "John 3:16", "1 John 3:16", "John 3:16-18"
  const pattern = /^((?:\d\s)?[A-Za-z\s]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/;
  const match = reference.match(pattern);

  if (!match) {
    return null;
  }

  const book = match[1].trim();
  const chapter = match[2];
  const startVerse = match[3] ? parseInt(match[3], 10) : null;
  const endVerse = match[4] ? parseInt(match[4], 10) : startVerse;

  return {
    book,
    chapter,
    startVerse,
    endVerse
  };
}


// --- Initialization ---

function init() {
  setupEventListeners();
  loadLocalData();
  loadThemePreference();
  setCurrentYear();
}

function setCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// --- UI Setup ---

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

  // Theme toggle buttons
  elements.darkThemeBtn.addEventListener("click", () => setProjectionTheme('dark'));
  elements.lightThemeBtn.addEventListener("click", () => setProjectionTheme('light'));

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

  // Enter key in verse search field
  elements.inputs.verseSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadVerse();
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
  const searchInput = elements.inputs.verseSearch.value;

  if (!searchInput) {
    return alert("Please enter a verse reference (e.g., John 3:16)");
  }

  // Parse the verse reference
  const parsed = parseVerseReference(searchInput);

  if (!parsed) {
    return alert("Invalid verse format. Please use format like 'John 3', 'John 3:16', or 'John 3:16-18'");
  }

  let { book, chapter, startVerse, endVerse } = parsed;

  elements.loadVerseBtn.textContent = "Loading...";
  elements.loadVerseBtn.disabled = true;

  // If no verse specified, load entire chapter
  if (startVerse === null) {
    // Find all verses in this chapter by scanning BIBLE_DATA
    let verseNum = 1;
    while (BIBLE_DATA[`${book} ${chapter}:${verseNum}`]) {
      verseNum++;
    }
    startVerse = 1;
    endVerse = verseNum - 1;

    if (endVerse < 1) {
      elements.loadVerseBtn.textContent = "Load Passage";
      elements.loadVerseBtn.disabled = false;
      return alert(`Chapter not found: ${book} ${chapter}`);
    }
  }

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
    book: book,
    chapter: parseInt(chapter, 10),
  };

  updatePreview();
  updateNavigationButtons();

  elements.loadVerseBtn.textContent = "Load Passage";
  elements.loadVerseBtn.disabled = false;
}


// --- Theme Management ---

function setProjectionTheme(theme) {
  projectionTheme = theme;

  // Update button states
  elements.darkThemeBtn.classList.toggle('active', theme === 'dark');
  elements.lightThemeBtn.classList.toggle('active', theme === 'light');

  // Update projection window if it's open
  if (theme === 'light') {
    elements.projectionWindow.classList.add('light-theme');
  } else {
    elements.projectionWindow.classList.remove('light-theme');
  }

  // Save preference to localStorage
  localStorage.setItem('projectionTheme', theme);
}

// Load saved theme preference
function loadThemePreference() {
  const savedTheme = localStorage.getItem('projectionTheme') || 'dark';
  setProjectionTheme(savedTheme);
}

// --- Navigation ---

function navigateContent(direction) {
  if (currentContent.items.length === 0) return;

  const newIndex = currentContent.currentIndex + direction;

  // Normal navigation within loaded items
  if (newIndex >= 0 && newIndex < currentContent.items.length) {
    currentContent.currentIndex = newIndex;
    updatePreview();
    updateNavigationButtons();
    updateProjection();
    return;
  }

  // For verses, try to load next/previous verse beyond current range
  if (currentContent.type === "verse" && currentContent.book && currentContent.chapter) {
    if (direction === 1 && newIndex >= currentContent.items.length) {
      // Try to load next verse
      loadAdjacentVerse("next");
    } else if (direction === -1 && newIndex < 0) {
      // Try to load previous verse
      loadAdjacentVerse("previous");
    }
  }
}

function loadAdjacentVerse(direction) {
  const currentItem = currentContent.items[currentContent.currentIndex];
  if (!currentItem || !currentItem.title) return;

  // Parse current verse reference (e.g., "John 3:16")
  const match = currentItem.title.match(/^(.+)\s+(\d+):(\d+)$/);
  if (!match) return;

  const book = match[1];
  const chapter = parseInt(match[2], 10);
  let verseNum = parseInt(match[3], 10);

  // Calculate next or previous verse
  if (direction === "next") {
    verseNum++;
  } else {
    verseNum--;
    if (verseNum < 1) return; // Can't go before verse 1
  }

  // Try to load the verse
  const key = `${book} ${chapter}:${verseNum}`;
  const verseText = BIBLE_DATA[key];

  if (!verseText) {
    // Verse doesn't exist (end of chapter or invalid)
    return;
  }

  const cleanText = verseText.replace(/^#\s*/, '');
  const newVerse = {
    title: key,
    text: cleanText,
    citation: `${key} (KJV)`,
  };

  // Add the verse to the items array
  if (direction === "next") {
    currentContent.items.push(newVerse);
    currentContent.currentIndex++;
  } else {
    currentContent.items.unshift(newVerse);
    // currentIndex stays the same since we inserted at the beginning
  }

  updatePreview();
  updateNavigationButtons();
  updateProjection();
}

function updateNavigationButtons() {
  if (currentContent.items.length === 0) {
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = true;
    return;
  }

  // For verses, check if we can load adjacent verses
  if (currentContent.type === "verse") {
    // Check if we can go to previous verse
    if (currentContent.currentIndex === 0) {
      // Check if there's a verse before the first loaded verse
      const firstItem = currentContent.items[0];
      const match = firstItem.title.match(/^(.+)\s+(\d+):(\d+)$/);
      if (match) {
        const verseNum = parseInt(match[3], 10);
        elements.prevBtn.disabled = verseNum <= 1; // Disable if at verse 1
      } else {
        elements.prevBtn.disabled = true;
      }
    } else {
      elements.prevBtn.disabled = false;
    }

    // Check if we can go to next verse
    if (currentContent.currentIndex === currentContent.items.length - 1) {
      // Check if there's a verse after the last loaded verse
      const lastItem = currentContent.items[currentContent.items.length - 1];
      const match = lastItem.title.match(/^(.+)\s+(\d+):(\d+)$/);
      if (match) {
        const book = match[1];
        const chapter = parseInt(match[2], 10);
        const verseNum = parseInt(match[3], 10);
        const nextKey = `${book} ${chapter}:${verseNum + 1}`;
        elements.nextBtn.disabled = !BIBLE_DATA[nextKey]; // Disable if next verse doesn't exist
      } else {
        elements.nextBtn.disabled = true;
      }
    } else {
      elements.nextBtn.disabled = false;
    }
  } else {
    // For songs, use normal boundary checking
    elements.prevBtn.disabled = currentContent.currentIndex === 0;
    elements.nextBtn.disabled = currentContent.currentIndex === currentContent.items.length - 1;
  }
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

  // Apply current theme
  if (projectionTheme === 'light') {
    elements.projectionWindow.classList.add('light-theme');
  } else {
    elements.projectionWindow.classList.remove('light-theme');
  }

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
