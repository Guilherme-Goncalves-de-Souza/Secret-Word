import styles from './styles.module.css'

type Props = {
  retryGame: VoidFunction,
  score: number,
}

const EndScreen = ({retryGame, score}: Props) => {
  return (
    <div className={styles.endGame}>
        <h1>Fim de jogo</h1>
        <h2>A sua pontuação foi: <span> {score} </span></h2>
        <button onClick={retryGame}>Reiniciar jogo</button>
    </div>
  )
}

export default EndScreen