import { Layout, Breadcrumb, Input, Card, Row, Table, Button } from 'antd';
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs, derivative } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'

const { Header, Content, Sider } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly);
let dataInTable = [];
let data = [];
let fxout = [];

class Newton extends Component {
  componentDidMount() {
    fetch("/newton")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {
    super();
    this.state = {
      function: " ",
      X0: " ",
      X: 0,
      items: [],
      showGrap: false,
      showTable: false
    };
    this.onChangefunction = this.onChangefunction.bind(this);
    this.onChangeVariableX0 = this.onChangeVariableX0.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onExample = this.onExample.bind(this)
  }
 
  onChangefunction(func) {
    this.setState({ function: func.target.value });
  }
  onChangeVariableX0 = event => {
    this.setState({ X0: event.target.value });
  };
  onExample() {
    this.componentDidMount();
    this.setState({
      function: this.state.items.Function,
      X0: this.state.items.X
    })
  };
  onSubmit() {
    if (this.state.X0 != " " && this.state.function != " ") {
      dataInTable = [];
      let sum = 0.0;
      let increaseFunction = false;
      let i = 1;
      let xold;
      let xnew;
      let x0 = parseFloat(this.state.X0)
      let inputy = [];
      inputy["xout"] = [];
      inputy["xout2"] = [];
      inputy["error"] = [];


      inputy["xout"][i - 1] = x0;
      inputy["error"][i - 1] = 1;
      fxout[i - 1] = parseFloat(this.funcChange(x0));
      xnew = parseFloat(x0 - (this.funcChange(x0) / this.funcDiff(x0)));
      inputy["xout"][i] = xnew;
      inputy["xout2"][i - 1] = xnew;
      fxout[i] = parseFloat(this.funcChange(xnew));
      xold = xnew;

     
      do {
        xnew = parseFloat(xold - (this.funcChange(xold) / this.funcDiff(xold)));
        inputy["xout"][i + 1] = xnew;
        inputy["xout2"][i] = xnew;
        fxout[i + 1] = parseFloat(this.funcChange(xnew));
        sum = this.funcError(xnew, xold);
        xold = xnew;
        inputy["error"][i] = sum;
        i++;
      } while (sum > 0.000001);
      this.setState({ showGrap: true, showTable: true });
      this.Graph(inputy["xout"]);
      this.createTable(
        inputy["xout"],
        inputy["xout2"],
        inputy["error"]
      );
    } else {
      alert("Input Error");
    };
  };

  funcChange = X => {
    let scope = { x: parseFloat(X) };
    var expr = compile(this.state.function);
    return expr.evaluate(scope);
  };
  funcDiff = (X) => {
    let scope = { x: parseFloat(X) };
    var expr = derivative(this.state.function, 'x');
    return expr.evaluate(scope);
  };
  
  funcError = (Xnew, Xold) => {
    return abs((Xnew - Xold) / Xnew);
  };
 
  createTable(xout, xout2, error) {
    for (var i = 0; i < error.length; i++) {
      dataInTable.push({
        iteration: i,
        x: xout[i],
        x2: xout2[i],
        error: error[i]
      });
    }
  }
  Graph(xout) {
    data = [
      {
        type: "scatter",
        x: xout,
        y: fxout,
        marker: {
          color: "#B60400"
        },
        name: "X"
      }
    ];
  }

  render() {

    var tablestyle = {
      width: "100%",
      background: "#0",
      color: "#0",
      float: "inline-start",
      marginBlockStart: "2%"
    };
    var body = {
      fontWeight: "bold",
      fontSize: "18px",
      color: "ิblack"
    };
    const columns = [
      {
        title: "Iteration",
        dataIndex: "iteration",
        key: "kiteration"
      },
      {
        title: "Xi",
        dataIndex: "x",
        key: "kx"
      },
      {
        title: "Xi+1",
        dataIndex: "x2",
        key: "kx2"
      },
      {
        title: "Error",
        key: "kerror",
        dataIndex: "error"
      }
    ];

    var fx = this.state.function;
    let layout = {
      title: "Newton Raphson",
      xaxis: {
        title: "X"
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (
      <Layout style={{ padding: '0 12px 12px' }}>
        <Breadcrumb style={{ margin: '36px 0' }}>
          <Breadcrumb.Item><center><h2>Newton Raphson Method </h2></center></Breadcrumb.Item>
        </Breadcrumb>
        <Content

          style={{
            background: '#229954',
            padding: 36,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div width={10000} className="has-text-centered">

            <Form>
              <br /><br /><h2 className="text-white">Function</h2>
              <label>
                <input
                  placeholder={this.state.function}
                  type="text"
                  value={this.state.value}
                  onChange={this.onChangefunction}
                />
              </label>
              <h2 className="text-white">X0</h2>
              <label>
                <input
                  placeholder={this.state.X0}
                  type="text"
                  value={this.state.value}
                  onChange={this.onChangeVariableX0}
                />
              </label>
              <br></br>
              <br></br>

              <div>
                <Button variant="dashed" onClick={this.onSubmit} style={{ backgroundColor: '#F3F9A8' }}>SUBMIT </Button>
                <Button variant="dashed" href="/Newton" style={{ backgroundColor: '#F9A8A8' }}> CLEAR  </Button>
                <Button onClick={this.onExample} style={{ backgroundColor: '#AEC9FF' }} >EXAMPLE </Button>
              </div>
            </Form>
            
            {this.state.showTable === true ? (
              <Card bordered={true}
               style={tablestyle} 
               id="outputCard">

                <Table
                  columns={columns}
                  dataSource={dataInTable}
                  bodyStyle={body}
                ></Table>
              </Card>
            ) : (
                ""
              )}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          
            {this.state.showGrap === true ? (
              <PlotlyComponent data={data} config={config} />
            ) : (
                ""
              )}
          </div>
        </Content>
      </Layout>
    );
  }
}
export default Newton;
