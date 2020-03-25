import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import Routing from "./route/Link"
import { Route, Link, NavLink } from "react-router-dom";
import './App.css';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">                  
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '20px' }}
          >
          </Menu>
        </Header>

        <Layout>
          <Sider width={250} style={{ background: '#F2FCA2' }}>
            <Menu
              mode="inline"             
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="/"><Link to="/"style={{ backgroundColor: '#46B800'}}>HOME</Link></Menu.Item>              

              <SubMenu               
                title={
                  <span>
                    CHAPTER 1
                  </span>
                }
              >                 
                <Menu.Item key='Bisection'><Link to="/bisection"style={{ backgroundColor: '#F9F1A4'}}>Bisection Method</Link></Menu.Item>
                <Menu.Item key='False'><Link to="/false"style={{ backgroundColor: '#F9F1A4'}}>False Position Method</Link></Menu.Item>
                <Menu.Item key='OnePoint'><Link to="/Onepoint"style={{ backgroundColor: '#F9F1A4'}}>One-Point Iteration Method</Link></Menu.Item>
                <Menu.Item key='Newton'><Link to="/Newton"style={{ backgroundColor: '#F9F1A4'}}>Newton-Raphson Method</Link></Menu.Item>
                <Menu.Item key='Secant'><Link to="/Secant"style={{ backgroundColor: '#F9F1A4'}}>Secant Method</Link></Menu.Item>
              </SubMenu>

              <SubMenu
                //key="sub2"
                title={
                  <span>
                    CHAPTER 2
                  </span>
                }
              >
                <Menu.Item key="Cramer">Cramer's Rule</Menu.Item>
                <Menu.Item key="Gauss Eliminat">Gauss Elimination</Menu.Item>
                <Menu.Item key="Gauss Jordan">Gauss Jordan</Menu.Item>
                <Menu.Item key="LU">LU Decomposition</Menu.Item>
                <Menu.Item key="Cholesky">Cholesky Decomposition</Menu.Item>
                <Menu.Item key="Jacobi">Jacobi Iteration</Menu.Item>
                <Menu.Item key="Gauss Seidel">Gauss Seidel Iteration</Menu.Item>
                <Menu.Item key="Conjugate">Conjugate Gradient</Menu.Item>
              </SubMenu>
              <SubMenu
                //key="sub3"
                title={
                  <span>
                    CHAPTER 3
                  </span>
                }
              >
                <Menu.Item key="Linear">Linear interpolation</Menu.Item>
                <Menu.Item key="Quadratic">Quadratic interpolation</Menu.Item>
                <Menu.Item key="Polynomial">Polynomial interpolation</Menu.Item>
                <Menu.Item key="Lagrange">Lagrange interpolation</Menu.Item>               
              </SubMenu>  
              
              <SubMenu
                //key="sub4"
                title={
                  <span>
                    CHAPTER 4
                  </span>
                }
              >
                <Menu.Item key="Linear spline">Linear spline</Menu.Item>
                <Menu.Item key="Quadratic spline">Quadratic spline</Menu.Item>                
              </SubMenu>

              <SubMenu
                //key="sub5"
                title={
                  <span>
                    CHAPTER 5
                  </span>
                }
              >
                <Menu.Item key="Linear">Linear regression</Menu.Item>
                <Menu.Item key="Polynomial">Polynomial regression</Menu.Item>
                <Menu.Item key="Multiple">Multiple linear regression</Menu.Item>
              </SubMenu>

              <SubMenu
                //key="sub6"
                title={
                  <span>
                    CHAPTER 6
                  </span>
                }
              >
                <Menu.Item key="Trapezoidal">Trapezoidal rule</Menu.Item>
                <Menu.Item key="Composite trapezoidal">Composite trapezoidal rule</Menu.Item>
                <Menu.Item key="Simpson">Simpson's rule</Menu.Item>
                <Menu.Item key="Composite simpson">Composite simpson's rule</Menu.Item>
              </SubMenu>

              <SubMenu
                //key="sub7"
                title={
                  <span>
                    CHAPTER 7
                  </span>
                }
              >
                <Menu.Item key='Forwardh'><Link to="/Forwardh"style={{ backgroundColor: '#F9F1A4'}}>Forward divided-differences</Link></Menu.Item>
                <Menu.Item key='Backwardh'><Link to="/Backwardh"style={{ backgroundColor: '#F9F1A4'}}>Backward divided-differences</Link></Menu.Item>
                <Menu.Item key="Central">Central divided-differences</Menu.Item>
              </SubMenu>
                          
            </Menu>           
          </Sider>     
          
          <Routing />
         
        </Layout>
          
      </Layout>

    );
  }
}

export default App;