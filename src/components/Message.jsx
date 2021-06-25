import React, { forwardRef } from 'react'

const Message = forwardRef
    (
        (props, ref) => {
            return (
                <div className={`home_container_message ${props.last ? 'last_message' : ''}`} ref={ref}>
                    {props.uid !== props.message.uid &&
                        (
                            <div className="home_container_messages_outer">
                                <p className='home_container_messages_outer_username'> {props.message.username} :  </p>
                                <p>
                                    {props.message.type === "image" &&
                                        (
                                            <img width={70} className="home_container_messages_outer_image" height={70} src={props.message.content} alt="img from server" />
                                        )
                                    }
                                    {
                                        props.message.type === "message" &&
                                        props.message.content
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
                                <p className='home_container_messages_inner_username'> {props.message.username} :  </p>
                                {
                                    props.message.type === "image" &&
                                    (
                                        <img width={70} height={70} className="home_container_messages_inner_image" src={props.message.content} alt="img from server" />
                                    )
                                }
                                {
                                    props.message.type === "message" &&
                                    props.message.content
                                }
                            </div>
                        )
                    }
                </div>)
        }
    )


export default Message
