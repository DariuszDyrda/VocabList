const List = require('./models/List');

const data = [{
        name: 'Animals',
        description: 'Basic animals in Spanish',
        words: [
            {original: 'el perro', translation: 'dog'}, 
            {original: 'el gato', translation: 'cat'}, 
            {original: 'el elefante', translation: 'elephant'}, 
            {original: 'el ratón', translation: 'mouse'}, 
        ],
    },
    {
        name: 'Jobs',
        description: 'Jobs in Engish with Polish translation',
        words: [
            {original: 'el perro', translation: 'dog'}, 
            {original: 'el gato', translation: 'cat'}, 
            {original: 'el elefante', translation: 'elephant'}, 
            {original: 'el ratón', translation: 'mouse'}, 
        ],
    },
    {
        name: 'Buildings',
        description: 'Just some basic buildings',
        words: [
            {original: 'el perro', translation: 'dog'}, 
            {original: 'el gato', translation: 'cat'}, 
            {original: 'el elefante', translation: 'elephant'}, 
            {original: 'el ratón', translation: 'mouse'}, 
        ],
    },
    {
        name: 'Education',
        description: 'Education realted vocabulary',
        words: [
            {original: 'el perro', translation: 'dog'}, 
            {original: 'el gato', translation: 'cat'}, 
            {original: 'el elefante', translation: 'elephant'}, 
            {original: 'el ratón', translation: 'mouse'}, 
        ],
    },
]

function seedDb() {
    List.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    data.forEach(list => {
        List.create(list, (err, list) => {
            if(err) {
                console.log(err);
            }
        });
    });
}

module.exports = seedDb;