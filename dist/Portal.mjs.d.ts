/**
 * <portal>
 *
 * @example
 * <x-portal
 *   src="[Optional] URL of a page to be displayed. https://wicg.github.io/portals/#element-attrdef-portal-src"
 *   referrerpolicy="[Optional] Referrer Policy. https://html.spec.whatwg.org/multipage/urls-and-fetching.html#referrer-policy-attribute">
 * </x-portal>
 *
 * @version 2.0.0
 */
export default class Portal extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void;
    get src(): string | null;
    set src(value: string | null);
    get referrerpolicy(): string | null;
    set referrerpolicy(value: string | null);
    /**
     * <portal> 要素をクリックした時の処理
     */
    private _portalClickEvent;
    /**
     * <portal> の包括要素のアニメーションが終わった時の処理
     *
     * @param {TransitionEvent} ev - Event
     */
    private _portalTrainsitionEndEvent;
    /**
     * <portal> の包括要素をフルスクリーン表示にする
     */
    private _fullScreen;
    /**
     * <portal> 要素をアクティベートする
     */
    private _activate;
}
