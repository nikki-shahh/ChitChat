import React, { Component } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

//import images//
import bgImage from "../assets/image/chitchat.jpeg";

/*
 * Start component where the user can type 
 * a name and pick a background color
 * to use during the chat
 */

class Start extends Component {

    state = {
        name: "",
        bgColor: "",
    };


    changeBackgroundColor = (newColor) => {
        this.setState({ bgColor: newColor });
    };

    // The colors for the swatch
    colors = {
        pink: "#ffb2b1",
        yellow: "#fff3ad",
        orange: "#f1cdb0",
        blue: "#97f2f3",
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
                    <View
                        accessible={false}
                        accessibilityLabel="ChitChat Messaging App"
                        accessibilityHint="The title of the app"
                        accessibilityRole="header"
                        style={styles.titlebox}>
                        <Text style={styles.text1}>ChitChat</Text>
                    </View>

                    <View style={styles.box}>
                        <TextInput
                            accessible={true}
                            accessibilityLabel="Your Name"
                            accessibilityHint="Type the name you want to use in the chat session"
                            style={styles.textbox} //input
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            placeholder="Type Your Name Here ... "
                        />
                        <View style={styles.bgChange}>
                            <Text style={styles.text3}>Choose Background Color </Text>
                            <View style={styles.colorChange}>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select pink background"
                                    accessibilityRole="button"
                                    accessibilityHint="Lets you choose a background for the chat screen"
                                    onPress={() => this.changeBackgroundColor(this.colors.pink)}
                                >
                                    <View style={styles.bgColor1}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select yellow background"
                                    accessibilityRole="button"
                                    accessibilityHint="Lets you choose a background for the chat screen"
                                    onPress={() => this.changeBackgroundColor(this.colors.yellow)}
                                >
                                    <View style={styles.bgColor2}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select orange background"
                                    accessibilityRole="button"
                                    accessibilityHint="Lets you choose a background for the chat screen"
                                    onPress={() => this.changeBackgroundColor(this.colors.orange)}
                                >
                                    <View style={styles.bgColor3}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select blue background"
                                    accessibilityRole="button"
                                    accessibilityHint="Lets you choose a background for the chat screen"
                                    onPress={() => this.changeBackgroundColor(this.colors.blue)}
                                >
                                    <View style={styles.bgColor4}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            accessible={true}
                            accessibilityLabel="Start texting"
                            accessibilityHint="Lets you start a new chat session"
                            accessibilityRole="button"
                            style={styles.btn}
                            title="Start Chatting"
                            color={"#e18d96"}
                            containerViewStyle={{ width: "100%", marginLeft: 0 }}
                            onPress={() => this.props.navigation.navigate("Chat", {
                                name: this.state.name,
                                bgColor: this.state.bgColor,
                            })
                            }
                        />

                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffece6",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bgImage: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },

    text1: {
        flexGrow: 1,
        fontSize: 40,
        flexShrink: 1,
        fontWeight: "900",
        color: "#ffb2b1",
        paddingTop: 260,
    },
    titlebox: {
        height: '44%',
    },
    box: {
        flexGrow: 1,
        flexShrink: 0,
        width: "88%",
        marginBottom: 30,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 30,
        height: 260,
        minHeight: 260,
        maxHeight: 290,
        borderRadius: 20,
        backgroundColor: "rgba(103,134,138,0.1)",
    },
    text3: {
        fontSize: 16,
        lineHeight: 64,
        textAlign: "center",
        fontWeight: "300",
        color: "#67868a",
        marginBottom: 10,
    },
    textbox: {
        flex: 1,
        height: 50,
        maxHeight: 50,
        borderColor: "#67868a",
        borderWidth: 1,
        width: "88%",
        padding: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "300",
        color: "black",
        opacity: 0.5,
    },
    bgChange: {
        flex: 1,
        padding: 20,
        marginTop: 5,
    },
    colorChange: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bgColor1: {
        width: 40,
        height: 40,
        backgroundColor: "#ffb2b1",
        borderRadius: 40,
    },
    bgColor2: {
        width: 40,
        height: 40,
        backgroundColor: "#fff3ad",
        borderRadius: 40,
    },
    bgColor3: {
        width: 40,
        height: 40,
        backgroundColor: "#f1cdb0",
        borderRadius: 40,
    },
    bgColor4: {
        width: 40,
        height: 40,
        backgroundColor: "#97f2f3",
        borderRadius: 40,
    },
    btn: {
        flex: 1,
    },
});
export default Start;