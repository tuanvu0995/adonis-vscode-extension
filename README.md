<div align="center">
  <img width="650px" src="https://i.imgur.com/bUsqL2V.png" />
  <h2>💻 Official AdonisJS extension for VSCode</h2>
</div>

## Features
* Use all Adonis Assembler commands ( make:\* )
* Migrate and seed your database ( db:\*, migration:\* )
* View your routes within VSCode
* Open and see docs within VSCode
* .adonisrc.json file validation with JSON Schema
* Edge Support, syntax highlighting + formatting
* Edge and AdonisJS Snippets
* Go To Controller 
* Go To View

## Ace commands
Launch ace commands directly from VScode. 
Files created by adonis/assembler are automatically opened after their creation.

![](https://i.imgur.com/BEb6Xpc.gif)

## List Routes
List all routes in your project from VSCode and filter them.

![](https://i.imgur.com/WEr7s5K.png)

## Documentations
Consult and search the Adonis and Japa documentation directly from VSCode.

![](https://i.imgur.com/kMjBvdh.png)

## JSON Schema for .adonisrc
![](https://i.imgur.com/6K5wnvE.gif)

## Route controller completion + Go To
Autocompletion for the name and handler of the controllers, alt+click to open the file, and the docblock documentation of the method that is displayed in hover.

![](https://i.imgur.com/ZvnOtN3.gif)

## Edge support
Syntax highlighting, auto-completion of the tags that includes partials/components/layouts, alt+click to open an included file, many snippets...
**No automatic formatting for the moment**

![](https://i.imgur.com/eDYb9fK.gif)

## Known Issues
Below is the list of unsupported features (for the moment), feel free to make a PR if you want them to be delivered faster: 
- Edge Links Provider for [Component as tags](https://docs.adonisjs.com/guides/views/components#components-as-tags)
- Edge Links Provider for `@includeIf` tag
- Multiple workspaces support

## Contributing
* See [contributing guide](./.github/CONTRIBUTING.md)
* Clone the project and open it in VS Code
* Run `npm install`
* Press `F5` to open a new VSCode window with your extension loaded.
* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.
