const List = require('./models/List');
const Word = require('./models/Word');

const data = [{
        name: 'Animals',
        description: 'Basic animals in Spanish',
        language: 'ES',
    },
    {
        name: 'Jobs',
        description: 'Jobs in Engish with Polish translation',
        language: 'EN',
    },
    {
        name: 'Buildings',
        description: 'Just some basic buildings',
        language: 'GER',
    },
    {
        name: 'Education',
        description: 'Education realted vocabulary',
        language: 'ES',
    },
]
const words = [
        {original: 'el perro', translation: 'dog'}, 
        {original: 'el gato', translation: 'cat'}, 
        {original: 'el elefante', translation: 'elephant'}, 
        {original: 'el ratón', translation: 'mouse'}, 
]

function seedDb() {
    List.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    Word.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
    });
    data.forEach(list => {

        List.create(list, (err, newList) => {
            if(err) {
                console.log(err);
            } else {
                words.forEach(word => {
                    var word = new Word(word);
                    word.save(function(err) {
                        if(err) {
                            console.log(err);
                        }
                    });
                    newList.words.push(word);
                })
                newList.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        });
    });
}

module.exports = seedDb;