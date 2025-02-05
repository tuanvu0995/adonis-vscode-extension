import Config from '../../utilities/config'
import { getMaxLinesCount } from '../../utilities/functions'
import { DocumentLinker } from '../../services/document_linker'
import type { DocumentLink, DocumentLinkProvider, TextDocument } from 'vscode'

export default class EdgeLinkProvider implements DocumentLinkProvider {
  public provideDocumentLinks(doc: TextDocument) {
    const config = Config.autocomplete
    const docLinks: DocumentLink[] = []

    if (!config.quickJump) return docLinks

    let currentLine = 0
    const regex = new RegExp(config.viewsRegex, 'g')
    const maxLinesCount = getMaxLinesCount(doc)

    while (currentLine < maxLinesCount) {
      const links = DocumentLinker.createViewDocumentLinks(
        regex,
        doc,
        currentLine,
        config.viewsDirectories,
        config.viewsExtensions
      )

      docLinks.push(...links)
      currentLine++
    }

    return docLinks
  }
}
