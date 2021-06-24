import {Button} from '../components/Button'
import logoImg from '../assets/images/logo.svg'
import '../styles/rooms.scss'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

type Questions = {
  id: string
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;

}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;

}>

export function Room() {
  const [questions, setQuestions] = useState<Questions[]>([])
  const [title, setTitle] = useState('')
  const {user} = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()
    if(Object.is(newQuestion.trim(), '')) {
      return
    }

    if(!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`/rooms/${roomId}/questions`).push(question)
    setNewQuestion('')

  }

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="representação do logo da empresa" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && 
            <span>{questions.length} perguntas</span>
          }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea placeholder="O que você quer perguntar?" 
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion} />
          <div className="form-footer">
            {user 
              ? (<div className="user-info">
                <img src={user.avatar} alt={`avatar de ${user.name}`} />
                <span>{user.name}</span>
              </div>)
              : (<span>
                Para enviar uma pergunta,<button type="button"> faça seu logn</button>
              </span>)
            }

            <Button disabled={!user} type="submit">Enviar a pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}