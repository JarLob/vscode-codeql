import * as React from "react";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { WebviewDefinition } from "../webview-definition";
import { ResultsApp } from "./results";

const definition: WebviewDefinition = {
  component: (
    <ErrorBoundary>
      <ResultsApp />
    </ErrorBoundary>
  ),
};

export default definition;
