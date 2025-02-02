import * as vscode from "vscode";

export class QueryTreeViewItem extends vscode.TreeItem {
  constructor(
    name: string,
    path: string,
    public readonly children: QueryTreeViewItem[],
  ) {
    super(name);
    this.tooltip = path;
    this.collapsibleState = this.children.length
      ? vscode.TreeItemCollapsibleState.Collapsed
      : vscode.TreeItemCollapsibleState.None;
    if (this.children.length === 0) {
      this.command = {
        title: "Open",
        command: "vscode.open",
        arguments: [vscode.Uri.file(path)],
      };
    }
  }
}
