import {useHistory} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const history = useHistory()
  const {signinWithGoogle, user} = useAuth()


  async function handleCreateRoom() {
    if(!user) {
      await signinWithGoogle()
    }
      history.push('/rooms/new')
  }

	return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="respresentação do logotipo da aplicação" />
          <button onClick={handleCreateRoom}
                  className="create-room">
            <img src={googleImg} alt="representação do logotipo do google" />
            Crie uma sala com o Google
          </button>
          <div className="separator">
            Entre em uma sala
          </div>
          <form action="">
            <input  type="text"
                    placeholder="Digite o código da sala" />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}