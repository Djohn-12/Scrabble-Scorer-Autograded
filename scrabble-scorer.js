// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return word;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   let score = oldScrabbleScorer(word);
  // console.log(`Score for: ${word}\n${score}`);
   return score;
};

function simpleScorer(word){
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++){
      score += 1;
   }
   return score;
}

function vowelBonusScorer(word){
   word = word.toUpperCase();
   let score = 0;
   
   const vowels = ["A","E","I","O","U"];
   const vowelPoints = 3;
   const consonantPoints = 1;

   for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
         score += vowelPoints;
      } else {
         score += consonantPoints;
      }
   } 
   return score;
};

function scrabbleScorer(word){
   
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++){
      score += newPointStructure[word[i]];
   }
   return score;
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure) {
      oldPointStructure[pointValue].forEach(letter => {
         newPointStructure[letter.toLowerCase()] = Number(pointValue);
      })
   }
   
   return newPointStructure;
}
//console.log(newPointStructure);

newPointStructure = transform(oldPointStructure);
let alg1 = {
   scorerFunction: simpleScorer,
   name: "Simple Score",
   info: "Each letter is worth 1 point."
      
} 
let alg2 = {
   scorerFunction: vowelBonusScorer,
   name: "Bonus Vowels",
      info:"Vowels are 3 pts, consonants are 1 pt."
}
let alg3 = {
   scorerFunction: scrabbleScorer,
   name: "Scrabble",
   info: "The traditional scoring algorithm."
}
const scoringAlgorithms = [alg1, alg2, alg3];

function scorerPrompt(word) {
   console.log(`Enter 0 for simple scorer.\nEnter 1 for Vowel bonus scoring.\nEnter 2 for Scrabble scoring. `)   
   let inputQuestion = input.question(`Which scoring algorithm would you like to use? `);
   inputQuestion = Number(inputQuestion);
   if (inputQuestion >=0 && inputQuestion < scoringAlgorithms.length){
      let score = scoringAlgorithms[inputQuestion].scorerFunction(word);
      console.log(`Score for '${word}' using ${scoringAlgorithms[inputQuestion].name}: ${score}`);
      return score;
   }else  {
      console.log("Try again", )
      return inputQuestion
   } 
} 




function runProgram() {
   let word = initialPrompt();
   let score = scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
