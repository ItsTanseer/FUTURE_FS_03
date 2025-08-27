import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const MovieDetailsModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('MovieDetailsModal is rendering');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie?.imdbID) return;

      setLoading(true);
      setError('');

      const apiKey = '1b8ba420';
      const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}&plot=full`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "False") {
          setError(data.Error);
        } else {
          setMovieDetails(data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    if (movie) {
      fetchMovieDetails();
    }
  }, [movie]);

  if (!movie) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl relative text-white border border-blue-500 shadow-lg shadow-blue-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10 bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>

        {loading ? (
          <div className="p-8 text-center">
            <div className="text-blue-500 text-lg">Loading movie details...</div>
          </div>
        ) : error ? (
          <div className="p-8">
            <div className="text-red-500 text-center mb-4">{error}</div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
              <p className="text-gray-400">Year: {movie.Year}</p>
            </div>
          </div>
        ) : movieDetails ? (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                {movieDetails.Poster && movieDetails.Poster !== 'N/A' ? (
                  <Image
                    src={movieDetails.Poster}
                    alt={movieDetails.Title}
                    width={300}
                    height={450}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-[300px] h-[450px] bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Movie Details */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-blue-400">{movieDetails.Title}</h2>
                
                {/* Basic Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <span className="bg-gray-700 px-3 py-1 rounded">{movieDetails.Year}</span>
                  <span className="bg-gray-700 px-3 py-1 rounded">{movieDetails.Rated}</span>
                  <span className="bg-gray-700 px-3 py-1 rounded">{movieDetails.Runtime}</span>
                  <span className="bg-gray-700 px-3 py-1 rounded">{movieDetails.Type}</span>
                </div>

                {/* Rating */}
                {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Rating:</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-xl">
                        {'⭐'.repeat(Math.round(parseFloat(movieDetails.imdbRating) / 2))}
                      </span>
                      <span className="text-yellow-500 font-bold">{movieDetails.imdbRating}/10</span>
                      {movieDetails.imdbVotes && (
                        <span className="text-gray-400 text-sm">({movieDetails.imdbVotes} votes)</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Genre */}
                {movieDetails.Genre && movieDetails.Genre !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Genre:</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.Genre.split(', ').map((genre, index) => (
                        <span key={index} className="bg-blue-600 px-2 py-1 rounded text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plot */}
                {movieDetails.Plot && movieDetails.Plot !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Plot:</h3>
                    <p className="text-gray-300 leading-relaxed">{movieDetails.Plot}</p>
                  </div>
                )}

                {/* Director */}
                {movieDetails.Director && movieDetails.Director !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Director:</h3>
                    <p className="text-gray-300">{movieDetails.Director}</p>
                  </div>
                )}

                {/* Cast */}
                {movieDetails.Actors && movieDetails.Actors !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Cast:</h3>
                    <p className="text-gray-300">{movieDetails.Actors}</p>
                  </div>
                )}

                {/* Writer */}
                {movieDetails.Writer && movieDetails.Writer !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Writer:</h3>
                    <p className="text-gray-300">{movieDetails.Writer}</p>
                  </div>
                )}

                {/* Released Date */}
                {movieDetails.Released && movieDetails.Released !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Released:</h3>
                    <p className="text-gray-300">{movieDetails.Released}</p>
                  </div>
                )}

                {/* Language & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {movieDetails.Language && movieDetails.Language !== 'N/A' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Language:</h3>
                      <p className="text-gray-300">{movieDetails.Language}</p>
                    </div>
                  )}
                  {movieDetails.Country && movieDetails.Country !== 'N/A' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Country:</h3>
                      <p className="text-gray-300">{movieDetails.Country}</p>
                    </div>
                  )}
                </div>

                {/* Box Office */}
                {movieDetails.BoxOffice && movieDetails.BoxOffice !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Box Office:</h3>
                    <p className="text-green-400 font-bold">{movieDetails.BoxOffice}</p>
                  </div>
                )}

                {/* Awards */}
                {movieDetails.Awards && movieDetails.Awards !== 'N/A' && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Awards:</h3>
                    <p className="text-gray-300">{movieDetails.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetailsModal;