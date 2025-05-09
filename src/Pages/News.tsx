import { useEffect, useState } from "react";
import { Col, Row, Typography, Pagination } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { FlatButton } from "../Shared/FlatButton";
import { UseDataContext } from "../Context/UseDataContext";
import { contextType } from "../Types/Types";

const { Title, Paragraph } = Typography;

export const News = () => {
  const { data } = UseDataContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const [featured, setFeatured] = useState<contextType | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setFeatured(data[0]);
    }
  }, [data]);

  const handleIndicatorClick = (index: number) => setActiveIndex(index);

  const handleNext = () => {
    if (!data?.[0]?.files) return;
    setActiveIndex((prev) =>
      prev === data[0].files!.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!data?.[0]?.files) return;
    setActiveIndex((prev) =>
      prev === 0 ? data[0].files!.length - 1 : prev - 1
    );
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = data ? data.slice(startIndex, startIndex + pageSize) : [];

  const handleReadMore = (article: contextType) => {
    setFeatured(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const styles = {
    background: {
      minHeight: "60vh",
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      borderRadius: "8px",
    },
    icons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      marginBottom: "8px",
    },
    badge: {
      width: "fit-content",
      padding: "5px 10px",
      borderRadius: "10px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
  };

  return (
    <section>
      <div className="container-fluid">
        <h2 className="text-center">Latest News</h2>
        <p className="text-center">
          Stay updated with our latest activities and achievements.
        </p>
        <br />

        {/* Featured Section */}
        <div className="row mb-5">
          <div className="col-md-6">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {featured?.files?.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleIndicatorClick(index)}
                    className={activeIndex === index ? "active" : ""}
                    aria-current={activeIndex === index}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {featured?.files?.map((item, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${activeIndex === index ? "active" : ""}`}
                    style={{
                      backgroundImage: `url(${item.url})`,
                      width: "100%",
                      height: "400px",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="col-md-6">
            {featured && (
              <>
                <div style={styles.badge} className="buttondark">Featured</div>
                <div
                style={{
                  minHeight:"400px",
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                }}>
                <Title>{featured.title}</Title>
                <br/> 
                <Paragraph>{featured.description}</Paragraph>
                </div>
              </>
            )}
          </div>
        </div>

        {/* News Articles List */}
        <Row gutter={[16, 24]}>
          {paginatedArticles.map((article, index) => (
            <Col key={index} lg={8} md={12} sm={24}>
              <Title level={4} style={{ marginTop: "1rem" }}>{article.title}</Title>

              <div style={styles.icons}>
                <CalendarOutlined />
                <span>{article.date}</span>
              </div>

              <div style={styles.icons}>
                <UserOutlined />
                <span>By Trinity Foundation</span>
              </div>

              <Paragraph>{article.description.slice(0,100)}...</Paragraph>

              <FlatButton
                className="buttondark"
                onClick={() => handleReadMore(article)}
                title="Read More"
              />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        {data && data.length > pageSize && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};


