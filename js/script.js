
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

            for (let healthLabel of data.hits[randomIndex].recipe.healthLabels) {
                resultDiv.innerHTML += healthLabel + '<br>'
            }
        })
}
