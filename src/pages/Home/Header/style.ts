import { StyleSheet } from 'react-native';
import { pallete } from '../../../config/style';

export default StyleSheet.create({
    headerText: {
        maxWidth: '50%',
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        color: pallete.primary,
        fontSize: 24,
    },
    counting: {
        fontFamily: 'Poppins_400Regular',
        color: pallete.light,
        fontSize: 14,
    },
    textPercent: {
        color: pallete.light,
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
    },
    progress: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingLeft: 36,
        paddingRight: 36,
    },
});