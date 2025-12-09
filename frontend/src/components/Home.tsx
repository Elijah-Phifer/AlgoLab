import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center py-5">
            <h1 className="display-4 mb-4">Welcome to AlgoLab</h1>
            <p className="lead mb-4">
              An interactive learning platform for algorithms and data structures
            </p>
            <p className="text-muted">
              Learn programming concepts through hands-on block-based coding with Blockly
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <i className="bi bi-book" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
              </div>
              <Card.Title className="text-center">Learning Modules</Card.Title>
              <Card.Text>
                Explore interactive modules covering algorithms, data structures, and problem-solving techniques.
              </Card.Text>
              <div className="text-center">
                <Link to="/modules" style={{ textDecoration: 'none' }}>
                  <Button variant="primary">
                    Browse Modules
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <i className="bi bi-code-slash" style={{ fontSize: '3rem', color: '#198754' }}></i>
              </div>
              <Card.Title className="text-center">Block-Based Coding</Card.Title>
              <Card.Text>
                Use Blockly to create code visually by dragging and dropping blocks. Perfect for beginners!
              </Card.Text>
              <div className="text-center">
                <Link to="/sandbox" style={{ textDecoration: 'none' }}>
                  <Button variant="success">
                    Open Sandbox
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <i className="bi bi-graph-up" style={{ fontSize: '3rem', color: '#dc3545' }}></i>
              </div>
              <Card.Title className="text-center">Track Progress</Card.Title>
              <Card.Text>
                Monitor your learning journey with progress tracking and achievement badges.
              </Card.Text>
              <div className="text-center">
                <Button variant="danger" disabled>
                  Coming Soon
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 mb-4">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h3 className="mb-3">Getting Started</h3>
              <ol>
                <li className="mb-2">Browse available learning modules</li>
                <li className="mb-2">Select a module that interests you</li>
                <li className="mb-2">Complete interactive exercises using Blockly</li>
                <li className="mb-2">Experiment in the sandbox environment</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
