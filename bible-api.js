class BibleAPI {
  constructor() {
    this.baseUrl = "https://bible-api.com";
    this.fallbackVerses = this.getFallbackVerses();
  }

  async fetchVerses(book, chapter, startVerse, endVerse = null) {
    const verseRange =
      endVerse && endVerse !== startVerse
        ? `${startVerse}-${endVerse}`
        : startVerse.toString();

    const reference = `${book} ${chapter}:${verseRange}`;

    try {
      // Try to fetch from Bible API
      const response = await fetch(
        `${this.baseUrl}/${encodeURIComponent(reference)}`,
      );

      if (response.ok) {
        const data = await response.json();
        return this.parseAPIResponse(data);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.warn("Bible API unavailable, using fallback verses:", error);
      return this.getFallbackVerses(book, chapter, startVerse, endVerse);
    }
  }

  parseAPIResponse(data) {
    const verses = [];

    if (data.verses && Array.isArray(data.verses)) {
      for (const verse of data.verses) {
        verses.push({
          reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
          text: verse.text.trim(),
          book: verse.book_name,
          chapter: verse.chapter,
          verse: verse.verse,
        });
      }
    } else if (data.text) {
      // Single verse response
      verses.push({
        reference: data.reference,
        text: data.text.trim(),
        book: data.reference.split(" ")[0],
        chapter: parseInt(data.reference.split(" ")[1].split(":")[0]),
        verse: parseInt(data.reference.split(":")[1]),
      });
    }

    return verses;
  }

  getFallbackVerses(
    book = null,
    chapter = null,
    startVerse = null,
    endVerse = null,
  ) {
    if (!book || !chapter || !startVerse) {
      return [];
    }

    const fallbackData = this.fallbackVerses[book];
    if (!fallbackData || !fallbackData[chapter]) {
      return this.generatePlaceholderVerses(
        book,
        chapter,
        startVerse,
        endVerse,
      );
    }

    const verses = [];
    const end = endVerse || startVerse;

    for (let i = startVerse; i <= end; i++) {
      const verseText = fallbackData[chapter][i];
      if (verseText) {
        verses.push({
          reference: `${book} ${chapter}:${i}`,
          text: verseText,
          book: book,
          chapter: chapter,
          verse: i,
        });
      } else {
        verses.push({
          reference: `${book} ${chapter}:${i}`,
          text: `[Verse ${i} not available in fallback data]`,
          book: book,
          chapter: chapter,
          verse: i,
        });
      }
    }

    return verses;
  }

  generatePlaceholderVerses(book, chapter, startVerse, endVerse) {
    const verses = [];
    const end = endVerse || startVerse;

    for (let i = startVerse; i <= end; i++) {
      verses.push({
        reference: `${book} ${chapter}:${i}`,
        text: `[${book} ${chapter}:${i} - This is a placeholder verse. Connect to the internet or add to fallback data for actual content.]`,
        book: book,
        chapter: chapter,
        verse: i,
      });
    }

    return verses;
  }

  getFallbackVerses() {
    return {
      John: {
        3: {
          16: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
          17: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
          18: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.",
          19: "This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil.",
          20: "Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed.",
        },
        1: {
          1: "In the beginning was the Word, and the Word was with God, and the Word was God.",
          2: "He was with God in the beginning.",
          3: "Through him all things were made; without him nothing was made that has been made.",
          4: "In him was life, and that life was the light of all mankind.",
          5: "The light shines in the darkness, and the darkness has not overcome it.",
        },
        14: {
          6: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me.',
        },
      },
      Psalms: {
        23: {
          1: "The LORD is my shepherd, I lack nothing.",
          2: "He makes me lie down in green pastures, he leads me beside quiet waters,",
          3: "he refreshes my soul. He guides me along the right paths for his name's sake.",
          4: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
          5: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
          6: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.",
        },
        1: {
          1: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,",
          2: "but whose delight is in the law of the LORD, and who meditates on his law day and night.",
          3: "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.",
        },
        91: {
          1: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
          2: 'I will say of the LORD, "He is my refuge and my fortress, my God, in whom I trust."',
          11: "For he will command his angels concerning you to guard you in all your ways;",
          12: "they will lift you up in their hands, so that you will not strike your foot against a stone.",
        },
      },
      Romans: {
        8: {
          28: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
          29: "For those God foreknew he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers and sisters.",
          30: "And those he predestined, he also called; those he called, he also justified; those he justified, he also glorified.",
          38: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers,",
          39: "neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
        },
        3: {
          23: "for all have sinned and fall short of the glory of God,",
          24: "and all are justified freely by his grace through the redemption that came by Christ Jesus.",
        },
      },
      Matthew: {
        5: {
          3: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
          4: "Blessed are those who mourn, for they will be comforted.",
          5: "Blessed are the meek, for they will inherit the earth.",
          6: "Blessed are those who hunger and thirst for righteousness, for they will be filled.",
          7: "Blessed are the merciful, for they will be shown mercy.",
          8: "Blessed are the pure in heart, for they will see God.",
        },
        28: {
          19: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit,",
          20: "and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.",
        },
      },
      Philippians: {
        4: {
          13: "I can do all this through him who gives me strength.",
          19: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
        },
      },
      "1 Corinthians": {
        13: {
          4: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
          5: "It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
          6: "Love does not delight in evil but rejoices with the truth.",
          7: "It always protects, always trusts, always hopes, always perseveres.",
          13: "And now these three remain: faith, hope and love. But the greatest of these is love.",
        },
      },
      Jeremiah: {
        29: {
          11: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
        },
      },
      Isaiah: {
        40: {
          31: "but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        },
        41: {
          10: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        },
      },
      Proverbs: {
        3: {
          5: "Trust in the LORD with all your heart and lean not on your own understanding;",
          6: "in all your ways submit to him, and he will make your paths straight.",
        },
      },
      Ephesians: {
        2: {
          8: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—",
          9: "not by works, so that no one can boast.",
        },
      },
    };
  }

  // Search for verses containing specific keywords
  async searchVerses(query, limit = 10) {
    try {
      const response = await fetch(
        `${this.baseUrl}/search/${encodeURIComponent(query)}?limit=${limit}`,
      );
      if (response.ok) {
        const data = await response.json();
        return this.parseAPIResponse(data);
      }
    } catch (error) {
      console.warn("Search API unavailable:", error);
    }

    // Fallback search in local data
    return this.searchFallbackVerses(query, limit);
  }

  searchFallbackVerses(query, limit = 10) {
    const results = [];
    const queryLower = query.toLowerCase();

    for (const [book, chapters] of Object.entries(this.fallbackVerses)) {
      for (const [chapter, verses] of Object.entries(chapters)) {
        for (const [verse, text] of Object.entries(verses)) {
          if (text.toLowerCase().includes(queryLower)) {
            results.push({
              reference: `${book} ${chapter}:${verse}`,
              text: text,
              book: book,
              chapter: parseInt(chapter),
              verse: parseInt(verse),
            });

            if (results.length >= limit) {
              return results;
            }
          }
        }
      }
    }

    return results;
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = BibleAPI;
}
