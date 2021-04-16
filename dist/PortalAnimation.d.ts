/**
 * Add animated motion to the `<portal>` element by Custom Elements
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
     *
     * @param {Event} ev - Event
     */
    private portalClickEvent;
    /**
     * <portal> の包括要素のアニメーションが終わった時の処理
     *
     * @param {TransitionEvent} ev - Event
     */
    private portalTrainsitionEndEvent;
    /**
     * <portal> の包括要素をフルスクリーン表示にする
     */
    private fullScreen;
    /**
     * <portal> 要素をアクティベートする
     */
    private activate;
}
//# sourceMappingURL=PortalAnimation.d.ts.map