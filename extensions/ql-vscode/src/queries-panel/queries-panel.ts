import * as vscode from "vscode";
import { DisposableObject } from "../pure/disposable-object";
import { QueryDiscovery, QueryNode } from "./query-discovery";

export class QueryTreeViewItem extends vscode.TreeItem {
  constructor(
    public readonly queryNode: QueryNode | undefined,
    public readonly label: string,
    public readonly tooltip: string | undefined,
    public readonly children: QueryTreeViewItem[],
  ) {
    super(label);
  }
}

export class QueryTreeDataProvider
  extends DisposableObject
  implements vscode.TreeDataProvider<QueryTreeViewItem>
{
  private queryTreeItems: QueryTreeViewItem[];

  public constructor(private readonly queryDiscovery: QueryDiscovery) {
    super();

    this.queryTreeItems = this.createTree();
  }

  public createTree(): QueryTreeViewItem[] {
    const dir = this.queryDiscovery.queryDirectory;
    if (dir) {
      // Get first 2 children and create a tree item for each
      const child1 = dir.children[0];
      // const child2 = dir.children[1];

      return [
        {
          queryNode: undefined,
          label: child1.name,
          tooltip: child1.path,
          children: [],
        },
        // {
        //   queryNode: undefined,
        //   label: child2.name,
        //   tooltip: child2.path,
        //   children: [],
        // },
      ];
      // - Uses query discovery to get root nodes and children
      // - Map that to QueryTreeViewItems
    }
    return [
      { queryNode: undefined, label: "blah", tooltip: undefined, children: [] },
    ];
  }

  // -

  /**
   * Returns the UI presentation of the element that gets displayed in the view.
   * @param node The node to represent.
   * @returns The UI presentation of the node.
   */
  public getTreeItem(
    node: QueryTreeViewItem,
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return node;
  }

  /**
   * Called when expanding a node (including the root node).
   * @param node The node to expand.
   * @returns The children of the node.
   */
  public getChildren(
    node?: QueryTreeViewItem,
  ): vscode.ProviderResult<QueryTreeViewItem[]> {
    if (!node) {
      // We're at the root.
      return Promise.resolve(this.queryTreeItems);
    } else {
      return Promise.resolve(node.children);
    }
  }
}

export class QueriesPanel extends DisposableObject {
  private readonly dataProvider: QueryTreeDataProvider;
  private readonly treeView: vscode.TreeView<QueryTreeViewItem>;

  public constructor(queryDiscovery: QueryDiscovery) {
    super();

    this.dataProvider = new QueryTreeDataProvider(queryDiscovery);

    this.treeView = vscode.window.createTreeView("codeQLQueries", {
      treeDataProvider: this.dataProvider,
    });

    this.push(this.treeView);
  }

  public thisIsBad() {
    this.dataProvider.createTree();
  }
}
