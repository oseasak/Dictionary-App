const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionaryArea = document.querySelector('.dictionary-app');

// Function to fetch word data from the API
async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    return data[0];  // Return the first result in the array
}

// Event listener for the search button
btn.addEventListener('click', fetchAndCreateCard);

async function fetchAndCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);

    // Check if data exists
    if (!data) {
        dictionaryArea.innerHTML = `<p>Word not found</p>`;
        return;
    }

    // Collect part of speech data
    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    // Render the data in HTML
    dictionaryArea.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>
        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetic || "N/A"}</span>
        </div>
        <div class="property">
            <span>Audio:</span>
            ${data.phonetics[0] && data.phonetics[0].audio ? `<audio controls src="${data.phonetics[0].audio}"></audio>` : "No audio available"}
        </div>
        <div class="property">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition || "No definition available"}</span>
        </div>
        <div class="property">
            <span>Example:</span>
            <span>${data.meanings[0].definitions[0].example || "No example available"}</span>
        </div>
        <div class="property">
            <span>Parts of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>`;
}
