import { useState } from 'react'
import Layout from '../components/Layout'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
function App() {
  const { logout, user, } = useAuth()
  console.log("user", user);
  return (
    <Router>
      <Layout>
        {
          user &&
          <>
            <Route path="/logout" exact >
              {
                "logout"
              }
            </Route>
            <Route path="/" exact >
              <h1>
                test
              </h1>
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
