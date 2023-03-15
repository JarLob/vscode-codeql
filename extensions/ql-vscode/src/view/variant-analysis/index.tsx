import * as React from "react";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { WebviewDefinition } from "../webview-definition";
import { VariantAnalysis } from "./VariantAnalysis";

const definition: WebviewDefinition = {
  component: (
    <ErrorBoundary>
      <VariantAnalysis />
    </ErrorBoundary>
  ),
};

export default definition;
