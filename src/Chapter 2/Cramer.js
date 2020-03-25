import { Layout, Breadcrumb, Input, Card, Row, Table, Button } from 'antd';
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs, derivative } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
const { Content } = Layout;

var A = [], B = [], answer = [], matrixA = [], matrixB = []

class Cramer extends Component {
    constructor() {
        super();
        this.state = {
            row: parseInt(0),
            column: parseInt(0),
            showMatrix: false,
            showAnswer: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);
    
    }

    cramer() {
        this.initMatrix();
        var counter=0; 
        // eslint-disable-next-line eqeqeq
        while (counter != this.state.row) { 
            var transformMatrix = JSON.parse(JSON.stringify(A));//Deep copy
            for (var i=0 ; i<this.state.row ; i++) {
                for (var j=0 ; j<this.state.column ; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }
                    
                }
            
            } 
            counter++;
            answer.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{round(det(transformMatrix))/round(det(A))}</h2>)
            answer.push(<br/>)
            
            

        }
        this.setState({
          showAnswer: true
        });

      
    }
    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",  
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
        }

        this.setState({
          showMatrix: true
        })
        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
  render() {
    return (
      <div>
          <Layout>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Lesson 2</Breadcrumb.Item>
            <Breadcrumb.Item>Carmer's Rule</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#eee', padding: 24, margin: 0, minHeight: 280 ,height: '100%'
              }}
            >
              <Row type="flex" justify="space-around" align="middle">
                <Col span={6} style={{minWidth: 60}}>
                  <div onChange={this.handleChange}>
                    <span>Row</span><Input name="row" />
                    <span>Column</span><Input name="column" />
                    <Button id='submit' onClick={ ()=>this.createMatrix(this.state.row, this.state.column)} style={{margin:'10px 0px'}}>Submit</Button>
                  </div>
                </Col>
                <Col span={14} style={{minWidth: 160}}>
                  { this.state.showMatrix && <div onChange={this.handleChange}>
                    Matrix [A]<br/>
                    {matrixA}
                    Vector [B]<br/>
                    {matrixB}
                    <br/><Button id='submit' onClick={ ()=>this.cramer()} style={{margin:'10px 0px'}}>Submit</Button>
                  </div>}                 
                </Col>
              </Row>
              <Row><div><br/></div></Row>
              <Row >
                  <div align="middle">
                    {this.state.showAnswer && <div>{answer}</div>}
                  </div>
              </Row>
            </Content>
          </Layout>
      </div>
    );
  }
}

export default Cramer;