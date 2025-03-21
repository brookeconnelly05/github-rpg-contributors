/**
 * Copyright 2025 brookeconnelly05
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `github-rpg-contributors`
 * 
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }
  
  static properties = {
    organization: { type: String },
    repo: { type: String },
    limit: { type: Number },
    contributors: { type: Array }
  };

  constructor() {
    super();
    this.organization = '';
    this.repo = '';
    this.limit;
    this.contributors = [];
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };

    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.fetchContributors();
  }

  async fetchContributors() {
    if (!this.organization || !this.repo) return;
    const response = await fetch(`https://api.github.com/repos/${this.organization}/${this.repo}/contributors`);
    const data = await response.json();
    this.contributors = data.slice(0, this.limit);
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-0);
        padding: var(--ddd-spacing-0);
      }
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
      font-size: var(--ddd-font-size-3xs);

       }
    .contributors {
      display: flex;
      flex-wrap: wrap;
      }
    .contributor {
      text-align: center;
      cursor: pointer;
      }
      p{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
      }
      h3{
        font-size: var(--ddd-font-size-m);

      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <!-- Code that I had to change bit but was working.  -->
<!-- <div class="wrapper">
<a href="https://github.com/${this.organization}/${this.repo}" >
          <h3>Link to Repo: ${this.organization}/${this.repo}</h3>
        </a>
      </div>
      <div class="contributors">
        
        ${this.contributors.map(contributor => html`
          <div class="contributor" @click="${() => window.open(contributor.html_url, '_blank')}">
            <rpg-character seed="${contributor.login}"></rpg-character>
            <p class="main">${contributor.login}</p> <p>${contributor.contributions} contributions</p>
          </div>
        `)}
  <slot></slot>
</div> -->
<div class="wrapper">
        <a href="https://github.com/${this.organization}/${this.repo}">
        <h3>Link to Repo: ${this.organization}/${this.repo}</h3>
        </a>
      </div>
      <div class="contributors">
        ${this.contributors.map(contributor => html`
          <a class="contributor" href="${contributor.html_url}">
            <rpg-character seed="${contributor.login}"></rpg-character>
            <p class="main">${contributor.login}</p>
            <p>${contributor.contributions} contributions</p>
          </a>
        `)}
      </div>
`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);