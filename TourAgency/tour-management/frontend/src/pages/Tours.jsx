import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import tourData from "./../assets/data/tours";
import { Col, Container, Row } from "reactstrap";
import Newsletter from "./../shared/Newsletter";
import axios from "axios";

const Tours = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [tours, setTours] = useState([]); // !!! State для хранения туров из БД
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/tours'); // !!! Запрос на backend
                setTours(response.data);


            } catch (error) {
                console.error("Error fetching tours:", error);
            }finally {

                setLoading(false);

            }
        };

        fetchTours();
    }, []);

    useEffect(() => {
        const pages = Math.ceil(tours.length / 4); // !!! Используйте tours.length
        setPageCount(pages);

    }, [tours]); // !!! Зависимость от туров


  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
            <Row>

                {loading ? ( // !!!
                    <div>Loading tours...</div> // !!!
                ) : (
                    tours.map((tour) => ( // !!!
                        <Col lg="3" className="mb-4" key={tour.id}>
                            <TourCard tour={tour} />
                        </Col>
                    ))
                )}

                <Col lg="12">
                    <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                        {[
                            ...Array(pageCount)
                                .keys()
                                .map((Number) => (
                                    <span
                                        key={Number}
                                        onClick={() => setPage(Number)}
                                        className={page === Number ? "active__page" : ""}
                                    >
                                            {Number + 1}
                                            </span>
                                )),
                        ]}
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
        <Newsletter />
    </>
  );
};

export default Tours;
