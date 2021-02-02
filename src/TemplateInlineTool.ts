import type {
  API,
  InlineTool,
  InlineToolConstructorOptions,
} from "@editorjs/editorjs";

interface TemplateInlineToolConfig {
  buttonHTML?: string;
  html: string;
}

interface TemplateInlineToolConstructorOptions
  extends InlineToolConstructorOptions {
  config?: TemplateInlineToolConfig;
}

class TemplateInlineTool implements InlineTool {
  static isSurroundEnabled: boolean = true;

  static get isInline() {
    return true;
  }

  static get title() {
    return "Template";
  }

  #api: API;
  #config!: TemplateInlineToolConfig;

  constructor({ api, config }: TemplateInlineToolConstructorOptions) {
    this.#api = api;

    // Filter undefined and empty object.
    // See also: https://github.com/codex-team/editor.js/issues/1432
    if (config && "html" in config) {
      this.#config = config;
    }
  }

  get shortcut() {
    return "CMD+I";
  }

  checkState() {
    return false;
  }

  render() {
    const button = document.createElement("button");

    button.classList.add(this.#api.styles.inlineToolButton);
    button.type = "button";

    button.innerHTML =
      this.#config.buttonHTML ??
      `
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <path d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
          <rect x="176" y="32" width="160" height="64" rx="26.13" ry="26.13" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      `;

    return button;
  }

  surround() {
    if (!TemplateInlineTool.isSurroundEnabled) {
      return;
    }

    document.execCommand("insertHTML", false, this.#config.html);

    TemplateInlineTool.isSurroundEnabled = false;

    setTimeout(() => (TemplateInlineTool.isSurroundEnabled = true));
  }
}

export { TemplateInlineTool };
export type { TemplateInlineToolConfig };
