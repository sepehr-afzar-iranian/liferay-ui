import React, { Component } from "react";
import ErrorPage from "./ErrorPage";
import addHandler from "./utils/addHandler";
import isEqual from "lodash/isEqual";

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developmentMode: window.Liferay.Language.available ? false : true,
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    this.setState({ error, componentStack: info.componentStack });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state);
  }
  componentDidMount() {
    if (this.props.eventHandlerErrors)
      addHandler(window, "onerror", (error) => {
        this.setState({ error: error.message, componentStack: null });
      });
  }
  render() {
    return this.state.error && this.state.developmentMode ? <ErrorPage {...this.state} /> : this.props.children;
  }
}
