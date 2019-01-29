import * as React from 'react'

const breeds = {
    
        "affenpinscher": {
            breedName: "affenpinscher",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    
    ,
    
        "african": {
            breedName: "african",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        
    },
    
        "airedale": {
            breedName: "airedale",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "akita": {
            breedName: "akita",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "beagle": {
            breedName: "beagle",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "bluetick": {
            breedName: "bluetick",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "boxer": {
            breedName: "boxer",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "brabancon": {
            breedName: "brabancon",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "briard": {
            breedName: "briard",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    
        "bulldog": {
            breedName: "bulldog",
            images: ["URL1", "URL2", "URL3"],
            hasAlreadyAppeared: false
        }
    ,
    }

const questions = {
    questionType: 'textAnswers || imgAnswers',
    questionImgUrl: 'ulr',
    questionText: 'text',
    answers: [{
      answer: 'string',
      isCorrect: false
    }, {
      answer: 'string',
      isCorrect: false
    }, {
      answer: 'string',
      isCorrect: false
    }],
    breedShownFirstTime: true
}



class GameScreenContainer extends React.Component {





    render() {
        console.log(breeds)
        console.log(Object.keys(breeds))
        console.log(Object.values(breeds))

        console.log(questions.answers)
        let difficultyLevel = [3,6,9,12,15,18,21,24,27,30]
        questions.questionType = 'textAnswers'
        const breedsArray = Object.values(breeds)
        let randomIndex = Math.floor(Math.random()*(breedsArray.length-3))
        console.log (breedsArray)
        if (questions.questionType === 'textAnswers'){
            questions.questionText = ""
            const possibleAnswers = breedsArray.slice(randomIndex,randomIndex + difficultyLevel[0])
            console.log(possibleAnswers)
            console.log(Object.keys(possibleAnswers[0]))
            console.log(questions.answers[0].answer)
            let i = 0
            for (i===0; i<questions.answers.length; i++){
                questions.answers[i].answer = possibleAnswers[i].breedName
            }
            let j = Math.floor(Math.random()*(questions.answers.length-1))
            console.log(j)
            questions.answers[j].isCorrect = true
            console.log(questions.answers[j].answer)
            console.log(typeof(questions.answers[j].answer))

            console.log(breeds["affenpinscher"].images)
            console.log(breeds[questions.answers[j].answer])
            console.log(questions)
            questions.questionImgUrl = breeds[questions.answers[j].answer].images
            
            
        }
        console.log(questions)

        return null
          
    }
}



export default GameScreenContainer

