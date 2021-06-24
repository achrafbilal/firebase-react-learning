import React, { useEffect, useRef, useState, } from 'react'
// import FlipMove from 'react-flip-move';
import Message from '../components/Message';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import { database, stock } from '../hooks/useAuth'
function Home({ server, user, username, messages }) {
    const [message, setMessage] = useState('')
    const inputFile = useRef(null)
    const send = () => {
        if (message.length < 1) {
            return;
        }
        const m = {
            username: username,
            content: message,
            timestamp: (new Date()),
            server: server.id,
            type: 'message',
            uid: user.uid
        }
        database
            .collection('messages')
            .add(m)
        setMessage("")



    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            send()
        }
    }

    const handleImage = (ev) => {
        const image = ev.target.files[0];
        if (!image) return null;
        const parts = image.name.split('.');
        const name = `${user.uid}_${Date.now()}.${parts[parts.length - 1]}`;
        const ref = stock.ref(`images/${name}`);
        const task = ref.put(image)
        task.on
            (
                'state_changed',
                snapshot => {
                },
                error => {
                    console.log(error)
                },
                () =>
                    stock
                        .ref('images')
                        .child(name)
                        .getDownloadURL()
                        .then
                        (
                            (url) => {
                                const obj = {
                                    username: username,
                                    content: url,
                                    server: server.id,
                                    type: 'image',
                                    uid: user.uid,
                                    timestamp: (new Date())
                                }
                                database
                                    .collection('messages')
                                    .add(obj)
                            }
                        )
            )
    }
    return (

        (user && server) &&
        <div className="home_container">

            <div className="home_container_messages">
                {
                    messages.length > 0 ?
                        <>
                            {/* <FlipMove duration={900}>
                                {
                                    messages.map
                                        (
                                            m => {
                                                return (
                                                    <Message message={m} key={m.id} uid={user.uid} />
                                                )
                                            }
                                        )
                                }

                            </FlipMove> */}
                            {
                                messages.map
                                    (
                                        (m, i) => {
                                            return (
                                                <Message message={m} key={m.id} uid={user.uid} last={i === messages.length - 1} />
                                            )
                                        }
                                    )
                            }
                            <div id="last_message">
                            </div>
                        </>
                        : <></>
                }

            </div>


            <div className="home_container_foot" >

                <div className="home_container_foot_send_form">
                    <div className="home_container_foot_send_form_input_container">
                        <div className="home_container_foot_send_form_input">
                            <input onKeyPress={handleKeyPress} type="text" onInput={(e) => setMessage(e.target.value)} placeholder="Entrez votre message ici et tapez Entrer ou clicker sur le bouton Envoyer " className="home_container_foot_send_form_input_element" value={message} />
                            <ImageIcon color="primary" onClick={() => inputFile.current.click()} className="home_container_foot_send_form_input_image_icon" />
                            <SendIcon color={message.length < 1 ? 'disabled' : 'primary'} className="home_container_foot_send_form_input_send_icon" onClick={send} />
                            <input type='file' id='file' onChange={handleImage} accept="image/png, image/gif, image/jpeg" ref={inputFile} style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className="home_container_foot_send_form_extra_container">
                        <div className="home_container_foot_send_form_extra">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
