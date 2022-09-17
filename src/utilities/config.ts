import { workspace } from 'vscode'
import type { Config, ConfigMisc } from '../contracts/config'

/**
 * A wrapper around vscode configuration for this extension
 */
class ExtConfig {
  /**
   * Extension name/identifier
   */
  public static readonly EXTENSION_NAME = 'adonis-vscode-extension'

  /**
   * Prefix of the extension configuration keys
   */
  public static readonly CONFIG_NAME = 'adonisjs'

  /**
   * Context key set when extension is activated and loaded.
   */
  public static readonly CONTEXT_ADONIS_PROJECT_LOADED = 'adonisProjectLoaded'

  /**
   * Build a command identifier
   */
  public static buildCommandId(command: string) {
    return `${this.EXTENSION_NAME}.${command}`
  }

  /**
   * In-built vscode HTML configuration.
   */
  public static get html(): Config {
    return workspace.getConfiguration('html')
  }

  /**
   * Configuration for autocompletion related activities.
   */
  public static get autocomplete(): Config {
    return workspace.getConfiguration(this.CONFIG_NAME).autocomplete
  }

  /**
   * Configuration for misc options
   */
  public static get misc(): ConfigMisc {
    return workspace.getConfiguration(this.CONFIG_NAME).misc
  }
}

export default ExtConfig
