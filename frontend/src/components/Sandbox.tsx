import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { sandboxAPI } from '../services/api';
import './Sandbox.css';

const Sandbox: React.FC = () => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspaceRef.current) {
      // Initialize Blockly workspace with full toolbox
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
                { kind: 'block', type: 'controls_ifelse' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_operation' },
                { kind: 'block', type: 'logic_negate' },
                { kind: 'block', type: 'logic_boolean' },
                { kind: 'block', type: 'logic_null' },
                { kind: 'block', type: 'logic_ternary' },
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
                { kind: 'block', type: 'controls_forEach' },
                { kind: 'block', type: 'controls_flow_statements' },
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
                { kind: 'block', type: 'math_trig' },
                { kind: 'block', type: 'math_constant' },
                { kind: 'block', type: 'math_number_property' },
                { kind: 'block', type: 'math_round' },
                { kind: 'block', type: 'math_on_list' },
                { kind: 'block', type: 'math_modulo' },
                { kind: 'block', type: 'math_constrain' },
                { kind: 'block', type: 'math_random_int' },
                { kind: 'block', type: 'math_random_float' },
              ],
            },
            {
              kind: 'category',
              name: 'Text',
              colour: '#5CA68D',
              contents: [
                { kind: 'block', type: 'text' },
                { kind: 'block', type: 'text_join' },
                { kind: 'block', type: 'text_append' },
                { kind: 'block', type: 'text_length' },
                { kind: 'block', type: 'text_isEmpty' },
                { kind: 'block', type: 'text_indexOf' },
                { kind: 'block', type: 'text_charAt' },
                { kind: 'block', type: 'text_getSubstring' },
                { kind: 'block', type: 'text_changeCase' },
                { kind: 'block', type: 'text_trim' },
                { kind: 'block', type: 'text_print' },
              ],
            },
            {
              kind: 'category',
              name: 'Lists',
              colour: '#745CA6',
              contents: [
                { kind: 'block', type: 'lists_create_with' },
                { kind: 'block', type: 'lists_create_empty' },
                { kind: 'block', type: 'lists_repeat' },
                { kind: 'block', type: 'lists_length' },
                { kind: 'block', type: 'lists_isEmpty' },
                { kind: 'block', type: 'lists_indexOf' },
                { kind: 'block', type: 'lists_getIndex' },
                { kind: 'block', type: 'lists_setIndex' },
              ],
            },
            {
              kind: 'category',
              name: 'Variables',
              colour: '#A65C81',
              custom: 'VARIABLE',
            },
            {
              kind: 'category',
              name: 'Functions',
              colour: '#9A5CA6',
              custom: 'PROCEDURE',
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

      // Add change listener to generate code
      workspaceRef.current.addChangeListener(() => {
        if (workspaceRef.current) {
          const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
          setGeneratedCode(code);
        }
      });
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (workspaceRef.current) {
      const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
      const xmlText = Blockly.Xml.domToText(xml);

      try {
        const result = await sandboxAPI.submitCode({
          userId: 'demo-user',
          moduleId: 0, // Sandbox doesn't belong to a specific module
          blocklyXml: xmlText,
          generatedCode: generatedCode,
        });

        setFeedback({
          type: result.isSuccessful ? 'success' : 'danger',
          message: result.feedbackMessage || 'Code submitted',
        });
      } catch (err) {
        setFeedback({
          type: 'danger',
          message: 'Failed to submit code. Please ensure the backend API is running.',
        });
      }
    }
  };

  const handleClear = () => {
    if (workspaceRef.current) {
      workspaceRef.current.clear();
      setGeneratedCode('');
      setFeedback(null);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1>Code Sandbox</h1>
          <p className="lead">Experiment with block-based programming in a safe environment</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Blockly Workspace</h5>
              <div>
                <Button variant="outline-danger" size="sm" onClick={handleClear} className="me-2">
                  Clear
                </Button>
                <Button variant="primary" size="sm" onClick={handleSubmit}>
                  Submit Code
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div ref={blocklyDiv} className="blockly-sandbox"></div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Generated JavaScript Code</h5>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={15}
                value={generatedCode}
                readOnly
                className="font-monospace"
                style={{ fontSize: '0.85rem' }}
              />
            </Card.Body>
          </Card>

          {feedback && (
            <Alert variant={feedback.type} dismissible onClose={() => setFeedback(null)}>
              {feedback.message}
            </Alert>
          )}

          <Card>
            <Card.Header>
              <h5 className="mb-0">Tips</h5>
            </Card.Header>
            <Card.Body>
              <ul className="mb-0">
                <li>Drag blocks from the toolbox on the left</li>
                <li>Connect blocks to build your program</li>
                <li>See the generated JavaScript code in real-time</li>
                <li>Submit your code to save it</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Sandbox;
