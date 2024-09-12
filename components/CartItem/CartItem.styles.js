import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cartLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartDescription: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10,
        flex: 1,
    },
    quantity: {
        fontSize: 20,
        color: '#333',
        marginHorizontal: 10, 
        fontWeight: 'bold', 
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    text: {
        color: 'green',
        fontSize: 18,
        marginVertical: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    buttonOpacityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonOpacity: {
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
});
