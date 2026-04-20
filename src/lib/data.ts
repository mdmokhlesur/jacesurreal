export interface Track {
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

export const tracks: Track[] = [
  {
    id: 1,
    title: "Midnight Frequencies",
    src: "/tracks/midnight-frequencies.mp3",
    duration: 184,
    plays: 1247,
    likes: 342,
    dislikes: 12,
    liked: false,
    disliked: false,
    bpm: 128,
    waveform: [0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.8, 0.4, 0.6, 0.9, 0.7, 0.5, 0.8, 0.6, 0.4, 0.7, 0.9, 0.5, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.6, 0.8, 0.9, 0.4, 0.7, 0.6, 0.5, 0.8]
  },
  {
    id: 2,
    title: "Electric Dreams",
    src: "/tracks/electric-dreams.mp3",
    duration: 212,
    plays: 892,
    likes: 215,
    dislikes: 8,
    liked: false,
    disliked: false,
    bpm: 124,
    waveform: [0.4, 0.6, 0.5, 0.8, 0.7, 0.4, 0.9, 0.6, 0.5, 0.7, 0.8, 0.4, 0.6, 0.9, 0.5, 0.7, 0.8, 0.6, 0.4, 0.5, 0.9, 0.7, 0.6, 0.8, 0.4, 0.5, 0.7, 0.9, 0.6, 0.8, 0.5, 0.4, 0.7, 0.6, 0.8, 0.9, 0.5, 0.4, 0.7, 0.6]
  },
  {
    id: 3,
    title: "Neon Pulse",
    src: "/tracks/neon-pulse.mp3",
    duration: 195,
    plays: 1583,
    likes: 478,
    dislikes: 15,
    liked: false,
    disliked: false,
    bpm: 130,
    waveform: [0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 0.6, 0.8, 0.9, 0.5, 0.7, 0.6, 0.4, 0.8, 0.9, 0.7, 0.5, 0.6, 0.4, 0.8, 0.7, 0.9, 0.5, 0.6, 0.4, 0.8, 0.7, 0.5, 0.9, 0.6, 0.4, 0.8, 0.7, 0.5, 0.6, 0.9, 0.4]
  }
];
