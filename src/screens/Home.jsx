import React, { useEffect, useRef, useState, } from 'react'
import FlipMove from 'react-flip-move';
import Message from '../components/Message';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
function Home(props) {
    const [image, setImage] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [cpt, setCpt] = useState(102);
    const getMessages = () => {
        props.getMessages("DP1k5X0gMYSb0726aDmO", messages, setMessages)
        // let m = [];
        // for (let index = 0; index < 100; index++) {
        //     m.push({
        //         id: index,
        //         content: `Message no ${index}`,
        //         date: `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`,
        //         sender: (Math.floor(Math.random() * 2))
        //     })
        //     setMessages(m);

        // }
    }

    const gotop = () => {
        if (message.length < 1) {
            return;
        }
        return;
        const el = document.getElementById('top_messages');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setMessages([{
            id: cpt,
            content: message,
            date: `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`,
            sender: (Math.floor(Math.random() * 2))
        }, ...messages]);
        setCpt(cpt + 1)
        setMessage('')
    }
    useEffect(() => {
        getMessages()
    }, [])
    const inputFile = useRef(null)
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            gotop()
        }
    }
    const handleImage = (ev) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            setImage(e.target.result);
        };

        reader.readAsDataURL(ev.target.files[0]);
        console.log(props.saveImage(ev.target.files[0], "DP1k5X0gMYSb0726aDmO"))
    }
    return (
        <div className="home_container">
            <div className="home_container_messages">
                <div id="top_messages">
                    <img src={image} width={100} height={100} />
                </div>
                <FlipMove>
                    {messages.map((m, i) => {
                        return (
                            <Message message={m} key={"k_" + m.id} index={i} uid={props.user.uid} />
                        )
                    })}
                </FlipMove>
            </div>

            <div className="home_container_foot" >

                <div className="home_container_foot_send_form">
                    <div className="home_container_foot_send_form_input_container">
                        <div className="home_container_foot_send_form_input">
                            <input onKeyPress={handleKeyPress} type="text" onInput={(e) => setMessage(e.target.value)} placeholder="Entrez votre message ici et tapez Entrer ou clicker sur le bouton Envoyer " className="home_container_foot_send_form_input_element" value={message} />
                            <ImageIcon color="primary" onClick={() => inputFile.current.click()} className="home_container_foot_send_form_input_image_icon" />
                            <SendIcon color={message.length < 1 ? 'disabled' : 'primary'} className="home_container_foot_send_form_input_send_icon" onClick={gotop} />
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
