import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

export const Loader = ({ children, isLoading, className, rowClass, small }) => {
  if (isLoading) {
    return (
      <Container>
        <Row className={`justify-content-sm-center ${rowClass}`}>
          <Col>
            <Spinner
              className={
                small
                  ? `spinner-small ${className}`
                  : `spinner-large ${className}`
              }
              color="primary"
             />
          </Col>
        </Row>
      </Container>
    );
  }
  return <>{children}</>;
};
