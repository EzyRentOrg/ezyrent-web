'use client';

import { useRef, useState } from 'react';
import { Pause, Play, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface Video {
  src: string;
  poster: string;
  title: string;
}

interface VideoPlayerProps {
  videos: Video[];
}

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentVideoIndex];

  //   useEffect(() => {
  //     if (videoRef.current) {
  //       videoRef.current.load();
  //       videoRef.current.play();
  //     }
  //   }, [currentVideoIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playNextVideo = () => {
    const newIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(newIndex);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
        <video
          ref={videoRef}
          src={currentVideo.src}
          poster={currentVideo.poster}
          className="w-full h-full object-cover bg-black"
          onClick={togglePlay}
          muted={isMuted}
          onEnded={playNextVideo}
          autoPlay={isPlaying}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 text-white rounded-full p-4 transition-transform transform hover:scale-110 focus:outline-none"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h2 className="text-white text-lg font-semibold mb-2">
            {currentVideo.title}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleMute}
                className="text-white mr-4 focus:outline-none"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
            </div>
            <button
              onClick={playNextVideo}
              className="text-white flex items-center focus:outline-none"
            >
              <span className="mr-2">Next</span>
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
