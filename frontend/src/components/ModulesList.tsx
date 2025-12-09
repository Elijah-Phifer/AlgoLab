import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LearningModule } from '../types';
import { modulesAPI } from '../services/api';

const ModulesList: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await modulesAPI.getAll();
        setModules(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load modules. Please ensure the backend API is running.');
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const getDifficultyColor = (level: number): string => {
    if (level <= 2) return 'success';
    if (level <= 3) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Modules</Alert.Heading>
          <p>{error}</p>
          <p className="mb-0">
            Make sure the backend API is running on <code>http://localhost:5000</code>
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Learning Modules</h1>
          <p className="lead">Choose a module to start your learning journey</p>
        </Col>
      </Row>

      <Row>
        {modules.map((module) => (
          <Col key={module.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title>{module.title}</Card.Title>
                  <Badge bg={getDifficultyColor(module.difficultyLevel)}>
                    Level {module.difficultyLevel}
                  </Badge>
                </div>
                <Badge bg="secondary" className="mb-2">{module.category}</Badge>
                <Card.Text className="mt-2">{module.description}</Card.Text>
                <div className="mb-3">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
                {module.hasBlocklyWorkspace && (
                  <div className="mb-2">
                    <i className="bi bi-code-square text-primary"></i>
                    <small className="ms-1 text-muted">Includes Blockly workspace</small>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Link to={`/modules/${module.id}`} style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="w-100"
                  >
                    Start Module
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {modules.length === 0 && (
        <Row>
          <Col>
            <Alert variant="info">
              No modules available yet. Check back soon!
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ModulesList;
