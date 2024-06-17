import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhotoPost = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigation = useNavigation();

    const fetchPosts = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await fetch(`http://localhost:3000/api/posts/listPosts?page=${page}&limit=30`, {
                headers: {
                    "Authorization": token
                }
            });
            const result = await response.json();
            if (response.status === 200) {
                setPosts(result.data.posts);
                setTotalPages(result.data.totalPages);
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch posts');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const loadMorePosts = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <View style={styles.outerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/rightarrow-1.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <ScrollView 
                contentContainerStyle={styles.container}
                onMomentumScrollEnd={loadMorePosts}
            >
                <View style={styles.grid}>
                    {posts.map((item) => (
                        <TouchableOpacity 
                            key={item.post_id} 
                            onPress={() => navigation.navigate('PostDetail', { post: item })}
                            style={styles.imageContainer}
                        >
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: '32%',
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 1,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
});

export default PhotoPost;
