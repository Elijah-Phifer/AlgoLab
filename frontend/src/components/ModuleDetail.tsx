import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import * as Blockly from 'blockly';
import { LearningModule } from '../types';
import { modulesAPI, progressAPI } from '../services/api';
import './ModuleDetail.css';

const ModuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<LearningModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await modulesAPI.getById(parseInt(id || '0'));
        setModule(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load module. Please ensure the backend API is running.');
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  useEffect(() => {
    if (module && module.hasBlocklyWorkspace && blocklyDiv.current && !workspaceRef.current) {
      // Initialize Blockly workspace
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          kind: 'categoryToolbox',
          contents: [
            {
              kind: 'category',
              name: 'Logic',
              colour: '#5C81A6',
              contents: [
                { kind: 'block', type: 'controls_if' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_operation' },
                { kind: 'block', type: 'logic_negate' },
                { kind: 'block', type: 'logic_boolean' },
              ],
            },
            {
              kind: 'category',
              name: 'Loops',
              colour: '#5CA65C',
              contents: [
                { kind: 'block', type: 'controls_repeat_ext' },
                { kind: 'block', type: 'controls_whileUntil' },
                { kind: 'block', type: 'controls_for' },
              ],
            },
            {
              kind: 'category',
              name: 'Math',
              colour: '#5C68A6',
              contents: [
                { kind: 'block', type: 'math_number' },
                { kind: 'block', type: 'math_arithmetic' },
                { kind: 'block', type: 'math_single' },
              ],
            },
            {
              kind: 'category',
              name: 'Text',
              colour: '#5CA68D',
              contents: [
                { kind: 'block', type: 'text' },
                { kind: 'block', type: 'text_print' },
              ],
            },
            {
              kind: 'category',
              name: 'Variables',
              colour: '#A65C81',
              custom: 'VARIABLE',
            },
          ],
        },
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        trashcan: true,
      });

      // Load saved workspace if available
      if (module.blocklyXml) {
        const xml = Blockly.utils.xml.textToDom(module.blocklyXml);
        Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
      }
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, [module]);

  const handleSaveProgress = async () => {
    if (workspaceRef.current && module) {
      const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
      const xmlText = Blockly.Xml.domToText(xml);
      
      try {
        await progressAPI.saveProgress({
          userId: 'demo-user', // In a real app, this would come from authentication
          moduleId: module.id,
          progressPercentage: 50,
          isCompleted: false,
          savedBlocklyXml: xmlText,
        });
        alert('Progress saved successfully!');
      } catch (err) {
        alert('Failed to save progress');
      }
    }
  };

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

  if (error || !module) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Module</Alert.Heading>
          <p>{error || 'Module not found'}</p>
          <Link to="/modules" style={{ textDecoration: 'none' }}>
            <Button variant="outline-danger">
              Back to Modules
            </Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Link to="/modules" style={{ textDecoration: 'none' }}>
            <Button variant="outline-secondary" size="sm" className="mb-3">
              <i className="bi bi-arrow-left me-1"></i> Back to Modules
            </Button>
          </Link>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1>{module.title}</h1>
              <p className="lead">{module.description}</p>
            </div>
            <Badge bg={getDifficultyColor(module.difficultyLevel)} className="ms-3">
              Level {module.difficultyLevel}
            </Badge>
          </div>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2">{module.category}</Badge>
            {module.topics.map((topic, index) => (
              <Badge key={index} bg="light" text="dark" className="me-1">
                {topic}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Module Content</h5>
            </Card.Header>
            <Card.Body>
              <p>{module.content}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          {module.hasBlocklyWorkspace && (
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Blockly Workspace</h5>
                <Button variant="primary" size="sm" onClick={handleSaveProgress}>
                  Save Progress
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <div ref={blocklyDiv} className="blockly-workspace"></div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ModuleDetail;
