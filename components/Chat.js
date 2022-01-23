import React, { Component } from "react";
import { Text, View, Platform, KeyboardAvoidingView } from 'react-native';

//IMPORT GIFTED CHAT LIBRARY
import { Bubble, GiftedChat, SystemMessage, Day, } from "react-native-gifted-chat";


class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        };
    }
    /*
    * display static message
    */
    componentDidMount() {
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "Hello " + name,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "name",
                        avatar: "https://placeimg.com/140/140/any"
                    },
                },
                {
                    _id: 2,
                    text: `${name ? name : "Anonymous"} joined the conversation 👋`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        });
    }

    /*
    * Updates the state by appending the last sent message to the rest
    */
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    /*
    * Renderes a customized chat bubble
    * that rapresents a text bubble with custon background color
    */
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#cfcfc4",
                    },
                    left: {
                        backgroundColor: "#f6f6eb",
                    }
                }}
            />
        )
    }

    /* Renders a customized system message */
    renderSystemMessage(props) {
        return <SystemMessage {...props} textStyle={{ color: "#67868a" }} />;
    }

    /* Renders a customized date */
    renderDay(props) {
        return <Day
            {...props}
            textStyle={{
                color: "#67868a",
                padding: 5,
            }}
        />;
    }


    render() {
        let { bgColor } = this.props.route.params;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: bgColor,
                }}
            >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    }
}
export default Chat;