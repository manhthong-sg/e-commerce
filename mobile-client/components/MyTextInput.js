import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MyTextInput = ({label, icon,isPassword,hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View style={{marginTop: 20, width: 300}}>
            <View style={styles.LeftIcon}>
                <Octicons
                    name={icon}
                    size={25}
                    color={COLORS.brand}
                />
            </View>
            <Text style={styles.InputLabel}>
                {label}
            </Text>
            
            {
                !isDate && <TextInput 
                style = {styles.TextInput}
                {...props}
            />
            }
            {
                isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput 
                        style = {styles.TextInput}
                        {...props}
                    />
                </TouchableOpacity>)
            }

            {
                isPassword && (
                    <View style={styles.RightIcon}>
                        <Ionicons
                            size={25}
                            color={COLORS.darklight}
                            name={hidePassword ? 'md-eye-off': 'md-eye'}
                            onPress={()=>setHidePassword(!hidePassword)}
                        />
                    </View>
                )
            }
            
        </View>
        )
}

export default MyTextInput

const styles = StyleSheet.create({})
