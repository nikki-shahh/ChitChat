import React, { Component } from "react";
import { View, Text, Button } from 'react-native';


class Chat extends Component {
    render() {
        let { name, bgColor } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bgColor,
                }}
            >
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate("Start")}
                />
            </View>
        );
    }
}
export default Chat;