import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type Props = {
  max?: number;
  onRate: (value: number) => void;
  rating: number,
};

export default function StarRating({ max = 5, onRate, rating }: Props) {
  const [hoverRating, setHoverRating] = useState(0);

  const isReadOnly = rating !== -1;

  const handleMouseEnter = (value: number) => {
    if (rating == -1) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (rating == -1) setHoverRating(0);
  };

  const handleClick = (value: number) => {
    onRate(value);
  };

  const getIcon = (index: number) => {
    let starRating = rating !== -1 ? rating : hoverRating;

    if (starRating >= index + 1) return <FaStar className="text-orange-400 md:w-10 md:h-10 w-8 h-8" />;
    if (starRating >= index + 0.5) return <FaStarHalfAlt className="text-orange-400 md:w-10 md:h-10 w-8 h-8" />;
    return <FaRegStar className="text-gray-400 md:w-10 md:h-10 w-8 h-8" />;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <div
        className={`flex space-x-1 ${!isReadOnly && 'cursor-pointer'}`}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className="relative md:w-10 w-8 md:h-10 h-8"
            onMouseMove={
              isReadOnly
                ? undefined
                : (e) => {
                  const { left, width } = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - left;
                  const isHalf = x < width / 2;
                  handleMouseEnter(i + (isHalf ? 0.5 : 1))
                }
            }
            onClick={isReadOnly ? undefined : () => handleClick(hoverRating)}
          >
            {getIcon(i)}
          </div>
        ))}
      </div>
    </div>
  );
}
