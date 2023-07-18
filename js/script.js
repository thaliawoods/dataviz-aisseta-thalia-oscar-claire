
const recipe = document.querySelector('#recipe');

const excited = document.querySelector('#excited');
const sad = document.querySelector('#sad');
const happy = document.querySelector('#happy');
const angry = document.querySelector('#angry');
const tired = document.querySelector('#tired');
const sick = document.querySelector('#sick');
const anxious = document.querySelector('#anxious');


// Ajoute tes évènements ici :

excited.addEventListener('click', () => {
    recipe.innerHTML = 'excited!';
});

sad.addEventListener('click', () => {
    recipe.innerHTML = 'sad!';
});

happy.addEventListener('click', () => {
    recipe.innerHTML = 'happy!';
});

angry.addEventListener('click', () => {
    recipe.innerHTML = 'angry!';
});

tired.addEventListener('click', () => {
    recipe.innerHTML = 'tired!';
});

sick.addEventListener('click', () => {
    recipe.innerHTML = 'sick!';
});

anxious.addEventListener('click', () => {
    recipe.innerHTML = 'anxious!';
});

