import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import storage from 'firebase/storage';
import firestore from 'firebase/firestore';
//import storage from 'firebase/storage';



firebase.initializeApp(
    {
        apiKey: "AIzaSyDhBUj0pa9HrZ_V18Yhu65FWpzfYwBlOz0",
        authDomain: "server-soutenance.firebaseapp.com",
        projectId: "server-soutenance",
        storageBucket: "server-soutenance.appspot.com",
        messagingSenderId: "519811468495",
        appId: "1:519811468495:web:6c9d81a7c5366260b03bba"
    }

)

const AuthContext = createContext();
export const useAuth = () => (
    useContext(AuthContext)
)
export const database = firebase.firestore();
export const stock = firebase.storage();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(true)

    const signIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(rep => true)

    }
    const signUp = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(rep => true)
    }





    const signInWithEmailLink = (email, code) => {
        return firebase.auth().signInWithEmailLink(email, code).then(
            result => {
                setUser(result.user)
                return true
            }
        )
    }
    const logout = () => {
        let a = firebase.auth().signOut().then(() => setUser(null))
        return a
    }

    useEffect(
        () => {
            const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                setUser(user)
                setIsAuth(false)
            })
            return () => unsubscribe()
        },
        []
    )


    const values = {
        user, isAuth, signInWithEmailLink, logout, signIn, signUp
    }
    return (
        <AuthContext.Provider value={values}>
            {!isAuth && children}
        </AuthContext.Provider>
    )
}