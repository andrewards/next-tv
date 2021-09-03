import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import Group from './Group';
import HeaderProgress from './Header';

const Home: React.FC = () => {

    const [ groups, setGroups ] = useState<Array<{ id: number; name: string; }> | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const groups = await AsyncStorage.getItem('@groups');
                if (groups) {
                    setGroups(JSON.parse(groups));
                } else {
                    const groups = await api.get('/groups');
                    setGroups(groups.data);
                    await AsyncStorage.setItem('@groups', JSON.stringify(groups.data));
                }
            } catch(err) {
                console.log(err.message); 
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <HeaderProgress />

            <View style={styles.groupsSection}>
                <ScrollView
                    style={styles.scrollVertical}
                    showsVerticalScrollIndicator={false}
                >
                    {groups?.map((group, index) => {
                        return <Group group_id={group.id} key={index} />
                    })}
                </ScrollView>
            </View>
            <StatusBar style="light" />
        </View>
    );
}

export default Home;