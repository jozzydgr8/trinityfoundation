import { useEffect, useState } from "react";
import { Col, Row, Typography, Pagination } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { FlatButton } from "../Shared/FlatButton";
import { UseDataContext } from "../Context/UseDataContext";
import demo from './../assets/crystalimg.jpg'
import { contextType } from "../Types/Types";
const { Title, Paragraph } = Typography;

export const News = () => {
  const {data} = UseDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const [featured, setFeatured] = useState<contextType | null>({}as contextType);// ✅ make featured dynamic
  useEffect(() => {
    if (data && data.length > 0) {
      setFeatured(data[0]);
    }
  }, [data]); // ✅
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

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = data ? data.slice(startIndex, startIndex + pageSize):[];

  const handleReadMore = (article:any) => {
    setFeatured(article); 
    window.scrollTo({ top: 0, behavior: "smooth" }); //
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
              style={{
                ...styles.background,
                backgroundImage: `url(${demo})`,
              }}
            />
          </div>
          <div className="col-md-6">
          {featured && (
            <>
              <div style={styles.badge} className="buttondark">Featured</div>
              <Title>{featured.title}</Title>
              <Paragraph>{featured.description}</Paragraph>
            </>
          )}
          </div>
        </div>

        {/* News Articles List */}
        <Row gutter={[16, 24]}>
          {paginatedArticles.map((data, index) => (
            <Col key={index} lg={8} md={12} sm={24}>
              <Title level={4} style={{ marginTop: "1rem" }}>
                {data.title}
              </Title>

              <div style={styles.icons}>
                <CalendarOutlined />
                <span>{data.date}</span>
              </div>

              <div style={styles.icons}>
                <UserOutlined />
                <span>By Trinity Foundation</span>
              </div>

              <Paragraph>{data.description}</Paragraph>

              <FlatButton
                className="buttondark"
                onClick={() => handleReadMore(data)} // ✅ pass data to handler
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
