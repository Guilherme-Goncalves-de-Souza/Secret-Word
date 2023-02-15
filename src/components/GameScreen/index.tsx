import { ChangeEvent, FormEvent, useState, useRef } from 'react'
import styles from './styles.module.css'

type Props = {
  verifyLetter: Function,
  pickedWord: string,
  pickedCategory: string,
  letters: [],
  guessedLetters: string[],
  wrongLetters: string[],
  guesses: number,
  score: number
}

const GameScreen = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}: Props) => {
  const [letter, setLetter] = useState('');
  
  // Cria uma referencia a algum lugar (deixa o focus no input)
  const letterInputRef = useRef<HTMLInputElement>(null)

  const handleLetter = (e: ChangeEvent<HTMLInputElement >) => {
    setLetter(e.target.value)
  }

  const handleSubmitLetter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    verifyLetter(letter)
    setLetter('')
    
    // Usar a referencia
    letterInputRef.current?.focus()
  }

  return (
    <div className={styles.gameScreen}>
        <p className={styles.points}>
          <span> Pontuação: {score} </span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className={styles.dica}>
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas(s).</p>

        <div className={styles.containerPalavras}>

          {letters.map( (item, key) => (
              // Se letra já adivinhada: imprime ela
              guessedLetters.includes(item) ? 
              <span key={key} className={styles.letra}> {item} </span>
              : // Senão imprime o quadro branco
              <span key={key} className={styles.quadradoBranco}> </span>
          ))}

        </div>

        <div className={styles.adivinharLetra}>
          <p> Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmitLetter}>
            <input type='text' name='letra' maxLength={1} required 
            onChange={handleLetter} 
            value={letter}
            ref={letterInputRef} // seta a referencia
            />

            <button>Jogar</button>
          </form>
        </div>

        <div className={styles.letrasErradas}>
          <p>Letras já utilizadas:</p>
          {wrongLetters.map( (item, key) => (
              <span key={key}> {item}, </span>
          ) ) }
        </div>
    </div>
  )
}

export default GameScreen