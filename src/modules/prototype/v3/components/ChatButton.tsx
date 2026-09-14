import chatBotButton from '@/assets/icons/chatBotButton.svg'

import styles from './ChatButton.module.css'

export function ChatButton() {
  return (
    <button type="button" className={styles.button} aria-label="Chatbot">
      <img src={chatBotButton} alt="Chatbot" />
    </button>
  )
}
