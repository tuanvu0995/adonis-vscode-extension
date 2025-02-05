import { CompletionItem, CompletionItemKind, SnippetString } from 'vscode'
import Config from '../../utilities/config'
import GlobalEdgeSnippets from '../../../snippets/edge/globals.json'
import { SuggestionProvider } from '../../services/suggestion_provider'
import { SuggestionType } from '../../contracts'
import ProjectManager from '../../services/adonis_project/manager'
import type { CompletionItemProvider, Position, TextDocument } from 'vscode'

class EdgeCompletionProvider implements CompletionItemProvider {
  public async provideCompletionItems(doc: TextDocument, pos: Position) {
    /**
     * Create a completion item for each globals edge snippets
     */
    const snippetCompletionItems = Object.entries(GlobalEdgeSnippets).map(([label, snippet]) => {
      const item = new CompletionItem(label, CompletionItemKind.Snippet)
      item.detail = snippet.description
      item.insertText = new SnippetString(snippet.body)
      return item
    })

    /**
     * Check if we are in curly brace and return snippets if so
     */
    const isInMustache = doc.getWordRangeAtPosition(pos, /{{([^}].|\s)+}}/)
    if (isInMustache) {
      return snippetCompletionItems
    }

    /**
     * Check if we are within a view completion context and return view suggestions if so
     */
    const regex = new RegExp(Config.autocomplete.viewsCompletionRegex)
    const range = doc.getWordRangeAtPosition(pos, regex)
    if (!range) return

    const text = doc.getText(range)
    const suggestions = await this.getViewSuggestions(text, doc)
    return SuggestionProvider.toCompletionItems(suggestions, CompletionItemKind.Value)
  }

  /**
   * Get completion suggestions of view templates, based on the provided text.
   *
   * @param text Text to get suggestions for
   * @param doc Document text belongs to
   */
  private getViewSuggestions(text: string, doc: TextDocument) {
    const config = Config.autocomplete

    const project = ProjectManager.getProjectFromFile(doc.uri.path)
    if (!project) return []

    return SuggestionProvider.getSuggestions(
      text,
      project,
      config.viewsDirectories,
      config.viewsExtensions,
      SuggestionType.View
    )
  }
}

export default EdgeCompletionProvider
