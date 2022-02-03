import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView, LogBox } from "react-native";
import { Bubble, GiftedChat, SystemMessage, Day, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import firebase from "firebase";
import "firebase/firestore";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

class Chat extends Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
            isConnected: false,
            image: null,
            location: null
        }

        //initializing firebase
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCdDNojL6bmpEafy722yA4Ld2gqfCsws8Q",
                authDomain: "chitchat-c8889.firebaseapp.com",
                projectId: "chitchat-c8889",
                storageBucket: "chitchat-c8889.appspot.com",
                messagingSenderId: "822826540714",
                appId: "1:822826540714:web:08456a0eb5ed494de4fad3"
            });
        }
        //register for updates
        this.referenceChatMessages = firebase.firestore().collection("messages");

        // To remove warning message in the console 
        LogBox.ignoreLogs([
            'Setting a timer',
            'Warning: ...',
            'undefined',
            'Animated.event now requires a second argument for options',
        ]);

    }

    //saves current state into asyncStorage
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    //loads the messages from asyncStorage
    async getMessages() {
        let messages = '';
        try {
            messages = (await AsyncStorage.getItem('messages')) || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    //deletes stored messages
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    // display static message 
    componentDidMount() {
        //gets user name from start screen
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name ? name : "Anonymous" });
        //represent the connection status
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');

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
                        },
                        isConnected: true
                    });

                    // listens for updates in the collection
                    this.unsubscribe = this.referenceChatMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
                });
                this.saveMessages();
            } else {
                this.setState({ isConnected: false });
                // get saved messages from local AsyncStorage
                this.getMessages();
            }
        });

        // system message when user enters chat room
        const systemMsg = {
            _id: `sys-${Math.floor(Math.random() * 100000)}`,
            text: `${name ? name : "Anonymous"} joined the conversation 👋`,
            createdAt: new Date(),
            system: true
        }
        this.referenceChatMessages.add(systemMsg);
    }


    componentWillUnmount() {
        // stops listening 
        if (this.state.isConnected) {
            this.authUnsubscribe();
            this.unsubscribe();
        }
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
                system: data.system,
                user: data.user,
                image: data.image,
                location: data.location,
            });
        });
        this.setState({ messages });
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
            image: message.image || null,
            location: message.location || null,
        });
    }

    // Updates the state by appending the last sent message to the rest
    onSend(newMessages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessages),
        }),
            () => {
                this.addMessages();
                this.saveMessages();
            })
    }

    //render the default toolbar when the user id online
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar {...props} />
            );
        }
    }

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
                textStyle={{
                    right: {
                        color: '#4e6669',
                    },
                    left: {
                        color: '#67868a',
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

    //creates circle button
    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    //custom map view
    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }


    render() {
        let { bgColor } = this.props.route.params;
        return (
            <View style={{ flex: 1, backgroundColor: bgColor, }} >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    messages={this.state.messages}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
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