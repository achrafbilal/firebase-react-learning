import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useAuth, database } from '../hooks/useAuth'
import Home from './Home'
function App() {
  const { user } = useAuth()
  const [server, changeServer] = useState(null)
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('aaa')
  const getMessages = (id) => {
    console.log('called => ' + id)
    if (id)
      database
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot
        (
          s => {
            let a = s.docs.filter(e => e.data().server === id)
            let m = a.map(e => ({ id: e.id, ...e.data() }))

            setMessages(m)
            console.log(m.length, messages.length)
          }
        )
  }
  useEffect(() => { if (messages.length > 0) document.getElementById('last_message').scrollIntoView({ behavior: 'smooth', block: 'center' }) }, [messages])
  useEffect(() => {
    if (!username) {
      setUsername(prompt('Choose a username'))
    }
  }, [server])

  const setServer = (newServer) => {
    getMessages(newServer.id)
    changeServer(newServer)
  }
  return (
    <Router>
      <Layout user={user} setServer={setServer} server={server} >
        {
          user &&
          <>
            <Route path="/" exact >
              <Home user={user} server={server} username={username} messages={messages} />
            </Route>
            <Route path="/login" exact >
              <Redirect to="/" />
            </Route>
            <Route path="/register" exact >
              <Redirect to="/" />
            </Route>
          </>
        }
        {
          !user &&
          <>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </>
        }
      </Layout>
    </Router>
  );
}

export default App;
