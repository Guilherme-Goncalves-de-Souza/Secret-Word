import styles from './styles.module.css'

type Props = {
  startGame: VoidFunction;
}

const StartScreen = ({startGame}: Props) => {
  return (
    <div className={styles.start}>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar jogo</button>
    </div>
  )
}

export default StartScreen