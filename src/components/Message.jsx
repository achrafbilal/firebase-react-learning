import React, { forwardRef } from 'react'

import ImageIcon from '@material-ui/icons/Image';
const Message = forwardRef
    (
        (props, ref) => {
            const openModal = (e) => {
                props.setImageOpen(true)
                props.setImage(props.message.content)
            }
            return (
                <div className={`home_container_message ${props.last ? 'last_message' : ''}`} ref={ref}>
                    {props.uid !== props.message.uid &&
                        (
                            <div className="home_container_messages_outer">
                                <p className='home_container_messages_outer_username'>{props.message.username} :   </p>
                                <p>
                                    {
                                        props.message.type === "image" ?
                                            (
                                                <ImageIcon color="secondary" onClick={openModal} className="home_container_foot_send_form_input_image_icon" />
                                            )
                                            :
                                            (
                                                props.message.content
                                            )
                                    }
                                </p>
                            </div>
                        )
                    }
                    <div className="home_container_messages_mid">

                    </div>

                    {
                        props.uid === props.message.uid &&
                        (
                            <div className="home_container_messages_inner">
                                {
                                    props.message.type === "image" ?
                                        (
                                            <ImageIcon color="secondary" onClick={openModal} className="home_container_foot_send_form_input_image_icon" />
                                        )
                                        :
                                        (
                                            props.message.content
                                        )
                                }
                            </div>
                        )
                    }
                </div>)
        }
    )


export default Message
