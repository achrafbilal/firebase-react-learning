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
  const [username, setUsername] = useState("user")
  const getMessages = (id) => {
    if (id && user)
      database
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot
        (
          s => {
            let a = s.docs.filter(e => e.data().server === id)
            let m = a.map(e => ({ id: e.id, ...e.data() }))

            setMessages(m)
          }
        )
  }
  useEffect(
    () => {
      if (messages.length > 0 && user)
        document.getElementById('last_message').scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [messages, user, username])


  const setServer = (newServer) => {

    if (user) {
      if (newServer) {
        getMessages(newServer.id)
        changeServer(newServer)
      }
      else {
        changeServer(null)
        setMessages([])
      }
    }

  }



  return (
    <Router>
      <div >
        <Layout user={user} setServer={setServer} server={server} username={username} setUsername={setUsername}  >
          {
            user &&
            <>
              <Route path="/" exact >
                {
                  username &&
                  <Home user={user} server={server} username={username} messages={messages} />

                }
              </Route>
              <Route path="/login" exact >
                <Redirect to="/" />
              </Route>
              <Route path="/register" exact >
                <Redirect to="/" />
              </Route>
              <Route path="/logout" exact >
                <Redirect to="/login" />
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
      </div>
    </Router>
  );
}

export default App;
