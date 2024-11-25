import React, { useRef, useState, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter"
import axios from 'axios';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [reviews, setReviews] = useState([]);





  const tour = tourData.find((tour) => tour.id === id);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews: tourReviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/tours/${id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);


  //форматируем дату
  const options = { day: "numeric", month: "long", year: "numeric" };

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

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i>
                      {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-pushpin-2-fill"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-fill"></i> ${price} /per
                      person/{" "}
                    </span>
                    <span>
                      <i className="ri-pin-distance-fill"></i> {distance} km
                    </span>
                    <span>
                      <i className="ri-group-fill"></i>
                      {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                {/*=============== tour reviews section start ====================*/}


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

                    {reviews?.map((review) => (
                      <div className="review__item">
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.user.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    { day: "numeric", month: "long", year: "numeric" }
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                        {review.rating}
                              <i className="ri-star-fill"></i>
                    </span>

                          </div>
                          <h6>{review.comment}</h6> {/* !!!  comment */}
                        </div>
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>Dima</h5>
                              <p>
                                {new Date("12-11-2024").toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              5
                              <span>
                                <i className="ri-star-fill"></i>
                              </span>
                            </span>
                          </div>

                          <h6>Охуенный тур</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/*=============== tour reviews section end   ====================*/}
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating}/>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
