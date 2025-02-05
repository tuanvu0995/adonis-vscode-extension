import * as path from 'path'
import { test } from '@japa/runner'
import { workspace } from 'vscode'
import { DocumentationProvider } from '../../../src/services/documentation_provider'
import type { MarkdownString, WorkspaceFolder } from 'vscode'

let mainWorkspace: string

test.group('Autocomplete Markdown Documentation Generation', (group) => {
  group.setup(() => {
    const workspaceFolders = workspace.workspaceFolders as WorkspaceFolder[]
    mainWorkspace = workspaceFolders[0]!.uri.fsPath
  })

  test('Documentation is returned for existing method in typescript file', ({ assert }) => {
    const file = path.resolve(mainWorkspace, 'app/Controllers/Http/FooController.ts')

    let documentation = DocumentationProvider.getDocForMethodInFile(file, 'methodA')
    assert.notEqual(documentation, null)

    documentation = documentation as MarkdownString
    assert.deepInclude(documentation.value, 'Execute the methodA.')
  })

  test('Documentation is not returned for methods that do not exist in typescript file', ({
    assert,
  }) => {
    const file = path.resolve(mainWorkspace, 'app/Controllers/Http/FooController.ts')

    const documentation = DocumentationProvider.getDocForMethodInFile(file, 'notExisting')
    assert.deepEqual(documentation, null)
  })
})
