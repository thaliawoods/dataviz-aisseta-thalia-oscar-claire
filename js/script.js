
const moods = ['excited', 'sad', 'happy', 'angry', 'tired', 'sick', 'anxious', 'lazy']

for (let i = 0; i < moods.length ; i++) {
    document.querySelectorAll(".emojiButton > button")[i].addEventListener('click', function(){
        getRecipes(moods[i]);
    })
}

const getRecipes = (mood) => {
    const APP_ID = '4818c404';
    const APP_KEY = 'cdd694c0334ffdb4ee8e906086c61656';
    const ingredient = mood
    const randomIndex = Math.floor(Math.random()*11)

    fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}&dishType=main course`)
        .then(response => response.json())
        .then(data => {
            console.log(data.hits[randomIndex].recipe)

            const resultDiv = document.getElementById('recipes')
            const label = data.hits[randomIndex].recipe.label
            resultDiv.innerHTML = `<br><span class="title"><img src="./images/recipe.png" class="icon"> <span id="recipeTitle">${label}</span></span><br>`
            resultDiv.innerHTML += `<br><img src=${data.hits[randomIndex].recipe.image}>`

            resultDiv.innerHTML += '<h3>INGREDIENTS :</h3>'

            for (let line of data.hits[randomIndex].recipe.ingredientLines) {
                resultDiv.innerHTML += line + '<br>'
            }

            resultDiv.innerHTML += `<br><form action="${data.hits[randomIndex].recipe.url}"><input class="btn" type="submit" value="see full recipe" formtarget=_blank /></form>`            


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
        cocktailSuggestionDiv.innerHTML = `<br><span class="title"><img src="./images/drink.png" class="icon"> <span id="recipeTitle">${openaiResult}</span></span><br>`;
        console.log(openaiResult);
    })
    const songPrompt = `suggest me a modern song who matches with the recipe mood "${label}" and format it like this : "Song" - Artist`;
    fetch(openaiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            prompt: songPrompt
        })
    })
    .then(response => response.json())
    .then(data => {
        let suggestedSong = data.choices[0].text;
        const songSuggestionDiv = document.getElementById('song-suggestion');
        songSuggestionDiv.innerHTML = `<br><span class="title"><img src="./images/music.png" class="icon"> <span id="recipeTitle">${suggestedSong}</span></span><br>` ;

    getYoutubeVideoLink(suggestedSong)
      .then((data) => {
        if (data) {
          console.log("Lien YouTube de la musique :", data.youtubeLink);
          console.log("URL de la miniature :", data.thumbnailURL);

          const videoThumb = document.getElementById("video-thumb")
          videoThumb.innerHTML = `<img src="${data.thumbnailURL}"> <br>`
          videoThumb.innerHTML += `<a href=${data.youtubeLink}>link</a>`

        } else {
          console.log("Aucune vidéo YouTube trouvée pour cette musique.");
        }
    });
})
    .catch(error => {
        console.error('Erreur lors de la requête à l\'API OpenAI :', error.message);
    });
};

const getYoutubeVideoLink = (SongName) => {
    const YOUTUBE_API_KEY = 'AIzaSyCNJCkwqELWejsZJzTm6cm3L_iPJlgxRIk'
    const youtubeEndPoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(SongName)}&key=${YOUTUBE_API_KEY}&type=video`;

    return fetch(youtubeEndPoint)
        .then((response) => response.json())
        .then((data) => {
            if(data.items.length > 0){
                const youtubeLink=`https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
                const thumbnails = data.items[0].snippet.thumbnails;
                const thumbnailURL = thumbnails.medium.url;

                return { youtubeLink, thumbnailURL, thumbnails};
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la requête à l\'API YouTube :', error.message);
            return null;
        });
};
