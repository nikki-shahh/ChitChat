import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView, LogBox } from "react-native";

//IMPORT GIFTED CHAT LIBRARY
import { Bubble, GiftedChat, SystemMessage, Day } from "react-native-gifted-chat";

//import Firestore
import firebase from "firebase";
import "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdDNojL6bmpEafy722yA4Ld2gqfCsws8Q",
    authDomain: "chitchat-c8889.firebaseapp.com",
    projectId: "chitchat-c8889",
    storageBucket: "chitchat-c8889.appspot.com",
    messagingSenderId: "822826540714",
    appId: "1:822826540714:web:08456a0eb5ed494de4fad3"
};


class Chat extends Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            uid: 1,
            user: {
                _id: 1,
                name: "",
                avatar: "",
            }
        };

        //initializing firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        //register for updates
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.referenceChatUser = null;

        // To remove warning message in the console 
        LogBox.ignoreLogs([
            'Setting a timer',
            'Warning: ...',
            'undefined',
            'Animated.event now requires a second argument for options',
        ]);

    }

    // display static message 
    componentDidMount() {
        //gets user name from start screen
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name ? name : "Anonymous" });

        // user authentication
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            //updates user state with currently active user data
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: "https://placeimg.com/140/140/any",
                }
            });
            //referencing messages of current user
            this.referenceChatUser = firebase.firestore().collection("messages").where("uid", "==", this.state.uid);
            // listens for updates in the collection
            this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
        });
    };

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

    // updates messages state with the current data 
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // goes through each document
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                createdAt: data.createdAt.toDate(),
                text: data.text || "",
                user: data.user
            });
        });
        this.setState({
            messages: messages
        });
    };

    //stores messages in the collection
    addMessages() {
        const message = this.state.messages[0];
        // adds a new messages to the collection
        this.referenceChatMessages.add({
            uid: this.state.uid,
            user: this.state.user,
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
        });
    }

    // Updates the state by appending the last sent message to the rest
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
            () => {
                this.addMessages();
            })
    }

    // Renderes a customized chat bubble
    // that rapresents a text bubble with custon background color

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

    // Renders a customized system message
    renderSystemMessage(props) {
        return <SystemMessage {...props} textStyle={{ color: "#67868a" }} />;
    }

    // Renders a customized date 
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
            <View style={{ flex: 1, backgroundColor: bgColor, }} >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    }
}
export default Chat;