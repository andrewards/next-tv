import { StyleSheet } from 'react-native';
import { pallete } from '../../../config/style';

export default StyleSheet.create({
    group: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
    },
    titleGroup: {
        fontFamily: 'Poppins_700Bold',
        color: pallete.light,
        fontSize: 18,
        paddingLeft: 36,
    },
    content: {
        maxHeight: 120,
    },
    percent: {
        color: pallete.light,
        fontFamily: 'Poppins_400Regular',
        fontSize: 8,
    },
    wrapper50: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    }
});