import { useState, ChangeEvent, Fragment, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { redirect } from '../../store/actions';
import { postComment } from '../../store/api-actions';
import { AppRoute } from '../../const';

function FormReview() {
  const dispatch = useAppDispatch();
  const filmId = String(useParams().filmId);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const rateValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const onChangeRating = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, rating: Number(e.target.value)});
  };

  const onChangeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, comment: e.target.value});
    if (formData.comment.length >= 50 && formData.comment.length <= 400) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postComment({filmId, comment: formData.comment, rating: formData.rating}));
    dispatch(redirect(`${AppRoute.Films}/${filmId}`));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={submitHandler}>
        <div className="rating">
          <div className="rating__stars">
            {
              rateValues.map((value) => (
                <Fragment key={`${value}-key`}>
                  <input
                    className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    checked={formData.rating === value}
                    onChange={onChangeRating}
                  />
                  <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
                </Fragment>
              ))
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={formData.comment}
            onChange={onChangeReview}
            required
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isButtonDisabled}
            >
              Post
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default FormReview;
