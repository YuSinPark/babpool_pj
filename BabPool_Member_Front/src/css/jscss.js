
import { StyleSheet } from "react-native";
const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        color: 'rgba(130, 183, 236, 0.449)',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 0,
        margin: 0,
        flex: 1,
        height: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        fontStyle: 'calc(10px + 2vmin)',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(130, 183, 236, 0.449)',
        color: 'black',
        margin: 0,
        borderColor: 'rgba(130, 183, 236, 0.449)',
        fontStyle: 'calc(13px + 2vmin)',
    },
    tab: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: 'gray',
        backgroundColor: 'rgb(255, 255, 255)',
        fontStyle: 'calc(10px + 2vmin)',
    },
    activeTab: {
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.449)',
        backgroundColor: 'rgb(255, 255, 255)',
        fontStyle: 'calc(10px + 2vmin)',
    },
});

export default Styles;