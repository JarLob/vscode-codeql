import * as React from "react";
// import { getErrorMessage, getErrorStack } from "../../pure/helpers-pure";
// import { vscode } from "../vscode-api";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  unknown,
  ErrorBoundaryState
> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _: React.ErrorInfo) {
    console.log("Error boundary caught error", error);
    // vscode.postMessage({
    //   t: "unhandledError",
    //   error: {
    //     message: getErrorMessage(error),
    //     stack: getErrorStack(error),
    //   },
    // });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
