import { StyleSheet } from 'react-native';
import { pallete } from '../../../config/style';

export default StyleSheet.create({
    contentBlock: {
        width: 130,
        height: 100,
        backgroundColor: pallete.dark_2,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderRadius: 10,

        paddingLeft: 10,
        paddingRight: 10,

        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    showName: {
        color: pallete.light,
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
    },
    showPhoto: {
        width: 130,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
        position: 'absolute',
    },
    pelicula: {
        width: 130,
        height: 100,
        borderRadius: 10,
        backgroundColor: pallete.dark + '55',
        position: 'absolute',
    },
    showTE: {
        color: pallete.light,
        fontFamily: 'Poppins_400Regular',
        marginTop: 5,
        fontSize: 16,
    },
    wrapper50: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
});