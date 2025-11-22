# Scripture & Song Projector

A modern, web-based projection system for displaying hymns and Bible verses, designed for religious services and presentations. Features a clean interface, dual-theme projection, and complete offline functionality.

## Quick Start

1. **Open** `index.html` in your browser
2. **Wait** for "Ready" status (top right)
3. **Load** a verse (e.g., John 3:16) or hymn (e.g., #1)
4. **Navigate** with arrow keys (← →)
5. **Choose** Dark or Light theme
6. **Project** to full screen

That's it! No installation, no internet required.

## Features

### 📖 Bible Verse Projection
- **Complete Bible**: Full King James Version (KJV 1769) with 31,104 verses
- **100% Offline**: No internet connection required - all verses stored locally
- Choose any book of the Bible from organized dropdown menu (Old & New Testament)
- Specify chapter and verse ranges
- **Navigate verse-by-verse** with arrow keys or buttons
- Real-time position indicator (e.g., "1 of 5 - John 3:16")
- Instant verse loading from local JSON database

### 🎵 Hymn Projection
- Load hymns by number from the Seventh-day Adventist Hymnal (SDAH)
- **685 complete hymns** with all verses and refrains
- **Navigate stanza-by-stanza** through each hymn
- Display verses one at a time for easy reading
- Full song metadata including titles and verse labels
- Automatic parsing of verses and refrains

### 🖥️ Projection Features
- **Dual-Theme Projection**: Switch between dark (black) and light (white) backgrounds
- Full-screen projection mode with automatic fullscreen support
- Large, easy-to-read text optimized for projection
- **Theme Persistence**: Your theme preference is automatically saved
- Smooth transitions between themes and content
- Clean, distraction-free projection display
- Keyboard shortcuts for quick navigation
- Responsive design that works on different screen sizes

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- **No internet connection required** - fully offline capable
- The included data files (SDAH.sps and verses-1769.json)

### Installation
1. Download or clone all files to a folder
2. Ensure you have the following files:
   - `index.html` - Main application interface
   - `script.js` - Application logic
   - `styles.css` - Styling and themes
   - `verses-1769.json` - Complete KJV Bible (31,104 verses)
   - `SDAH.sps` - Hymnal database (685 hymns)
   - `README.md` - This documentation

### Usage

#### Running the Application
1. Open `index.html` in your web browser
2. The application will automatically load Bible and hymn data
3. Wait for "Ready" status indicator (top right)

#### Projecting Bible Verses
1. Click the **"Scripture"** tab
2. Select the book from the dropdown menu (organized by Old/New Testament)
3. Enter the chapter number
4. Enter the starting verse number
5. Optionally enter an ending verse number for a range
6. Click **"Load Passage"**
7. Use **arrow keys** or navigation buttons to move between verses
8. See current position (e.g., "1 of 5 - John 3:16 (KJV)")
9. Choose **Dark** or **Light** projection theme
10. Click **"Project to Screen"** to enter full-screen mode

#### Projecting Hymns
1. Click the **"Song"** tab
2. Enter the hymn number (1-685 available in SDAH)
3. Press **Enter** or click **"Load Song"**
4. Use **arrow keys** or navigation buttons to navigate through stanzas
5. Each stanza displays separately (Verse 1, Refrain, Verse 2, etc.)
6. Choose **Dark** or **Light** projection theme
7. Click **"Project to Screen"** to enter full-screen mode

## Keyboard Shortcuts

- **← Left Arrow**: Navigate to previous verse/stanza
- **→ Right Arrow**: Navigate to next verse/stanza
- **Spacebar**: Toggle projection on/off (when content is loaded)
- **Escape**: Exit projection mode
- **Enter** (in song number field): Load the specified song

## Projection Themes

Choose between two projection themes to suit your venue:

### 🌙 Dark Theme (Default)
- **Black background** with white text
- Ideal for dark venues and traditional projection
- High contrast for maximum readability
- Gray title and citation text

### ☀️ Light Theme
- **White background** with black text
- Perfect for well-lit venues or daytime services
- Reduces eye strain in bright environments
- Light gray title and medium gray citation text

**Theme Switching:**
- Select your preferred theme before or during projection
- Theme preference is automatically saved to your browser
- Smooth transitions when switching themes
- Works with both Bible verses and hymns

## File Structure

```
GNASSprojector/
├── index.html          # Main HTML file with UI
├── script.js           # Main JavaScript application logic
├── styles.css          # Styling and theme definitions
├── verses-1769.json    # Complete KJV Bible (31,104 verses, ~2-3MB)
├── SDAH.sps           # Hymn database file (685 hymns)
└── README.md          # This documentation file
```

## Bible Verse Database

The application uses a **complete offline Bible database**:

- **Version**: King James Version (KJV) 1769 Edition
- **Format**: JSON file with verse references as keys
- **Coverage**: Complete Bible - all 66 books, 31,104 verses
- **Size**: Approximately 2-3MB
- **Loading**: All verses loaded at startup for instant access
- **No Internet Required**: 100% offline functionality

### Database Format
```json
{
  "Genesis 1:1": "In the beginning God created the heaven and the earth.",
  "Genesis 1:2": "And the earth was without form...",
  "John 3:16": "For God so loved the world...",
  ...
}
```

### Books Available
**Old Testament (39 books):**
Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi

**New Testament (27 books):**
Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, Hebrews, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation

## Hymn Database

The SDAH.sps file contains **685 hymns** from the Seventh-day Adventist Hymnal, including:
- Complete lyrics for all verses and refrains
- Proper verse numbering and labels (Verse 1, Verse 2, Refrain, etc.)
- Automatic stanza separation for navigation
- Song titles and metadata
- Custom .sps format with #$# delimiters

### Navigation Features
- Each stanza is a separate navigable item
- Navigate through: Verse 1 → Refrain → Verse 2 → Refrain → etc.
- Position indicator shows current stanza (e.g., "2 of 5")

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (with responsive design)

## Troubleshooting

### Data Not Loading
**Status shows "Loading data..." or "Error":**
- Ensure `verses-1769.json` and `SDAH.sps` are in the same directory as `index.html`
- Check browser console (F12) for error messages
- Verify files are not corrupted (verses-1769.json should be ~2-3MB)
- Try refreshing the page (Ctrl+R or Cmd+R)

### Songs Not Loading
- Ensure the SDAH.sps file is in the same directory as index.html
- Check that the song number exists (valid range: 1-685)
- Wait for "Ready" status indicator before loading songs
- Verify the browser can access local files

### Bible Verses Not Loading
- Wait for "Ready" status indicator (data loads at startup)
- Check that verses-1769.json is present and not corrupted
- Verify the book name matches exactly (use dropdown to avoid typos)
- Try a simple verse like "John 3:16" to test

### Projection Issues
- Press F11 or use browser's fullscreen feature if automatic fullscreen doesn't work
- Ensure your browser allows fullscreen requests
- Use Escape key to exit fullscreen mode
- If theme doesn't apply, try switching themes manually

### Navigation Not Working
- Ensure content is loaded before using arrow keys
- Check that navigation buttons are not disabled (grayed out)
- Verify you're at the correct position (can't go before first or after last item)

### Theme Not Saving
- Check that browser allows localStorage
- Try clearing browser cache and reloading
- Manually select theme each session if persistence fails

### Performance Tips
- Close unnecessary browser tabs for better performance
- Use a dedicated computer/tablet for projection when possible
- Test your setup before the service begins
- The initial load may take 1-2 seconds while loading Bible data

## Technical Details

### Architecture
- **Pure Client-Side**: No server required, runs entirely in the browser
- **Offline-First**: All data stored locally for instant access
- **Modern JavaScript**: ES6+ features with async/await
- **Responsive CSS**: Mobile-friendly design with CSS Grid and Flexbox
- **LocalStorage**: Theme preferences persist across sessions

### File Formats
- **verses-1769.json**: JSON object with verse references as keys
  - Format: `{"Book Chapter:Verse": "verse text"}`
  - Size: ~2-3MB uncompressed
  - Encoding: UTF-8
- **SDAH.sps**: Custom format with #$# delimiters for song data
  - Format: `number#$#title#$#...#$#lyrics`
  - Lyrics use @$ for stanza breaks, @% for line breaks
- **localStorage**: Browser storage for theme preference
  - Key: `projectionTheme`
  - Values: `'dark'` or `'light'`

### Data Loading
1. **Startup**: Both Bible and hymn data load in parallel using `Promise.all()`
2. **Bible**: Entire JSON parsed into memory (~2-3MB)
3. **Hymns**: SPS file parsed into structured objects with stanza separation
4. **Status**: Real-time loading indicator in UI

### Navigation System
- **State Management**: `currentContent` object tracks items and index
- **Item Structure**: Each verse/stanza is a separate navigable item
- **Keyboard Events**: Global event listeners for arrow keys and shortcuts
- **Button States**: Automatic enable/disable based on position

### Theme System
- **CSS Classes**: `.light-theme` class toggles projection colors
- **Smooth Transitions**: CSS transitions for color changes (0.3s ease)
- **Persistence**: Theme saved to localStorage on change
- **Auto-Load**: Saved theme applied on page load

## Browser Compatibility

Tested and working on:
- ✅ Chrome 60+ (Recommended)
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Required Browser Features:**
- ES6 JavaScript support
- Fetch API
- LocalStorage
- Fullscreen API (optional, for automatic fullscreen)

## Performance

- **Initial Load**: 1-2 seconds (loading 31,104 verses)
- **Verse Lookup**: Instant (direct object key access)
- **Navigation**: Immediate response
- **Memory Usage**: ~5-10MB (Bible data in memory)
- **File Size**: Total ~3-4MB for all files

## Support

For technical issues or questions:
1. Check this README for common solutions
2. Verify all files are present and accessible
3. Test with a simple verse like "John 3:16" or song number "1"
4. Check browser console (F12) for error messages
5. Ensure browser supports required features

## Future Enhancements

Possible future additions:
- Multiple Bible versions (NIV, ESV, NKJV)
- Search functionality for verses and hymns
- Custom song databases
- Export/print functionality
- Remote control via mobile device
- Presentation history
- Custom backgrounds and fonts

## License

This project is designed for religious and educational use. The SDAH hymn content is used under fair use provisions for religious services. The KJV Bible text is in the public domain.