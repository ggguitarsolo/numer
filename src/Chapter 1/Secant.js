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
let fxg = [];

class Secant extends Component {
  componentDidMount() {
    fetch("/secant")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {
    super();
    this.state = {
      function: " ",
      XOLD: " ",
      XNEW: " ",
      items: [],
      X: 0,
      showGrap: false,
      showTable: false
    };
    this.onChangefunction = this.onChangefunction.bind(this);
    this.onChangeVariableXNEW = this.onChangeVariableXNEW.bind(this);
    this.onChangeVariableXOLD = this.onChangeVariableXOLD.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onExample = this.onExample.bind(this)
  }
  
  onChangefunction(func) {
    this.setState({ function: func.target.value });
  }
  onChangeVariableXNEW = event => {
    this.setState({ XNEW: event.target.value });
  };
  onChangeVariableXOLD = event => {
    this.setState({ XOLD: event.target.value });
  };
  onExample() {
    this.componentDidMount();
    this.setState({
      function: this.state.items.Function,
      XOLD: this.state.items.XOLD,
      XNEW: this.state.items.XNEW
    })
  };
  onSubmit() {
    if (this.state.XOLD < this.state.XNEW) {
      dataInTable = [];
      let sum = 0.0;
      let i = 1;
      let xout2 = 0;
      let fxold = 0,
        fxnew = 0;
      let xold2 = parseFloat(this.state.XOLD),
        xnew2 = parseFloat(this.state.XNEW);
      let inputy = [];
      inputy["xout"] = [];
      inputy["xold"] = [];
      inputy["xnew"] = [];
      inputy["xg"] = [];
      inputy["error"] = [];

      inputy["xold"][i] = xold2;
      inputy["xnew"][i] = xnew2;
      inputy["xg"][i - 1] = xold2;
      inputy["xg"][i] = xnew2;
      fxnew = this.funcChange(xnew2);
      fxold = this.funcChange(xold2);
      fxg[i - 1] = fxold;
      fxg[i] = fxnew;
      inputy["error"][i - 1] = 1;

      
      do {
        xout2 = xnew2 - ((fxnew * (xold2 - xnew2)) / (fxold - fxnew));
        inputy["xout"][i] = xout2;
        inputy["xg"][i + 1] = xout2;
        fxg[i + 1] = this.funcChange(xout2);
        xold2 = xnew2;
        xnew2 = xout2;
        fxnew = this.funcChange(xnew2);
        fxold = this.funcChange(xold2);
        inputy["xold"][i + 1] = xold2;
        inputy["xnew"][i + 1] = xnew2;
        sum = this.funcError(xnew2, xold2);
        inputy["error"][i] = sum;
        i++;
      } while (sum > 0.000001);
      this.setState({ showGrap: true, showTable: true });
      this.Graph(inputy["xg"]);
      this.createTable(
        inputy["xold"],
        inputy["xnew"],
        inputy["xout"],
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
  
  funcError = (Xnew, Xold) => {
    return abs((Xnew - Xold) / Xnew);
  };
  
  createTable(xold, xnew, xout, error) {
    for (var i = 1; i < xout.length; i++) {
      dataInTable.push({
        iteration: i,
        xold: xold[i],
        xnew: xnew[i],
        xout: xout[i],
        error: error[i]
      });
    }
  }
  Graph(xg) {
    data = [
      {
        type: "scatter",
        x: xg,
        y: fxg,
        marker: {
          color: "#66FF66"
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
        title: "X-1",
        dataIndex: "xold",
        key: "kxold"
      },
      {
        title: "X",
        dataIndex: "xnew",
        key: "kxnew"
      },
      {
        title: "X+1",
        dataIndex: "xout",
        key: "kxout"
      },
      {
        title: "Error",
        key: "kerror",
        dataIndex: "error"
      }
    ];
    
    var fx = this.state.function;
    let layout = {
      title: "Secant",
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
          <Breadcrumb.Item><center><h2>Secant Method </h2></center></Breadcrumb.Item>
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
              <h2 className="text-white">Xi-1</h2>
              <label>
                <input
                  placeholder={this.state.XOLD}
                  type="text"
                  value={this.state.value}
                  onChange={this.onChangeVariableXOLD}
                />
              </label>
              <h2 className="text-white">Xi</h2>
              <label>
                <input
                  placeholder={this.state.XNEW}
                  type="text"
                  value={this.state.value}
                  onChange={this.onChangeVariableXNEW}
                />
              </label>
              <br></br>
              <br></br>

              <div>
                <Button variant="dashed" onClick={this.onSubmit} style={{ backgroundColor: '#F3F9A8' }}>SUBMIT </Button>
                <Button variant="dashed" href="/Secant" style={{ backgroundColor: '#F9A8A8' }}> CLEAR  </Button>
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
export default Secant;

