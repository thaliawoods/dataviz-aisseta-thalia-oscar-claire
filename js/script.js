
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
            resultDiv.innerHTML = data.hits[randomIndex].recipe.label + '<br><br> '
            resultDiv.innerHTML += data.hits[randomIndex].recipe.ingredientLines
        })
}
