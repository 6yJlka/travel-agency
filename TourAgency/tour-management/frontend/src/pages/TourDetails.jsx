import React, { useRef, useState, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter"
import axios from 'axios';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const options = { day: "numeric", month: "long", year: "numeric" }; // !!! Вынесите options за пределы условного рендеринга

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
        navigate('/page-not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, navigate]);



  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/tours/${id}/reviews`); // !!! Правильный endpoint
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };


    if (id) {
      fetchReviews()
    }

  }, [id]);



  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;
    const newReview = { // !!! Создаем объект отзыва
      tour: { id: id }, // !!! tourId как объект
      comment: reviewText, // !!! Используем comment (как в backend сущности)
      rating: tourRating
    };
    try {
      const response = await axios.post('http://localhost:8085/api/reviews', newReview, { // !!! Отправляем объект newReview
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("Review created successfully:", response.data); // !!! Выводим данные нового отзыва

      setReviews([...reviews, response.data]); // !!! Добавляем новый отзыв в state

      // Очищаем поля формы
      reviewMsgRef.current.value = "";
      setTourRating(null);
    } catch (error) {
      console.error("Error adding review:", error); // !!!  Подробное логирование ошибки
      if (error.response) {
        console.error("Server responded with:", error.response.data); // !!! Логируем ответ сервера (если есть)
      }
    }
  };

  if (!loading && tour) { // !!! Проверка на null и undefined
    const { photoUrl, title, description, price, city, distance, maxPeople } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews); // !!! reviews from state

    return (
        <>
          <section>
            <Container>
              <Row>
                <Col lg="8">
                  <div className="tour__content">
                    <img src={photoUrl} alt="" />
                    <div className="tour__info">
                      <h2>{title}</h2>
                      <div className="d-flex align-items-center gap-5">
                        <span className="tour__rating d-flex align-items-center gap-1">
                                                <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>{" "}
                          {avgRating === 0 ? null : avgRating}
                          {totalRating === 0 ? ("Not rated") : (<span></span>)}
                        </span>
                        <span>
                          <i className="ri-map-pin-user-fill"></i> {city}
                        </span>
                      </div>

                      <div className="tour__extra-details">
                        {/* ... (other spans) */}
                        <span>
                          <i className="ri-money-dollar-circle-fill"></i> ${price} /per person/
                        </span>
                        {/* ... (other spans) */}
                        <span>
                          <i class="ri-pin-distance-fill"></i> {distance} /in km/
                        </span>
                        <span>
                          <i class="ri-group-fill"></i> {maxPeople}
                        </span>
                      </div>
                      <h5>Description</h5>
                      <p>{description}</p>
                    </div>

                    <div className="tour__reviews mt-4">
                      <h4>Reviews ({reviews?.length} reviews)</h4>

                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i className="ri-star-fill"></i>
                      </span>
                          <span onClick={() => setTourRating(2)}>
                        2 <i className="ri-star-fill"></i>
                      </span>
                          <span onClick={() => setTourRating(3)}>
                        3 <i className="ri-star-fill"></i>
                      </span>
                          <span onClick={() => setTourRating(4)}>
                        4 <i className="ri-star-fill"></i>
                      </span>
                          <span onClick={() => setTourRating(5)}>
                        5 <i className="ri-star-fill"></i>
                      </span>
                        </div>
                        <div className="review__input">
                          <input type="text" ref={reviewMsgRef} placeholder="Write your comment here" required />
                          <button
                              className="btn primary__btn text-white"
                              type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>

                      <ListGroup className="user__reviews">
                        {reviews.map((review) => (
                            <div className="review__item" key={review.id}>
                              <img src={avatar} alt="User avatar" />
                              <div className="w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>

                                    <p>
                                      {new Date(review.createdAt).toLocaleDateString(
                                          "en-US",
                                          { day: "numeric", month: "long", year: "numeric" }
                                      )}
                                    </p>
                                    <h6>{review.comment}</h6>
                                  </div>
                                  <span className="d-flex align-items-center">
                                   {review.rating}
                                    <i className="ri-star-fill"></i>
                                   </span>

                                </div>
                              </div>
                            </div>
                        ))}
                      </ListGroup>

                    </div>

                  </div>
                </Col>

                <Col lg="4">
                  <Booking tour={tour} avgRating={avgRating} />
                </Col>

              </Row>
            </Container>
          </section>
          <Newsletter />
        </>
    );

  }

  return <div>Loading...</div>; // !!!  Отображаем loading... пока данные загружаются
};

export default TourDetails;
