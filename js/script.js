
const excited = document.querySelector('#excited');
const sad = document.querySelector('#sad');
const happy = document.querySelector('#happy');
const angry = document.querySelector('#angry');
const tired = document.querySelector('#tired');
const sick = document.querySelector('#sick');
const anxious = document.querySelector('#anxious');
const lazy = document.querySelector('#lazy');


excited.addEventListener('click', () => {
    getRecipes('excited');
});

sad.addEventListener('click', () => {
    getRecipes('sad');
});

happy.addEventListener('click', () => {
    getRecipes('happy');
});

angry.addEventListener('click', () => {
    getRecipes('angry');
});

tired.addEventListener('click', () => {
    getRecipes('tired');
});

sick.addEventListener('click', () => {
    getRecipes('sick');
});

anxious.addEventListener('click', () => {
    getRecipes('anxious');
});

lazy.addEventListener('click', () => {
    getRecipes('lazy');
});


const getRecipes = (mood) => {
    const APP_ID = '4818c404';
    const APP_KEY = 'cdd694c0334ffdb4ee8e906086c61656';
    const ingredient = mood
    const randomIndex = Math.floor(Math.random()*11)

    const response = fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&count=1`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('recipes')
            resultDiv.innerHTML = `<h2>${data.hits[randomIndex].recipe.label}</h2>`
            resultDiv.innerHTML += `<img src=${data.hits[randomIndex].recipe.image}>`
            resultDiv.innerHTML += `<form action="${data.hits[randomIndex].recipe.url}"><input class="btn" type="submit" value="see full recipe" formtarget=_blank /></form>`            

            resultDiv.innerHTML += '<h3>INGREDIENTS :</h3>'

            for (let line of data.hits[randomIndex].recipe.ingredientLines) {
                resultDiv.innerHTML += line + '<br>'
            }

            resultDiv.innerHTML += '<br>'
       
        sendLabelToOpenAI(label);
    });
}


let suggestedSong = ""; 
const sendLabelToOpenAI = (label) => {
const openaiApiKey = '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'; 
const openaiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

const headers = {
    'Authorization': `Bearer ${openaiApiKey}`,
    'Content-Type': 'application/json'
};
const prompt = `Suggest a drink to go with the recipe mood in just two words"${label}"`;


fetch(openaiEndpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        prompt: prompt
    })
})
.then(response => response.json())
.then(data => {
    console.log(data)
    const openaiResult = data.choices[0].text;
    const cocktailSuggestionDiv = document.getElementById('cocktail-suggestion');
    cocktailSuggestionDiv.innerHTML = openaiResult;
    console.log(openaiResult); 
})
const songPrompt = `suggest me a  modern song who matches with the recipe mood"${label}"`;
fetch(openaiEndpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        prompt: songPrompt
    })
})
.then(response => response.json())
.then(data => {
    const suggestedSong = data.choices[0].text;
    const songSuggestionDiv = document.getElementById('song-suggestion');
    songSuggestionDiv.innerHTML = suggestedSong ;
})
.catch(error => {
    console.error('Erreur lors de la requête à l\'API OpenAI :', error.message);
});
}; 
const playTheSong = suggestedSong 
