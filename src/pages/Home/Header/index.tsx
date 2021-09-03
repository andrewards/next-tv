import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
} from 'react-native';
import styles from './style';
import ProgressCircle from 'react-native-progress-circle';
import { pallete } from '../../../config/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/api';
import io from '../../../services/socket';

interface Watch {
    user_id: number;
    title_id: number;
    episode_id: number;
}

const HeaderProgress: React.FC = () => {

    const [ watches, setWatches ] = useState<Array<Watch>>([]);

    const [ totalEpisodes, setTotalEpisodes ] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const totalEpisodes = await AsyncStorage.getItem('@total');
            if (totalEpisodes) {
                setTotalEpisodes(Number(totalEpisodes));
            } else {
                const episodes = await api.get('/episodes');
                const total = episodes.data.length;
                setTotalEpisodes(total);
                await AsyncStorage.setItem('@total', JSON.stringify(total));
            }

            const watchesFromDB = await api.get('/watches');
            const watches = watchesFromDB.data;
            
            setWatches(watches);
        })();

        io.on('update_watch', async () => {
            const watchesFromDB = await api.get('/watches');
            const watches = watchesFromDB.data;

            setWatches(watches);
        });
    }, []);

    function calculatePercent() {
        if (totalEpisodes === 0) return 0;
        return Math.floor((watches.length * 100) / totalEpisodes);
    }

    return (
        <View style={styles.progress}>
            <View style={styles.headerText}>
                <Text style={styles.title}>Arrowverse</Text>
                <Text style={styles.counting}>{watches.length} de {totalEpisodes} episódios assistidos</Text>
            </View>
            <ProgressCircle
                percent={calculatePercent()}
                radius={60}
                borderWidth={8}
                color={pallete.primary}
                shadowColor={pallete.dark_2}
                bgColor={pallete.dark}
            >
                <Text style={styles.textPercent}>{calculatePercent()}%</Text>
            </ProgressCircle>
        </View>
    );
}

export default HeaderProgress;