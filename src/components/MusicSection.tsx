"use client";

import { useState, useRef, useEffect } from "react";

interface Track {
    id: number;
    title: string;
    src: string;
    duration: number;
    plays: number;
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
    bpm: number;
    waveform: number[];
}

interface Props {
    tracks: Track[];
    setTracks: (tracks: Track[] | ((prev: Track[]) => Track[])) => void;
    currentPlayingId: number | null;
    setCurrentPlayingId: (id: number | null) => void;
    showToast: (title: string, message: string, type?: 'success' | 'info') => void;
}

export default function MusicSection({ tracks, setTracks, currentPlayingId, setCurrentPlayingId, showToast }: Props) {
    const [view, setView] = useState("list");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
        
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            const trackIdx = tracks.findIndex(t => t.src === audio.getAttribute('src'));
            if (trackIdx !== -1) {
                setTracks(prev => prev.map((t, idx) => idx === trackIdx ? { ...t, duration: audio.duration } : t));
            }
        };

        const handleEnded = () => {
            setCurrentPlayingId(null);
            setCurrentTime(0);
            showToast('Playback Finished', 'Track ended', 'info');
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [tracks, setTracks, setCurrentPlayingId, showToast]);

    const togglePlay = (track: Track) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (currentPlayingId === track.id) {
            audio.pause();
            setCurrentPlayingId(null);
        } else {
            if (audio.getAttribute('src') !== track.src) {
                audio.src = track.src;
                audio.load();
            }
            audio.play().catch(err => {
                console.warn("Playback failed", err);
            });
            setCurrentPlayingId(track.id);
            showToast('Now Playing', track.title, 'info');
            
            setTracks(prev => prev.map(t => t.id === track.id ? { ...t, plays: t.plays + 1 } : t));
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>, trackId: number) => {
        if (currentPlayingId !== trackId || !audioRef.current || isNaN(audioRef.current.duration)) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = percent * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleLike = (id: number) => {
        const track = tracks.find(t => t.id === id);
        if (!track) return;
        
        const newLiked = !track.liked;
        if (newLiked) showToast('Liked!', track.title, 'success');

        setTracks(prev => prev.map(t => {
            if (t.id === id) {
                return { 
                    ...t, 
                    liked: newLiked, 
                    likes: newLiked ? t.likes + 1 : t.likes - 1,
                    disliked: false,
                    dislikes: t.disliked ? t.dislikes - 1 : t.dislikes
                };
            }
            return t;
        }));
    };

    const toggleDislike = (id: number) => {
        setTracks(prev => prev.map(t => {
            if (t.id === id) {
                const newDisliked = !t.disliked;
                return { 
                    ...t, 
                    disliked: newDisliked, 
                    dislikes: newDisliked ? t.dislikes + 1 : t.dislikes - 1,
                    liked: false,
                    likes: t.liked ? t.likes - 1 : t.likes
                };
            }
            return t;
        }));
    };

    return (
        <div className="music-section">
            <div className="section-header">
                <h2 className="section-title"><span className="live-dot"></span>Latest Tracks</h2>
                <div className="view-toggle">
                    <button 
                        className={`view-btn ${view === 'list' ? 'active' : ''}`}
                        onClick={() => setView('list')}
                    >List</button>
                    <button 
                        className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                        onClick={() => setView('grid')}
                    >Grid</button>
                </div>
            </div>

            <div className={`tracks-container ${view === 'grid' ? 'grid-view' : ''}`} id="tracksContainer">
                {tracks.map((track, idx) => {
                    const isPlaying = currentPlayingId === track.id;
                    const progress = isPlaying ? (currentTime / (track.duration || 1)) * 100 : 0;

                    return (
                        <div 
                            key={track.id} 
                            className={`track-card ${isPlaying ? 'playing' : ''}`} 
                            data-track-id={track.id}
                        >
                            <div className="track-inner">
                                <div className="track-header">
                                    <div className="play-btn-container">
                                        <div className="vinyl"></div>
                                        <button 
                                            className={`play-btn ${isPlaying ? 'playing' : ''}`} 
                                            onClick={() => togglePlay(track)}
                                        >
                                            {isPlaying ? (
                                                <svg className="pause-icon" viewBox="0 0 24 24" style={{ display: 'block' }}><rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/></svg>
                                            ) : (
                                                <svg className="play-icon" viewBox="0 0 24 24" style={{ display: 'block' }}><polygon points="5 3 19 12 5 21 5 3" fill="white"/></svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="track-info">
                                        <div className="track-number">TRACK {String(idx + 1).padStart(2, '0')}</div>
                                        <div className="track-title">{track.title}</div>
                                        <div className="track-meta">
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <circle cx="12" cy="12" r="10"/>
                                                    <polyline points="12 6 12 12 16 14"/>
                                                </svg>
                                                <span>{formatTime(track.duration || 180)}</span>
                                            </span>
                                            <span>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M9 18V5l12-2v13"/>
                                                    <circle cx="6" cy="18" r="3"/>
                                                    <circle cx="18" cy="16" r="3"/>
                                                </svg>
                                                {track.bpm} BPM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="waveform-container" onClick={(e) => handleSeek(e, track.id)}>
                                    <div className="waveform">
                                        {track.waveform.map((h, i) => {
                                            const barProgress = (i / track.waveform.length) * 100;
                                            const isPlayed = progress > barProgress;
                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`waveform-bar ${isPlayed ? 'played' : ''}`} 
                                                    style={{ height: `${h * 100}%`, '--i': i } as any}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                    <div className="progress-time">
                                        <span className="current-time">{isPlaying ? formatTime(currentTime) : "0:00"}</span>
                                        <span>{formatTime(track.duration || 180)}</span>
                                    </div>
                                </div>
                                
                                <div className="track-stats">
                                    <button className="stat-btn plays-stat">
                                        <svg viewBox="0 0 24 24" stroke="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3"/>
                                        </svg>
                                        <span className="plays-count">{track.plays.toLocaleString()}</span>
                                    </button>
                                    <button 
                                        className={`stat-btn like-btn ${track.liked ? 'active' : ''}`}
                                        onClick={() => toggleLike(track.id)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                        </svg>
                                        <span>{track.likes.toLocaleString()}</span>
                                    </button>
                                    <button 
                                        className={`stat-btn dislike-btn ${track.disliked ? 'active' : ''}`}
                                        onClick={() => toggleDislike(track.id)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                        </svg>
                                        <span>{track.dislikes.toLocaleString()}</span>
                                    </button>
                                    <button 
                                        className="stat-btn share-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.host);
                                            showToast('Link Copied!', 'Share with friends', 'success');
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" stroke="currentColor">
                                            <circle cx="18" cy="5" r="3"/>
                                            <circle cx="6" cy="12" r="3"/>
                                            <circle cx="18" cy="19" r="3"/>
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
