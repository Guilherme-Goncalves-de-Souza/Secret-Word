// Css
import './App.css'

// React
import { useCallback, useEffect, useState } from 'react' 

// Data (palavras)
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

// Estágios do jogo:
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]



function App() {
  const [gameState, setGameState] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState<string>('')
  const [pickedCategory, setPickedCategory] = useState<string>('')
  const [letters, setLetters] = useState<any>()

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]) // Letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState<string[]>([]) // Letras erradas
  const [guesses, setGuesses] = useState<number>(3) // Tentativas do usuário
  const [score, setScore] = useState<number>(0) // Pontuação
  

  const pickWordandCategory = useCallback(() => {
    // Aqui ele pega uma categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Agora vai entrar nessa categoria e pegar uma PALAVRA aleatória
    const word = (words as any)[category][Math.floor(Math.random() * (words as any)[category].length)]

    return {word, category}
  }, [words])


  /* FUNÇÕES: */
  // Começa o game
  const startGame = useCallback(() => {

    clearLetterState();

    const {word, category} = pickWordandCategory();

    // Transformar a palavra em LETRAS
    let WordLowerCase = word.toLowerCase();
    const wordLetters = WordLowerCase.split('');

    // Setar estados:
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
  
    setGameState(stages[1].name);
  }, [pickWordandCategory]);
  

  // Verificar a letra do input
  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();

    // Verificar se a letra já foi utilizada
    if(guessedLetters.includes(normalizedLetter) ||
    wrongLetters.includes(normalizedLetter)){
      return;
    }

    // Enviar a letra para certa ou errada
    if(letters.includes(normalizedLetter)){
      // Letra CERTA
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } 
      else{ // Letra ERRADA
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterState = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Check se as tentativas terminaram
  useEffect(() => {
    if(guesses <= 0){
      // Resetar todos os states:
      clearLetterState();
      setGameState(stages[2].name)
    }
  },[guesses])


  // Check se acertou a palavra
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]
    
    // Condição de vitória
    if(guessedLetters.length === uniqueLetters.length){
      // add Score
      setScore((actualScore) => actualScore += 100)

      // Restartar o jogo e criar um novo
      startGame()
    }

  }, [guessedLetters, letters, startGame])


  // Reiniciar o jogo
  const retryGame = () => {
    setScore(0);
    setGuesses(3)

    setGameState(stages[0].name)
  }



  
  return (
    <div className="App">
      {gameState === 'start' &&
        <StartScreen startGame={startGame} />
      }

      {gameState === 'game' &&
        <GameScreen 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />
      }

      {gameState === 'end' &&
        <EndScreen retryGame={retryGame} score={score}/>
      }
    </div>
  )
}

export default App
