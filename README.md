# Scripture & Song Projector

A web-based projection system for displaying hymns and Bible verses, designed for religious services and presentations.

## Features

### 📖 Bible Verse Projection
- Select from multiple Bible versions (KJV, NIV, ESV, NKJV)
- Choose any book of the Bible from a dropdown menu
- Specify chapter and verse ranges
- Navigate through verses one by one
- Automatic fallback verses when internet is unavailable

### 🎵 Hymn Projection
- Load hymns by number from the Seventh-day Adventist Hymnal (SDAH)
- Display verses one at a time
- Navigate through song verses sequentially
- Full song metadata including titles and verse labels

### 🖥️ Projection Features
- Full-screen projection mode
- Large, easy-to-read text with shadows for better visibility
- Clean black background for optimal projection
- Keyboard shortcuts for quick navigation
- Responsive design that works on different screen sizes

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- The SDAH.sps file (included) for hymn data
- Internet connection for Bible verses (optional - fallback verses available)

### Installation
1. Download or clone all files to a folder
2. Ensure you have the following files:
   - `index.html`
   - `script.js`
   - `bible-api.js`
   - `SDAH.sps`
   - `README.md`

### Usage

#### Running the Application
1. Open `index.html` in your web browser
2. The application will load automatically

#### Projecting Bible Verses
1. Select "Bible Verse" from the content type dropdown
2. Choose your preferred Bible version
3. Select the book from the dropdown menu
4. Enter the chapter number
5. Enter the starting verse number
6. Optionally enter an ending verse number for a range
7. Click "Load Bible Passage"
8. Use the navigation controls to move between verses
9. Click "Start Projection" to enter full-screen mode

#### Projecting Hymns
1. Select "Song" from the content type dropdown
2. Enter the hymn number (1-685 available in SDAH)
3. Click "Load Song"
4. Use the navigation controls to move between verses
5. Click "Start Projection" to enter full-screen mode

## Keyboard Shortcuts

- **Left/Right Arrow Keys**: Navigate between verses/slides
- **Spacebar**: Toggle projection on/off
- **Escape**: Exit projection mode
- **Enter** (in song number field): Load the specified song

## File Structure

```
projector/
├── index.html          # Main HTML file with UI
├── script.js           # Main JavaScript application logic
├── bible-api.js        # Bible API service for fetching verses
├── SDAH.sps           # Hymn database file
└── README.md          # This documentation file
```

## Bible Verse Sources

The application uses multiple sources for Bible verses:

1. **Primary**: Bible-API.com (requires internet connection)
2. **Fallback**: Built-in verse database with popular passages
3. **Placeholder**: Generated text when verses are unavailable

### Popular Verses Available Offline
- John 3:16-20, John 1:1-5, John 14:6
- Psalms 23 (complete), Psalms 1:1-3, Psalms 91:1-2, 11-12
- Romans 8:28-30, 38-39, Romans 3:23-24
- Matthew 5:3-8, Matthew 28:19-20
- Philippians 4:13, 19
- 1 Corinthians 13:4-7, 13
- And many more...

## Hymn Database

The SDAH.sps file contains 685 hymns from the Seventh-day Adventist Hymnal, including:
- Complete lyrics for all verses
- Proper verse numbering and labels
- Refrain identification
- Song titles and metadata

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (with responsive design)

## Troubleshooting

### Songs Not Loading
- Ensure the SDAH.sps file is in the same directory as index.html
- Check that the song number exists (1-685)
- Verify the browser can access local files

### Bible Verses Not Loading
- Check your internet connection for live verses
- The system will automatically use fallback verses when offline
- Popular verses are always available even without internet

### Projection Issues
- Press F11 or use browser's fullscreen feature if automatic fullscreen doesn't work
- Ensure your browser allows fullscreen requests
- Use Escape key to exit fullscreen mode

### Performance Tips
- Close unnecessary browser tabs for better performance
- Use a dedicated computer/tablet for projection when possible
- Test your setup before the service begins

## Technical Details

### File Formats
- **SDAH.sps**: Custom format with #$# delimiters for song data
- **Bible verses**: JSON format from Bible-API.com
- **Fallback data**: JavaScript object with verse text

### API Integration
The system can integrate with various Bible APIs:
- Bible-API.com (default)
- ESV API
- YouVersion API
- Custom Bible databases

## Support

For technical issues or questions:
1. Check this README for common solutions
2. Verify all files are present and accessible
3. Test with a simple verse like "John 3:16" or song number "1"

## License

This project is designed for religious and educational use. The SDAH hymn content is used under fair use provisions for religious services.