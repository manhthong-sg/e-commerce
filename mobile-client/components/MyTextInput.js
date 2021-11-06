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

const styles = StyleSheet.create({
    wrap:{
        
    },
    container:{ 
        alignItems: 'center',
        paddingTop: 50,
    },
    TextInput:{
        flexDirection: 'row',
        backgroundColor: COLORS.xam1,
        padding: 13,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: COLORS.tertiary,
    },
    InputLabel:{
        color: COLORS.black,
        fontSize: 13,
        textAlign: 'left'
    },
    LeftIcon:{
        left: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon:{
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },
    Button:{
        padding: 15,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    },
    ButtonGoogle:{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    }
})
