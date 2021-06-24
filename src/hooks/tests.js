const send_message = (message) => {
    firebase.firestore().collection('messages')
        .add(message)

}
const listen_messages = (server, setMessages) => {
    firebase.firestore().collection('messages')
        .onSnapshot((snapshot) => {
            let m = []
            console.log(snapshot.docs.length)
            snapshot.forEach((doc) => {
                m.push(doc.data())
                //setMessages([...messages, doc.data()])
            })
            setMessages(m)
            m = []
        })
}

