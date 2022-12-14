import { Comment } from '../../types/comment';

type MovieReviewsProps = {
  reviews: Comment[];
};

function MovieReviews({reviews}: MovieReviewsProps) {
  const options: object = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          reviews.map((review): JSX.Element => {
            const date = new Date(review.date);
            return (
              <div className="review" key={`${review.id}-${review.date}`}>
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime="2016-12-24">{date.toLocaleString('en-us', options)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default MovieReviews;
