import { Trophy, Award, Users, User, Calendar, Award as TrophyIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWinners } from '@/contexts/WinnerContext';
import { format, parseISO } from 'date-fns';

// Helper component for the winner card
const WinnerCard = ({ winner, index }: { winner: any, index: number }) => (
  <div key={winner.id} className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
    {/* Background Image with Blur */}
    {winner.poster && (
      <div className="absolute inset-0 -z-0">
        <img
          src={winner.poster}
          alt={winner.eventName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>
    )}
    
    {/* Content */}
    <div className="relative z-10 p-6 text-white">
      {/* Event Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold line-clamp-2">{winner.eventName}</h3>
        <div className="flex items-center text-sm text-amber-100 mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          {format(parseISO(winner.eventDate), 'MMMM d, yyyy')}
        </div>
      </div>
      
      {/* Winners List */}
      <div className="space-y-3">
        <div className="flex items-center text-sm font-medium text-amber-50">
          <TrophyIcon className="h-4 w-4 mr-2" />
          Winners
        </div>
        
        <div className="space-y-2">
          {winner.winners.map((w: any, i: number) => (
            <div key={i} className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              {/* Position Badge */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0 ? 'bg-yellow-400 text-amber-900' : 
                i === 1 ? 'bg-gray-300 text-gray-800' : 
                'bg-amber-600 text-white'
              }`}>
                {i + 1}
              </div>
              
              {/* Winner Photo */}
              <div className="relative ml-3 flex-shrink-0">
                {w.photoUrl ? (
                  <img
                    src={w.photoUrl}
                    alt={w.name}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center bg-white/20 ${
                    w.photoUrl ? 'hidden' : 'flex'
                  }`}
                >
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Winner Details */}
              <div className="ml-3 min-w-0">
                <p className="font-medium text-white truncate">{w.name}</p>
                {w.team && (
                  <p className="text-xs text-amber-100 flex items-center truncate">
                    <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{w.team}</span>
                  </p>
                )}
                {w.prize && (
                  <p className="text-xs text-amber-200 font-medium mt-0.5">{w.prize}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const WinnersSection = () => {
  const { winners, loading, error } = useWinners();

  if (loading) return null; // Or loading spinner
  if (error) return null; // Or error message
  if (!winners || winners.length === 0) return null;

  // Get the most recent 3 winners
  const recentWinners = [...winners]
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
    .slice(0, 3);

  return (
    <section id="winners" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Recent Winners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the brilliant minds who excelled in our recent events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentWinners.map((winner, index) => (
            <WinnerCard key={winner.id} winner={winner} index={index} />
          ))}
        </div>

        {winners.length > 3 && (
          <div className="text-center mt-10">
            <a
              href="#all-winners"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors duration-200"
            >
              View All Winners
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WinnersSection;
