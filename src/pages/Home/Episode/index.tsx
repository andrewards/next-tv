import React from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
} from 'react-native';
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { pallete } from '../../../config/style';
import api from '../../../services/api';
import { useState } from 'react';
import io from '../../../services/socket';
import { useEffect } from 'react';


interface Episode {
    id: number;
    name: string;
    season: number;
    episode: number;
    description: string;
    when: string;
    title: {
      id: number;
      id_tmdb: number;
      name: string;
      photo: string,
      description: string,
      type: "tv",
      franch_id: 1,
    }
}

interface EpisodeProps {
    episode: Episode;
    first: boolean;
    defaultWatched: boolean;
}

const Episode: React.FC<EpisodeProps> = ({ episode, first, defaultWatched }) => {

    const [watched, setWatched] = useState(defaultWatched);

    async function handleAddWatch() {
        
        try {
            await api.post('users/1/watch', {
                title_id: episode.title.id,
                episode_id: episode.id,
            });
            io.emit('update_watch');
        } catch(err) {
            console.log('ERRO AO TENTAR CRIAR!');
        }

    }

    async function handleDeleteWatch() {

        try {
            let id_watch = -1;

            const watches = await api.get('/watches');
            watches.data.forEach((watch: any) => {
                if (watch.episode_id === episode.id) {
                    id_watch = watch.id;
                }
            });

            if (id_watch !== -1) {
                await api.delete(`/watches/${id_watch}`);
            }

            io.emit('update_watch');
        } catch(err) {
            console.log('ERRO AO TENTAR DELETAR!');
        }

    }

    return (
        <Pressable onPress={async () => {
            if (watched) {
                await handleDeleteWatch();
                setWatched(false);
            } else {
                await handleAddWatch();
                setWatched(true);
            }
        }} style={ first ? [styles.contentBlock, {marginLeft: 36}] : styles.contentBlock}>
            <Image style={styles.showPhoto} source={{uri: episode.title.photo}} />
            <View style={styles.pelicula}></View>
            <Text style={styles.showName}>{episode.title.name}</Text>
            <View style={styles.wrapper50}>
                <Text style={styles.showTE}>T{episode.season}E{episode.episode}</Text>
                <MaterialIcons name={ watched ? "check-circle" : "circle" } color={pallete.light} size={24} />
            </View>
        </Pressable>
    );
}

export default Episode;