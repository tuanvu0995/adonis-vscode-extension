import { Hover } from 'vscode'
import { parseControllerString } from '../../utilities/controller'
import Config from '../../utilities/config'
import { getExactPathMatch } from '../../utilities/path_matching'
import { DocumentationProvider } from '../../services/documentation_provider'
import type { HoverProvider, Position, TextDocument } from 'vscode'
import type { Controller } from '../../contracts'

const { controllersRegex, controllersDirectories, controllersExtensions } = Config.autocomplete

class RouteControllerHoverProvider implements HoverProvider {
  public provideHover(doc: TextDocument, pos: Position) {
    const regex = new RegExp(controllersRegex)
    const range = doc.getWordRangeAtPosition(pos, regex)
    if (!range) return

    const controller = parseControllerString(doc.getText(range))
    if (!controller) return

    const markdown = this.generateHoverText(controller, doc)
    if (!markdown) return

    return new Hover(markdown)
  }

  /**
   * Generate hover text for a controller.
   *
   * @param controller Controller to provide hover text for.
   * @param activeDocument Current active document where hover is triggered.
   */
  private generateHoverText(controller: Controller, activeDocument: TextDocument) {
    const controllerPath = getExactPathMatch(
      controller.name,
      activeDocument,
      controllersDirectories,
      controllersExtensions
    )

    if (controllerPath) {
      const path = controllerPath.uri.fsPath
      const methodDoc = DocumentationProvider.getDocForMethodInFile(path, controller.method)
      return methodDoc || DocumentationProvider.generateDocFromPath(controllerPath)
    }

    return null
  }
}

export default RouteControllerHoverProvider
