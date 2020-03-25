import { Layout, Breadcrumb, Input, Card, Row, Table, Button } from 'antd';
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs, derivative } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'

const { Header, Content, Sider } = Layout;
var y, error, exact;
class backwardh extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x) - this.func(x - (1 * h))) / h
                break;
            case 2:
                y = (this.func(x) - 2 * this.func(x - (1 * h)) + this.func(x - (2 * h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x) - 3 * this.func(x - (1 * h)) + 3 * this.func(x - (2 * h)) - this.func(x - (3 * h))) / Math.pow(h, 3)
                break;
            default:
                y = (this.func(x) - 4 * this.func(x - (1 * h)) + 6 * this.func(x - (2 * h)) - 4 * this.func(x - (3 * h)) + this.func(x - (4 * h))) / Math.pow(h, 4)
        }
        exact = this.funcDiff(x)
        error = abs((y - exact) / y) * 100
        this.setState({
            showOutput: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    funcDiff(X) {
        var expr = derivative(this.state.fx, 'x')
        let scope = { x: parseFloat(X) }
        return expr.eval(scope)
    }




    render() {
        return (
            <div>
                <Layout style={{ padding: '0 12px 12px' }}>
                    <Breadcrumb style={{ margin: '36px 0' }}>
                    <Breadcrumb.Item><center><h2>Backward O(h)</h2></center></Breadcrumb.Item>
                    </Breadcrumb>
                    <Content

                        style={{
                            background: '#229954',
                            padding: 36,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Breadcrumb style={{ margin: '16px 0' }}>

                            
                        </Breadcrumb>
                        <Content style={{
                            background: '#eee', padding: 24, margin: 0, minHeight: 280, height: '100%'
                        }}
                        >
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={6} style={{ minWidth: 60 }}>
                                    <div onChange={this.handleChange}>
                                        <span>Function</span><Input name="fx" />
                                        <span>Order derivative</span><Input name="degree" />
                                        <span>X</span><Input name="x" />
                                        <span>H</span><Input name="h" />
                                        <Button id='submit' onClick={() => this.backwardh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))} 
                                        style={{ margin: '10px 0px', backgroundColor: '#F3F9A8' }}>SUBMIT</Button>

                                    </div>
                                </Col>
                                <Col span={14} style={{ minWidth: 160 }}>
                                    <div>
                                        {this.state.showOutput &&
                                            <div align="middle">
                                                Approximate = {y.toFixed(8)}<br />
                                                Exact = {exact.toFixed(8)}<br />
                                                Error(ε) = {error.toFixed(4)}%<br />
                                            </div>
                                        }

                                    </div>
                                </Col>
                            </Row>
                        </Content>
                     </Content>
                </Layout>
      </div>
    );
  }
}

export default backwardh;
