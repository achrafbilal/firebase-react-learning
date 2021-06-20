import React, { forwardRef } from 'react'

const Message = forwardRef
    (
        (props, ref) => {
            return (
                <div className="home_container_message" ref={ref}>
                    {props.uid !== props.message.uid &&
                        (
                            <div className="home_container_messages_outer">
                                {props.message.type === "image" &&
                                    (
                                        <img width={70} height={70} src={props.message.content} alt="img from server" />
                                    )
                                }
                                {
                                    props.message.type === "message" &&
                                    props.message.content
                                }
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
                                    props.message.type === "image" &&
                                    (
                                        <img width={70} height={70} src={props.message.content} alt="img from server" />
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
