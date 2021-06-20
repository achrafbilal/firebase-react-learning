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
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(true)

    const sendSignInLinkToEmail = email => {
        return firebase.auth().sendSignInLinkToEmail(email, {
            url: 'http://localhost:3000/confirm',
            handleCodeInApp: true
        }).then((resp) => {
            return true
        })
    }
    const signIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(rep => true)

    }
    const signUp = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(rep => true)
    }
    const saveImage = async (image, server) => {

        if (!image) return null;
        const parts = image.name.split('.');
        const name = `${user.uid}_${Date.now()}.${parts[parts.length - 1]}`;
        const ref = firebase.storage().ref(`images/${name}`);
        const task = ref.put(image)
        task.on
            (
                'state_changed',
                snapshot => {
                    console.log(snapshot)
                },
                error => {
                    console.log(error)
                },
                () =>
                    firebase.storage()
                        .ref('images')
                        .child(name)
                        .getDownloadURL()
                        .then
                        (
                            (url) => {
                                console.log(url)
                                const obj = {
                                    content: url,
                                    server: `/servers/${server}`,
                                    type: 'image',
                                    uid: user.uid,
                                    timestamp: (new Date())
                                }
                                const message = firebase.firestore().collection("messages").doc();
                                message.set(obj)
                                    .then(() => {
                                        console.log("Document successfully written!");
                                    })
                                    .catch((error) => {
                                        console.error("Error writing document: ", error);
                                    });
                            }
                        )
            )

    }
    const getMessages = async (server, messages, setMessages) => {
        let m = [];
        firebase.firestore().collection('messages')
            .onSnapshot((snapshot) => {
                console.log(snapshot.docs.length)
                snapshot.forEach((doc) => {
                    m.push(doc.data())
                    //setMessages([...messages, doc.data()])
                })
                setMessages(m)
            })
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
        user, isAuth, sendSignInLinkToEmail, signInWithEmailLink, logout, signIn, saveImage, getMessages
    }
    return (
        <AuthContext.Provider value={values}>
            {!isAuth && children}
        </AuthContext.Provider>
    )
}