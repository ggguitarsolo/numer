import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../page/home/home";
import Bisection from "../Chapter 1/Bisec";
import FalsePosition from "../Chapter 1/False";
import OnePoint from "../Chapter 1/Onepoint";
import Newton from "../Chapter 1/Newton";
import Secant from "../Chapter 1/Secant";
import Forwardh from "../Chapter 7/Forwardh";
import Backwardh from "../Chapter 7/Backwardh";

export default () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bisection" component={Bisection} />      
      <Route exact path="/False" component={FalsePosition} />
      <Route exact path="/Onepoint" component={OnePoint} />
      <Route exact path="/Newton" component={Newton} />
      <Route exact path="/Secant" component={Secant} />
      <Route exact path="/Forwardh" component={Forwardh} />
      <Route exact path="/Backwardh" component={Backwardh} />
    </Switch>
  );