import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const devTeam = [
    "Phạm Trần Minh Duy",
    "Quách Tấn Dũng",
    "Lưu Đình Huy",
    "Vũ Phú Trường",
    "Nguyễn Thành Luân",
    "Bùi Tuấn Kiệt"
  ];

  const splitIndex = 3; // Chia thành 2 dòng, mỗi dòng có 3 người

  const firstThreeMembers = devTeam.slice(0, splitIndex);
  const remainingMembers = devTeam.slice(splitIndex);

  const memberListStyle = {
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "14px",
    lineHeight: "1.6",
    fontFamily: "Arial, sans-serif"
  };

  const spanStyle = {
    marginRight: "10px",
    display: "inline-block"
  };

  const linkStyle = {
    color: "#006600", // Màu xanh lá cây
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (
    <footer style={{ backgroundColor: "#f4f4f4", padding: "20px 0" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "bold" }}>
              &copy; {currentYear} ShopNowHub
            </p>
            <p style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "bold" }}>
              Developed by:
            </p>
            <div style={memberListStyle}>
              <div style={{ ...memberListStyle, marginBottom: "5px" }}>
                {firstThreeMembers.map((member, index) => (
                  <span key={index} style={spanStyle}>
                    {member}
                  </span>
                ))}
              </div>
              <div style={memberListStyle}>
                {remainingMembers.map((member, index) => (
                  <span key={index} style={spanStyle}>
                    {member}
                  </span>
                ))}
              </div>
            </div>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              <a href="https://github.com/huyk21/intro2se-21clc05-group07" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Visit our GitHub
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;