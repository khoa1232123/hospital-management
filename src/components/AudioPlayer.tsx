import React, { useEffect, useState } from 'react';

type AudioPlayerProps = {
    fileUrl?: string;
}
const BASE_URL = "https://rsv01.oncall.vn:8887";

const AudioPlayer = ({fileUrl}: AudioPlayerProps) => {
  const token = "Bearer YOUR_ACCESS_TOKEN"; // Thay thế bằng Access Token thực tế

  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    if (!fileUrl) return;
    const fullFileUrl = `${BASE_URL}${fileUrl}`;
    const fetchAudio = async () => {
      try {
        const response = await fetch(fullFileUrl, {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
      } catch (error) {
        console.error('Error fetching audio file:', error);
      }
    };

    fetchAudio();
  }, [fileUrl, token]);

  return (
    <div>
      {audioSrc ? (
        <audio controls>
          <source src={audioSrc} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
};

export default AudioPlayer;
