import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width / 2 - 20;

export default StyleSheet.create({
    container: {
        width: imageWidth,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: imageWidth * 1.5,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    modalContent: {
        width: '100%',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e91e63',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '48%',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonAdd: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 5,
    },
});
