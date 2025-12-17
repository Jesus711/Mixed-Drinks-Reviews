import { useRef, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type Props = {
  max?: number;
  onRate: (value: number) => void;
  onFinalRating: (value: number) => void;
  rating: number,
  ratingSet: boolean
};

export default function StarRating({ max = 5, onRate, onFinalRating, rating, ratingSet }: Props) {
  const [hoverRating, setHoverRating] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);


  const getRatingFromEvent = (e: React.PointerEvent<HTMLDivElement>): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const precise = (x / width) * max;
    return Math.min(max, Math.max(0, Math.round(precise * 2) / 2));
  };


  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ratingSet) {
      return;
    }
    const hover = getRatingFromEvent(e)
    setHoverRating(hover)
    onRate(hover)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ratingSet) {
      return;
    }
    onFinalRating(getRatingFromEvent(e))
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ratingSet) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    const hover = getRatingFromEvent(e)
    setHoverRating(hover)
    onRate(hover)
  }

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (ratingSet) {
      return;
    }
    setHoverRating(0)
  }

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setHoverRating(0);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };



  const getIcon = (index: number) => {
    let starRating = ratingSet ? rating : hoverRating;

    if (starRating >= index + 1) return <FaStar className="text-orange-400 w-full h-full" />;
    if (starRating >= index + 0.5) return <FaStarHalfAlt className="text-orange-400 w-full h-full" />;
    return <FaRegStar className="text-gray-400 w-full h-full" />;
  };

  return (
      <div
        className={`inline-flex space-x-2 justify-center items-center pb-1 ${!ratingSet && 'cursor-pointer'}`}
        style={{ touchAction: 'none', userSelect: 'none'}}
        ref={containerRef}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
      >
        {Array.from({ length: max }, (_, i) => (
          <div key={i} className="relative md:w-12 md:h-12 w-10 h-10">
            {getIcon(i)}
          </div>
        ))}
      </div>
  );
}
