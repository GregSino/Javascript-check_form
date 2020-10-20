var questions=[
    {ques: 'est-ce que tu aimes le javascript ?', ans: 'oui'},
    {ques: 'le javascript est une évolution de java ?', ans: 'non'},
    {ques: 'le javascript est proche de java ?', ans: 'non'},
    {ques: 'le javascript est un langage d\'objet par prototypage ?', ans: 'oui'},
    {ques: 'le javascript est souvent utilisé coté client ?', ans: 'oui'},
    {ques: 'le javascript peut-etre utilisé coté client et serveur ?', ans: 'oui'}
];

var bonneReponse = 0;
var mauvaiseReponse = 0;

for (var index=0; index<questions.length; index++){
    console.log(questions[index]);

    if(prompt(questions[index].ques).toLowerCase() == (questions[index].ans).toLowerCase()){
        console.log("bonne réponse");
        bonneReponse++;
    } else {
        console.log("mauvaise réponse");
        mauvaiseReponse++;
    }
}
console.log("vous avez " + bonneReponse + " bonnes réponses et " + mauvaiseReponse + " mauvaises réponses")