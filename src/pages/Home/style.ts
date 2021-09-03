import { StyleSheet } from 'react-native';
import { pallete } from '../../config/style';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: pallete.dark,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        paddingTop: 40,
        paddingBottom: 40,
    },
    groupsSection: {
        marginTop: 20,
        width: '100%',
    },
    scrollVertical: {
        maxHeight: 380,
    },
});