import React, { FC, useState } from 'react'
import styles from './index.module.scss'

interface FormProps {
  title: string
  handleClick: (name: string, email: string, pass: string) => void
  isRegister?: boolean
}

const Form: FC<FormProps> = ({ title, handleClick, isRegister }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className={styles.Auth}>
      {isRegister && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="user name"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@mail.com"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => handleClick(name, email, pass)}>{title}</button>
    </div>
  )
}

export default Form
