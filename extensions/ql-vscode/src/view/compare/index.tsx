import * as React from "react";
import { ErrorBoundary } from '../common/ErrorBoundary';
import { WebviewDefinition } from "../webview-definition";
import { Compare } from "./Compare";

const definition: WebviewDefinition = {
  component: (
    <ErrorBoundary>
      <Compare />
    </ErrorBoundary>
  ),
};

export default definition;
