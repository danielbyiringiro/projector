# Scripture & Song Projector

A modern, web-based projection system for displaying hymns and Bible verses, designed for religious services and presentations. Features a clean interface, dual-theme projection, and complete offline functionality.

## Quick Start

1. **Open** `index.html` in your browser
2. **Wait** for "Ready" status (top right)
3. **Type** a verse reference (e.g., "John 3:16" or "John 3") or hymn number (e.g., #1)
4. **Navigate** with arrow keys (← →) - verses load dynamically as you navigate!
5. **Choose** Dark or Light theme
6. **Project** to full screen

That's it! No installation, no internet required.

## Features

### 📖 Bible Verse Projection
- **Complete Bible**: Full King James Version (KJV 1769) with 31,104 verses
- **100% Offline**: No internet connection required - all verses stored locally
- **Smart Search Bar**: Type natural verse references like "John 3:16" or "Psalms 23"
- **Flexible Input Formats**:
  - Full chapters: `John 3` (loads all 36 verses)
  - Single verses: `John 3:16`
  - Verse ranges: `John 3:16-18`
  - Books with numbers: `1 John 3:16`
- **Infinite Navigation**: Navigate beyond loaded verses - next/previous verses load automatically
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
- The included data files (sdah.json and verses-1769.json)

### Installation
1. Download or clone all files to a folder
2. Ensure you have the following files:
   - `index.html` - Main application interface
   - `script.js` - Application logic
   - `styles.css` - Styling and themes
   - `verses-1769.json` - Complete KJV Bible (31,104 verses)
   - `sdah.json` - Hymnal database (685 hymns)
   - `README.md` - This documentation

### Usage

#### Running the Application
1. Open `index.html` in your web browser
2. The application will automatically load Bible and hymn data
3. Wait for "Ready" status indicator (top right)

#### Projecting Bible Verses

**NEW: Smart Search Bar Interface**

The Scripture Projector now features an intuitive search bar that accepts natural verse references. Simply type and go!

**Supported Formats:**

1. **Full Chapter** - Load entire chapters
   - Type: `John 3` or `Psalms 23` or `Genesis 1`
   - Result: Loads all verses in that chapter
   - Example: `John 3` loads verses 1-36

2. **Single Verse** - Load a specific verse
   - Type: `John 3:16` or `Romans 8:28`
   - Result: Loads that single verse
   - Navigate to adjacent verses using arrow keys

3. **Verse Range** - Load multiple consecutive verses
   - Type: `John 3:16-18` or `Psalms 23:1-6`
   - Result: Loads verses 16, 17, and 18
   - Navigate through the range with arrow keys

4. **Books with Numbers** - Works with numbered books
   - Type: `1 John 3:16` or `2 Corinthians 5:17`
   - Result: Correctly identifies the book and loads the verse

**How to Use:**

1. Click the **"Scripture"** tab
2. Type your verse reference in the search bar (e.g., `John 3:16`)
3. Press **Enter** or click **"Load Passage"**
4. Use **arrow keys** (← →) or navigation buttons to move between verses
5. **Navigate beyond loaded verses** - the system automatically loads the next/previous verse as you navigate!
6. See current position (e.g., "1 of 5 - John 3:16 (KJV)")
7. Choose **Dark** or **Light** projection theme
8. Click **"Project to Screen"** to enter full-screen mode

**Dynamic Verse Loading:**

When you load a single verse or range, you can now navigate infinitely:
- Load `John 3:16` → Press **Next** → Automatically loads John 3:17 → Press **Next** → Loads John 3:18, etc.
- Press **Previous** to go backwards through verses
- Navigation stops at verse 1 (can't go before) and at the last verse of the chapter
- No need to reload - verses appear instantly as you navigate!

#### Projecting Hymns
1. Click the **"Song"** tab
2. Enter the hymn number (1-685 available in SDAH)
3. Press **Enter** or click **"Load Song"**
4. Use **arrow keys** or navigation buttons to navigate through stanzas
5. Each stanza displays separately (Verse 1, Refrain, Verse 2, etc.)
6. Choose **Dark** or **Light** projection theme
7. Click **"Project to Screen"** to enter full-screen mode

## Keyboard Shortcuts

- **← Left Arrow**: Navigate to previous verse/stanza (verses load dynamically)
- **→ Right Arrow**: Navigate to next verse/stanza (verses load dynamically)
- **Spacebar**: Toggle projection on/off (when content is loaded)
- **Escape**: Exit projection mode
- **Enter** (in verse search field): Load the specified verse/chapter
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
├── sdah.json          # Hymnal database file (685 hymns)
└── README.md          # This documentation file
```

## Verse Search Examples

Here are some practical examples to help you get started with the new search bar:

### Loading Full Chapters
Perfect for reading entire passages or chapters during services:
- `Genesis 1` - The creation story (31 verses)
- `Psalms 23` - The Shepherd's Psalm (6 verses)
- `John 3` - Jesus and Nicodemus (36 verses)
- `Matthew 5` - The Sermon on the Mount (48 verses)
- `1 Corinthians 13` - The love chapter (13 verses)

### Loading Single Verses
Great for displaying key verses or memory verses:
- `John 3:16` - The most famous verse
- `Romans 8:28` - All things work together for good
- `Philippians 4:13` - I can do all things through Christ
- `Jeremiah 29:11` - Plans to prosper you
- `Proverbs 3:5` - Trust in the Lord

### Loading Verse Ranges
Ideal for reading connected passages:
- `John 3:16-17` - God's love and salvation
- `Psalms 23:1-3` - The Lord is my shepherd
- `Matthew 28:18-20` - The Great Commission
- `Romans 12:1-2` - Living sacrifices
- `Ephesians 6:10-18` - The armor of God

### Navigating Through Verses
Once you load any verse, you can navigate infinitely:
1. Load `John 3:16`
2. Press **→** (right arrow) to see John 3:17
3. Keep pressing **→** to continue through John 3:18, 3:19, 3:20...
4. Press **←** (left arrow) to go back
5. Navigation automatically stops at chapter boundaries

### Tips for Best Results
- **Exact book names**: Use "Song of Solomon" not "Song of Songs"
- **Numbered books**: Include the number: "1 John" not "John 1"
- **Chapter only**: Just type book and chapter for the whole chapter
- **Press Enter**: Hit Enter after typing to load quickly
- **Case insensitive**: "john 3:16" works just as well as "John 3:16"

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

The sdah.json file contains **685 hymns** from the Seventh-day Adventist Hymnal, including:
- Complete lyrics for all verses and refrains
- Proper verse numbering and labels (Verse 1, Verse 2, Refrain, etc.)
- Automatic stanza separation for navigation
- Song titles and metadata
- JSON format with structured hymn data

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
- Ensure `verses-1769.json` and `sdah.json` are in the same directory as `index.html`
- Check browser console (F12) for error messages
- Verify files are not corrupted (verses-1769.json should be ~2-3MB)
- Try refreshing the page (Ctrl+R or Cmd+R)

### Songs Not Loading
- Ensure the sdah.json file is in the same directory as index.html
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
- For verses: Navigation automatically loads adjacent verses - if disabled, you're at a chapter boundary
- For songs: Can't navigate beyond the loaded stanzas

### Verse Search Not Working
- Check your verse reference format (e.g., "John 3:16" not "John 3 16")
- Ensure book name is spelled correctly (use exact Bible book names)
- For numbered books, include the number: "1 John" not "John 1"
- Wait for "Ready" status before searching
- Try a simple reference like "John 3:16" to test

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
- **sdah.json**: JSON array with structured hymn data
  - Format: Array of hymn objects with number, title, and lyrics
  - Each lyric has type (verse/refrain), index, and lines array
  - Size: ~1-2MB uncompressed
- **localStorage**: Browser storage for theme preference
  - Key: `projectionTheme`
  - Values: `'dark'` or `'light'`

### Data Loading
1. **Startup**: Both Bible and hymn data load in parallel using `Promise.all()`
2. **Bible**: Entire JSON parsed into memory (~2-3MB)
3. **Hymns**: JSON file parsed into structured objects with stanza separation
4. **Status**: Real-time loading indicator in UI

### Navigation System
- **State Management**: `currentContent` object tracks items and index
- **Item Structure**: Each verse/stanza is a separate navigable item
- **Dynamic Loading**: Adjacent verses load automatically when navigating beyond current range
- **Smart Boundaries**: Navigation buttons intelligently enable/disable based on verse availability
- **Keyboard Events**: Global event listeners for arrow keys and shortcuts
- **Button States**: Automatic enable/disable based on position and verse existence

### Verse Search Parser
- **Regex Pattern Matching**: Parses natural language verse references
- **Flexible Formats**: Supports chapter-only, single verse, and verse ranges
- **Book Name Handling**: Correctly identifies books with numbers (e.g., "1 John")
- **Chapter Detection**: Automatically finds all verses in a chapter when no verse specified
- **Error Handling**: Provides helpful error messages for invalid formats

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

## Recent Updates

### Version 2.0 - Smart Verse Search (Current)
- ✅ **Smart Search Bar**: Natural language verse references
- ✅ **Full Chapter Loading**: Type "John 3" to load entire chapters
- ✅ **Infinite Navigation**: Navigate beyond loaded verses automatically
- ✅ **Dynamic Verse Loading**: Adjacent verses load on-demand
- ✅ **Flexible Input**: Supports multiple verse reference formats
- ✅ **Improved UX**: Simpler, faster verse lookup

### Version 1.0 - Initial Release
- Complete KJV Bible with 31,104 verses
- 685 SDAH hymns with full lyrics
- Dual-theme projection (Dark/Light)
- Offline functionality
- Keyboard shortcuts

## Future Enhancements

Possible future additions:
- Multiple Bible versions (NIV, ESV, NKJV)
- Advanced search functionality (search by keywords)
- Custom song databases
- Export/print functionality
- Remote control via mobile device
- Presentation history
- Custom backgrounds and fonts
- Bookmarks and favorites

## License

This project is designed for religious and educational use. The SDAH hymn content is used under fair use provisions for religious services. The KJV Bible text is in the public domain.