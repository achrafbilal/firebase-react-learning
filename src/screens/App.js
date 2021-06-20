import { useState } from 'react'
import Layout from '../components/Layout'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Home from './Home'
function App() {
  const { user, saveImage, getMessages } = useAuth()
  return (
    <Router>
      <Layout>
        {
          user &&
          <>

            <Route path="/" exact >
              <Home saveImage={saveImage} getMessages={getMessages} user={user} />
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
