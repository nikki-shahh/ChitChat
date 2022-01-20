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
        green: "#bcffbc",
        blue: "#a2edff",
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
                    <View
                        accessible={false}
                        accessibilityLabel="Chattry Messaging App"
                        accessibilityHint="The title of the app"
                        accessibilityRole="header"
                        style={styles.titlebox}>
                        <Text style={styles.text1}>ChitChat</Text>
                    </View>

                    <View style={styles.box}>
                        <TextInput
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
                                    accessibilityRole="button"
                                    onPress={() => this.changeBackgroundColor(this.colors.pink)}
                                >
                                    <View style={styles.bgColor1}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="button"
                                    onPress={() => this.changeBackgroundColor(this.colors.yellow)}
                                >
                                    <View style={styles.bgColor2}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="button"
                                    onPress={() => this.changeBackgroundColor(this.colors.green)}
                                >
                                    <View style={styles.bgColor3}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="button"
                                    onPress={() => this.changeBackgroundColor(this.colors.blue)}
                                >
                                    <View style={styles.bgColor4}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            style={styles.btn}
                            title="Start Chatting"
                            color={"#d64947"}
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
        backgroundColor: "#151617",
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
    },
    text3: {
        color: "white",
        fontSize: 20,
        lineHeight: 64,
        textAlign: "center",
        backgroundColor: "#ffb2b1"
    },
    textbox: {
        flex: 1,
        height: 50,
        maxHeight: 50,
        borderColor: "gray",
        borderWidth: 1,
        width: "88%",
        padding: 5,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.5,
    },
    text3: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
        marginBottom: 10,
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
        backgroundColor: "#bcffbc",
        borderRadius: 40,
    },
    bgColor4: {
        width: 40,
        height: 40,
        backgroundColor: "#a2edff",
        borderRadius: 40,
    },
    btn: {
        flex: 1,
    },
});
export default Start;