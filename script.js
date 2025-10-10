class ProjectionSystem {
  constructor() {
    this.currentContent = [];
    this.currentIndex = 0;
    this.contentType = "";
    this.songData = null;
    this.projectionWindow = null;
    this.bibleAPI = new BibleAPI();

    this.initializeEventListeners();
    this.loadSongData();
  }

  initializeEventListeners() {
    // Content type selector
    document.getElementById("contentType").addEventListener("change", (e) => {
      this.handleContentTypeChange(e.target.value);
    });

    // Song section
    document.getElementById("loadSong").addEventListener("click", () => {
      this.loadSong();
    });

    document.getElementById("songNumber").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.loadSong();
      }
    });

    // Verse section
    document.getElementById("loadVerse").addEventListener("click", () => {
      this.loadVerse();
    });

    // Controls
    document.getElementById("prevButton").addEventListener("click", () => {
      this.navigateContent(-1);
    });

    document.getElementById("nextButton").addEventListener("click", () => {
      this.navigateContent(1);
    });

    document.getElementById("startProjection").addEventListener("click", () => {
      this.toggleProjection();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.navigateContent(-1);
      } else if (e.key === "ArrowRight") {
        this.navigateContent(1);
      } else if (e.key === "Escape") {
        this.closeProjection();
      } else if (e.key === " " && this.currentContent.length > 0) {
        e.preventDefault();
        this.toggleProjection();
      }
    });
  }

  handleContentTypeChange(type) {
    // Hide all sections first
    document.getElementById("songSection").classList.add("hidden");
    document.getElementById("verseSection").classList.add("hidden");
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("currentPosition").classList.add("hidden");

    // Show appropriate section
    if (type === "song") {
      document.getElementById("songSection").classList.remove("hidden");
    } else if (type === "verse") {
      document.getElementById("verseSection").classList.remove("hidden");
    }

    this.contentType = type;
    this.currentContent = [];
    this.currentIndex = 0;
  }

  async loadSongData() {
    try {
      const response = await fetch("SDAH.sps");
      const text = await response.text();
      this.songData = this.parseSongData(text);
    } catch (error) {
      console.error("Error loading song data:", error);
      this.songData = {};
    }
  }

  parseSongData(spsText) {
    const songs = {};
    const lines = spsText.split("\n");

    for (const line of lines) {
      if (line.trim() && !line.startsWith("##")) {
        const parts = line.split("#$#");
        if (parts.length >= 7) {
          const songNumber = parseInt(parts[0]);
          const title = parts[1];
          const lyrics = parts[6];

          if (songNumber && title && lyrics) {
            const verses = this.parseVerses(lyrics);
            songs[songNumber] = {
              title: title,
              verses: verses,
            };
          }
        }
      }
    }

    return songs;
  }

  parseVerses(lyricsText) {
    const verses = [];
    const parts = lyricsText.split("@$");

    for (const part of parts) {
      if (part.trim()) {
        const lines = part.split("@%");
        if (lines.length > 1) {
          const verseTitle = lines[0].trim();
          const verseText = lines.slice(1).join("\n").trim();

          if (verseText) {
            verses.push({
              title: verseTitle,
              text: verseText,
            });
          }
        }
      }
    }

    return verses;
  }

  loadSong() {
    const songNumber = parseInt(document.getElementById("songNumber").value);

    if (!songNumber || !this.songData[songNumber]) {
      alert("Song not found! Please check the song number.");
      return;
    }

    const song = this.songData[songNumber];
    this.currentContent = song.verses.map((verse) => ({
      title: `${song.title} - ${verse.title}`,
      text: verse.text,
      type: "song",
    }));

    this.currentIndex = 0;
    this.showControls();
    this.updatePosition();
  }

  async loadVerse() {
    const version = document.getElementById("bibleVersion").value;
    const book = document.getElementById("bookName").value;
    const chapter = parseInt(document.getElementById("chapter").value);
    const startVerse = parseInt(document.getElementById("startVerse").value);
    const endVerse =
      parseInt(document.getElementById("endVerse").value) || startVerse;

    if (!book || !chapter || !startVerse) {
      alert("Please fill in all required fields (Book, Chapter, Start Verse)");
      return;
    }

    try {
      const verses = await this.bibleAPI.fetchVerses(
        book,
        chapter,
        startVerse,
        endVerse,
      );

      this.currentContent = verses.map((verse) => ({
        title: verse.reference,
        text: verse.text,
        reference: verse.reference,
        type: "verse",
      }));

      this.currentIndex = 0;
      this.showControls();
      this.updatePosition();
    } catch (error) {
      alert("Error loading Bible verses. Please try again.");
      console.error(error);
    }
  }

  showControls() {
    document.getElementById("controls").classList.remove("hidden");
    document.getElementById("currentPosition").classList.remove("hidden");
  }

  navigateContent(direction) {
    if (this.currentContent.length === 0) return;

    const newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.currentContent.length) {
      this.currentIndex = newIndex;
      this.updatePosition();
      this.updateProjection();
    }
  }

  updatePosition() {
    if (this.currentContent.length === 0) return;

    const current = this.currentIndex + 1;
    const total = this.currentContent.length;

    document.getElementById("currentPosition").textContent =
      `${current} of ${total}: ${this.currentContent[this.currentIndex].title}`;

    // Update button states
    document.getElementById("prevButton").disabled = this.currentIndex === 0;
    document.getElementById("nextButton").disabled =
      this.currentIndex === this.currentContent.length - 1;
  }

  toggleProjection() {
    const projectionWindow = document.getElementById("projectionWindow");

    if (projectionWindow.classList.contains("hidden")) {
      this.startProjection();
    } else {
      this.closeProjection();
    }
  }

  startProjection() {
    if (this.currentContent.length === 0) {
      alert("Please load some content first!");
      return;
    }

    const projectionWindow = document.getElementById("projectionWindow");
    projectionWindow.classList.remove("hidden");

    // Try to open in fullscreen
    if (projectionWindow.requestFullscreen) {
      projectionWindow.requestFullscreen();
    }

    this.updateProjection();
    document.getElementById("startProjection").textContent =
      "❌ Close Projection";

    // Add escape key listener for projection window
    const escapeHandler = (e) => {
      if (e.key === "Escape") {
        this.closeProjection();
        document.removeEventListener("keydown", escapeHandler);
      }
    };
    document.addEventListener("keydown", escapeHandler);
  }

  updateProjection() {
    if (this.currentContent.length === 0) return;

    const currentItem = this.currentContent[this.currentIndex];

    document.getElementById("projectionTitle").textContent = currentItem.title;
    document.getElementById("projectionText").textContent = currentItem.text;

    // Show reference for Bible verses
    const verseInfo = document.getElementById("projectionVerseInfo");
    if (currentItem.type === "verse" && currentItem.reference) {
      verseInfo.textContent = currentItem.reference;
      verseInfo.style.display = "block";
    } else {
      verseInfo.style.display = "none";
    }
  }

  closeProjection() {
    const projectionWindow = document.getElementById("projectionWindow");
    projectionWindow.classList.add("hidden");

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    document.getElementById("startProjection").textContent =
      "🖥️ Start Projection";
  }
}

// Initialize the application when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ProjectionSystem();
});

// Add some helpful keyboard shortcuts info
document.addEventListener("DOMContentLoaded", () => {
  console.log(`
🎵 Scripture & Song Projector - Keyboard Shortcuts:
- Arrow Left/Right: Navigate between verses/slides
- Spacebar: Toggle projection on/off
- Escape: Close projection
- Enter (in song number field): Load song
    `);
});
