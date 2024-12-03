import React from "react";
import { Star } from "lucide-react";

const StarRatingFeedback = () => {
  // Explicitly define ratings type
  const ratings: Record<number, number> = {
    5: 25,
    4: 15,
    3: 10,
    2: 5,
    1: 3,
  };

  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-[200px] w-full bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Customer Feedback Summary
      </h2>

      {/* Feedback Visualization */}
      <div>
        {/* Overall Rating Display */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <div className="flex justify-center items-center">
            <Star className="text-yellow-400 w-6 h-6" />
            <span className="text-xl font-bold ml-2">
              {(
                Object.entries(ratings).reduce(
                  (acc, [star, count]) => acc + parseInt(star) * count,
                  0
                ) / totalRatings
              ).toFixed(1) || 0}
            </span>
            <span className="text-gray-600 ml-1">/ 5</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center">
          Ratings Breakdown
        </h3>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center mb-2">
            <div className="w-12 text-right mr-2">
              {star} Star{star !== 1 && "s"}
            </div>
            <div className="flex-grow bg-gray-200 rounded-full h-4 mr-2">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{
                  width: `${
                    totalRatings > 0 ? (ratings[star] / totalRatings) * 100 : 0
                  }%`,
                }}
              />
            </div>
            <div className="w-12 text-left">
              {ratings[star]} (
              {totalRatings > 0
                ? ((ratings[star] / totalRatings) * 100).toFixed(1)
                : 0}
              %)
            </div>
          </div>
        ))}
        <div className="text-center mt-4 text-gray-600">
          Total Ratings: {totalRatings}
        </div>
      </div>
    </div>
  );
};

export default StarRatingFeedback;
