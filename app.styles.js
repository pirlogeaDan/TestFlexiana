import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
    },
    input: {
        width: screenWidth - 20,
        height: 45,
        padding: 4,
        fontSize: 16,
        borderColor: '#3a3a3a',
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        height: 45,
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    back_button: {
        height: 45,
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'gray',
        fontSize: 18,
        alignSelf: 'center',
    },
    list_text: {
        color: 'gray',
        fontSize: 15,
    }
});