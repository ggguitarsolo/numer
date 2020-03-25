import { Layout, Breadcrumb, Input, Card, Row, Table, Button } from 'antd';
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap'
import { range, compile, evaluate, simplify, parse, abs } from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'

const { Header, Content, Sider } = Layout;
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var fxr = [], fxl = [], fxm = []

class FalsePositionMethod extends Component {
  componentDidMount() {
    fetch("/false")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor() {

    super();
    this.state = { function: " ", Xr:" " , Xl:" " , X:" " , showGrap: false, showTable: false, items: [] }
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this)
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
  }
  onChangefunction(func) {
    this.setState({ function: func.target.value })
    console.log(this.state.function);
  }
  onChangeVariableXr = (event) => {
    this.setState({ Xr: event.target.value })
  }
  onChangeVariableXl = (event) => {
    this.setState({ Xl: event.target.value })
  }
  onExample() {
    this.componentDidMount();
    this.setState({
      function: this.state.items.Function,
      Xl: this.state.items.XL,
      Xr: this.state.items.XR
    })

  }
  onSubmit() {
    if (this.state.Xl < this.state.Xr) {
      dataInTable = []
      var sum = parseFloat(0.000000)
      var increaseFunction = false
      var n = 0
      var xm, xl = parseFloat(this.state.Xl), xr = parseFloat(this.state.Xr)
      var inputy = []
      inputy['xl'] = []
      inputy['xm'] = []
      inputy['xr'] = []
      inputy['error'] = []

      inputy['xl'][n] = xl.toFixed(6)
      inputy['xr'][n] = xr.toFixed(6)

      fxr[n] = this.funcChange(xr)
      fxl[n] = this.funcChange(xl)
      xm = (((xl * fxr[n]) - (xr * fxl[n])) / (fxr[n] - fxl[n])).toFixed(6)
      inputy['xm'][n] = xm
      fxm[n] = this.funcChange(xm).toFixed(6)
      inputy['error'][n] = 1
      increaseFunction = (((fxr[n]) * fxm[n]) <= 0 ? true : false)
      if (increaseFunction) {
        xl = xm
      }
      else {
        xr = xm
      }

      do {
        inputy['xl'][n + 1] = (parseFloat(xl)).toFixed(6)
        inputy['xr'][n + 1] = (parseFloat(xr)).toFixed(6)
        fxr[n + 1] = (this.funcChange(inputy['xr'][n + 1])).toFixed(6)
        fxl[n + 1] = (this.funcChange(inputy['xl'][n + 1])).toFixed(6)
        xm = (((xl * fxr[n + 1]) - (xr * fxl[n + 1])) / (fxr[n + 1] - fxl[n + 1])).toFixed(6)
        fxm[n + 1] = (this.funcChange(xm)).toFixed(6)
        increaseFunction = (((fxr[n + 1]) * fxm[n + 1]) <= 0 ? true : false)
        if (increaseFunction) {
          xl = xm
        }
        else {
          xr = xm
        }
        sum = (this.funcError(xm, inputy['xm'][n])).toFixed(6)
        inputy['xm'][n + 1] = xm
        inputy['error'][n + 1] = sum
        n++;

      } while (sum > 0.000001)
      this.setState({ showGrap: true, showTable: true })
      this.Graph(inputy['xl'], inputy['xr'])
      this.createTable(inputy['xl'], inputy['xr'], inputy['xm'], inputy['error']);
    }

    else {
      console.log("Please Input Xl > Xr")
    }
  }

  funcChange = (X) => { let scope = { x: parseFloat(X) }; var expr = compile(this.state.function); return expr.evaluate(scope) }

  funcError = (Xnew, Xold) => { return abs((Xnew - Xold) / Xnew) }

  createTable(xl, xr, xm, error) {
    for (var i = 0; i < xl.length; i++) {
      dataInTable.push({
        iteration: i,
        xl: xl[i],
        xr: xr[i],
        xm: xm[i],
        error: error[i],
      });
    }
  }
  Graph(xl, xr) {
    data = [
      {
        type: 'scatter',
        x: xl,
        y: fxl,
        marker: {
          color: 'rgb(150, 32, 77)'
        },
        name: 'XL'
      },
      {
        type: 'scatter',
        x: xr,
        y: fxr,
        marker: {
          color: '#151DEA'
        },
        name: 'XR'
      }];
  }

  render() {
    var fx = this.state.function
    let layout = {
      title: 'False-Position',
      xaxis: {
        title: 'X'
      }
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    var Textstyle = {
      textAlign: 'center',
      textDecorationLine: 'underline'
    }
    var tablestyle =
    {
      width: "100%", background: "#229954", color: "#151DEA", float: "inline-start", marginBlockStart: "2%"
    }
    var body = {
      fontWeight: "bold", fontSize: "12px", color: "#229954"
    }
    const columns = [
      {
        title: "Iteration",
        dataIndex: "iteration",
        key: "kiteration"
      },
      {
        title: "XL",
        dataIndex: "xl",
        key: "kxl"
      },
      {
        title: "XR",
        dataIndex: "xr",
        key: "kxr"
      },
      {
        title: "Xm",
        dataIndex: "xm",
        key: "kxm"
      },
      {
        title: "Error",
        key: "kerror",
        dataIndex: "error"
      }
    ];


    return (
      <Layout style={{ padding: '0 12px 12px' }}>
        <Breadcrumb style={{ margin: '36px 0' }}>
          <Breadcrumb.Item><center><h2>FalsePosition Method </h2></center></Breadcrumb.Item>
        </Breadcrumb>
        <Content

          style={{
            background: '#229954',
            padding: 36,
            margin: 0,
            minHeight: 280,
          }}
        >

          <React.Fragment>
            <div width={10000}>
              <Form>
                <Form.Group as={Row} controlId="functionFalsePosition">
                  <Form.Label column sm="2">
                    <br /><br /><h2 className="text-white">Function</h2>
                  </Form.Label>
                  <Col sm="2"><br /><br />
                    < Form.Control type="text" placeholder={this.state.function} onChange={this.onChangefunction} />
                    <br /><br /></Col>
                </Form.Group>
                <Form.Group as={Row} controlId="VariableXrFalsePosition">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Xl</h2>
                  </Form.Label>
                  <Col sm="2"><br /><br />
                    <Form.Control type="text" placeholder={this.state.Xl} onChange={this.onChangeVariableXl} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="VariableXlFalsePosition">
                  <Form.Label column sm="2">
                    <h2 className="text-white">Xr</h2>
                  </Form.Label>
                  <Col sm="2"><br /><br />
                    <Form.Control type="text" placeholder={this.state.Xr} onChange={this.onChangeVariableXr} />
                  </Col>
                </Form.Group>
                <br /><br />
                <div>
                  <Button onClick={this.onSubmit} style={{ backgroundColor: '#F3F9A8' }}> SUBMIT </Button>
                  <Button href="/False" style={{ backgroundColor: '#F9A8A8' }}> CLEAR </Button>
                  <Button onClick={this.onExample} style={{ backgroundColor: '#AEC9FF' }}> EXAMPLE </Button>
                </div>

              </Form>

              {this.state.showTable === true ?
                <Card
                  
                  bordered={true}
                  style={tablestyle}
                  id="outputCard"
                >
                  <Table columns={columns} dataSource={dataInTable} bodyStyle={body}
                  ></Table>
                </Card>
                : ''}


              {this.state.showGrap === true ?
                <PlotlyComponent data={data} Layout={layout} config={config} /> : ''
              }
            </div>
          </React.Fragment>
        </Content>
      </Layout>
    );
  }
}
export default FalsePositionMethod;



