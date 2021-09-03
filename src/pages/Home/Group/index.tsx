import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import api from '../../../services/api';
import { pallete } from '../../../config/style';
import styles from './style';
import Episode from '../Episode';
import io from '../../../services/socket';

interface GroupProps {
    group_id: number;
}

interface Group {
    id: 3;
    name: string;
    episodes: Array<Episode>;
}

interface Watch {
    user_id: number;
    title_id: number;
    episode_id: number;
}

const Group: React.FC<GroupProps> = ({ group_id }) => {

    const [ watches, setWatches ] = useState<Array<Watch>>([]);

    const [group, setGroup] = useState<Group | null>(null);
    const [ref, setRef] = useState<ScrollView | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const group = await api.get(`/groups/${group_id}`);
                setGroup(group.data);

                const watchesFromDB = await api.get('/watches');
                const watches = watchesFromDB.data;

                setWatches(watches);
            } catch(err) {
                console.log(err.message);
            }
        })();

        io.on('update_watch', async () => {
            const watchesFromDB = await api.get('/watches');
            const watches = watchesFromDB.data;

            setWatches(watches);
        });
    }, []);

    useEffect(() => {
        if (ref) {
            ref.scrollTo({x: countGroupWatchedEps() * 150});
        }
    }, [ref]);

    function countGroupWatchedEps() {
        let counteps = 0;
        group?.episodes.forEach((episode: Episode) => {
            watches.forEach((watch: Watch) => {
                if (watch.episode_id === episode.id) {
                    counteps++;
                }
            });
        });

        return counteps;
    }

    function calculatePercent() {

        let calculated;
        if (group) {
            calculated = Math.floor((countGroupWatchedEps() * 100) / group.episodes.length);
        } else {
            calculated = 0;
        }

        return calculated;
    }

    return (watches.length === 0 || !group) ? <Progress.CircleSnail color={pallete.primary} thickness={4} size={70} /> : (
        <View style={styles.group} key={group_id}>
            <View style={[styles.wrapper50, {paddingRight: 36}]}>
                <Text style={styles.titleGroup}>{group?.name}</Text>
                <View style={[styles.wrapper50, { width: 'auto' }]}>
                    <Progress.Bar progress={calculatePercent() / 100} color={pallete.primary} style={{marginRight:10}} width={50} unfilledColor={pallete.dark_2} borderWidth={0} />
                    <Text style={styles.percent}>{calculatePercent()}%</Text>
                </View>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.content}
                ref={ref => {
                    if (ref) {
                        setRef(ref);
                    }
                }}
            >
                {group?.episodes.map((episode, id) => {
                    let watched = false;
                    watches.forEach(watch => {
                        if (watch.episode_id === episode.id) {
                            watched = true;
                        }
                    });
                    return (
                        <Episode defaultWatched={watched} first={id === 0} key={id} episode={episode} />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Group;