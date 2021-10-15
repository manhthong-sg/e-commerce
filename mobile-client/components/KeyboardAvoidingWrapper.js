import React from 'react'
import { 
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard, 

} from 'react-native'

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper

const styles = StyleSheet.create({})
