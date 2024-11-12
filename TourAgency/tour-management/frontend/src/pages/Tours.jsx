import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import tourData from "./../assets/data/tours";
import { Col, Container, Row } from "reactstrap";
import Newsletter from "./../shared/Newsletter";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

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
            {tourData?.map((tour) => (
              <Col lg="3" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}

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
