import React, { useState, useEffect, useContext, useRef } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { getAccessToken, searchTracks } from '../services/spotifyService';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { setTrack, audioRef, play } = useContext(PlayerContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Track whether to show results
  const inputRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      const token = await getAccessToken();
      const tracks = await searchTracks(query, token);
      setResults(tracks);
      setShowResults(true);
    };

    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleTrackSelect = (track) => {
    setTrack({
      name: track.name,
      file: track.preview_url,
      image: track.album.images[0].url,
      desc: track.artists[0].name
    });

    // Play the track after setting it
    audioRef.current.src = track.preview_url;
    play();
    setShowResults(false); // Close results after selecting a track
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Clicked outside the input field, close results
      setShowResults(false);
    }
  };

  useEffect(() => {
    // Attach event listener when component mounts
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Cleanup: remove event listener when component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative'>
      <img className='w-4 absolute left-[143px] top-[35px] z-10' src={assets.search_icon} alt='' />
      <input 
       ref={inputRef}
        className='bg-[#242424] rounded-[100px] text-[#fff] border-none w-[50%] py-1.5 px-9 absolute left-[130px] top-[18px] h-[48px]' 
        type="text" 
        value={query} 
        onChange={handleSearch} 
        placeholder="what do you want to play?" 
      />
      {showResults && results.length > 0 && (
        <ul className='search-songs absolute left-[140px] top-[67px] bg-[#242424] rounded-[20px] w-[49%] h-[400px] overflow-y-scroll'>
          {results.map(track => (
            <li 
              className='text-slate-50 cursor-pointer  py-2 pl-3 hover:bg-[#ffffff26]' 
              key={track.id} 
              onClick={() => handleTrackSelect(track)}
            >
              <img className='inline mr-4' src={track.album.images[0].url} alt={`${track.name} album cover`} width="50" height="50" />
              {track.name} by {track.artists[0].name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
