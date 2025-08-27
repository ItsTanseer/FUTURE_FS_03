"use client";

import MovieCard from '../../components/MovieCard';
import MovieDetailsModal from '../../components/MovieDetailsModal';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const fetchMovies = async (query = 'movies') => {
    setLoading(true);
    setError('');
    
    const apiKey = '1b8ba420';
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Response === "False") {
        setError(data.Error);
        setMovies([]);
      } else if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(); // Load default movies on mount
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      fetchMovies(); // Load default movies if search is empty
      return;
    }
    fetchMovies(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-500">Amazon Prime</h1>
      
      <div className="mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-500 disabled:opacity-50" 
            onClick={handleSearch}
            disabled={loading}
          >
            🔍
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-blue-500 mb-4">Loading movies...</div>
      )}

      {error && (
        <div className="text-center text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.imdbID || index} movie={movie} onClick={() => openModal(movie)} />
        ))}
      </div>

      {movies.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mt-8">No movies found</div>
      )}

      {isModalOpen && <MovieDetailsModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default HomePage;