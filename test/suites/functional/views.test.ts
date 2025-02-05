import * as path from 'path'
import * as vscode from 'vscode'
import { workspace } from 'vscode'
import { test } from '@japa/runner'
import EdgeLinkProvider from '../../../src/completion/edge/link_provider'
import type { WorkspaceFolder } from 'vscode'

let mainWorkspace: string

test.group('Views Link Provider', (group) => {
  group.setup(() => {
    const workspaceFolders = workspace.workspaceFolders as WorkspaceFolder[]
    mainWorkspace = workspaceFolders[0]!.uri.fsPath
  })

  test('Flat and nested links to partials', async ({ assert }) => {
    const provider = new EdgeLinkProvider()
    const doc = await vscode.workspace.openTextDocument(
      path.join(mainWorkspace, 'resources/views/test.edge')
    )
    const links = await provider.provideDocumentLinks(doc)

    assert.deepEqual(links!.length, 3)
    assert.include(links![0]!.target!.path, 'resources/views/partials/sub/partialA.edge')
    assert.include(links![1]!.target!.path, 'resources/views/partials/sub/partialB.edge')
    assert.include(links![2]!.target!.path, 'resources/views/partials/footer.edge')
  })

  test('@layout and @!components links', async ({ assert }) => {
    const provider = new EdgeLinkProvider()
    const doc = await vscode.workspace.openTextDocument(
      path.join(mainWorkspace, 'resources/views/test-layout-component.edge')
    )
    const links = await provider.provideDocumentLinks(doc)

    assert.deepEqual(links!.length, 2)
    assert.include(links![0]!.target!.path, 'resources/views/layouts/master.edge')
    assert.include(links![1]!.target!.path, 'resources/views/components/button.edge')
  })
})
