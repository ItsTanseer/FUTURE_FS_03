import Image from 'next/image';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      className="border border-gray-700 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-800 text-white transform hover:scale-105 hover:border-blue-500" 
      onClick={onClick}
    >
      <div className="relative">
        <Image 
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'} 
          alt={movie.Title} 
          width={200} 
          height={300} 
          className="rounded-md object-cover w-full h-48" 
          unoptimized 
        />
        {/* Movie Type Badge */}
        <span className="absolute top-2 right-2 bg-blue-600 text-xs px-2 py-1 rounded capitalize">
          {movie.Type || 'Movie'}
        </span>
      </div>
      
      <div className="mt-3">
        <p className="text-center text-lg font-semibold truncate" title={movie.Title}>
          {movie.Title}
        </p>
        
        {/* Year */}
        <p className="text-center text-gray-400 text-sm mt-1">
          {movie.Year}
        </p>
        
        {/* Click to view details hint */}
        <div className="text-center mt-2">
          <span className="text-blue-400 text-xs hover:text-blue-300">
            Click for details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;