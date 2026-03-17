import { createReadStream } from "node:fs";

const wordsCounter = {};
let currentWord = ""; 

const stream = createReadStream(process.argv[2]);

stream.on('data', (chunk) => {
    const str = chunk.toString();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (/\S/.test(char)) { 
            currentWord += char;
        } else if (currentWord.length > 0) {
        
            wordsCounter[currentWord] = (wordsCounter[currentWord] || 0) + 1;
            currentWord = ""; 
        }
    }
});

stream.on('end', () => {
   
    if (currentWord.length > 0) {
        wordsCounter[currentWord] = (wordsCounter[currentWord] || 0) + 1;
    }

    console.table(Object.entries(wordsCounter).sort((a, b) => b[1] - a[1]));
});


