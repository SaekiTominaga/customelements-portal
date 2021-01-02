var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _portalElement, _supportCSSTypedOM, _portalClickEventListener, _portalTrainsitionEndEventListener;
/**
 * <portal>
 *
 * @version 2.1.0
 */
export default class Portal extends HTMLElement {
    constructor() {
        super();
        _portalElement.set(this, void 0);
        _supportCSSTypedOM.set(this, void 0); // CSS Typed Object Model に対応しているか（Chrome 66+, Chromium Edge） https://caniuse.com/mdn-api_element_attributestylemap
        _portalClickEventListener.set(this, void 0);
        _portalTrainsitionEndEventListener.set(this, void 0);
        __classPrivateFieldSet(this, _supportCSSTypedOM, this.attributeStyleMap !== undefined);
        const cssString = `
			:host {
				--portal-width: 640px;
				--portal-height: 360px;
				--portal-max-width: 100%;
				--portal-max-height: 100vh;
				--portal-border-style: solid;
				--portal-border-width: 1px;
				--portal-border-color: currentColor;
				--portal-scale: .5;
				--portal-animation-duration: .5s;
				--portal-outline-style: solid;
				--portal-outline-width: 1px;
				--portal-outline-color: currentColor;
				--portal-outline-offset: 0px;

				display: inline-block;
				width: min(var(--portal-width), var(--portal-max-width));
				height: min(var(--portal-height), var(--portal-max-height));
				position: relative;
			}
			@media (prefers-reduced-motion) {
				:host {
					--portal-animation-duration: 0.01s; /* '0s' にすると 'transitionend' イベントの検知ができなくなる */
				}
			}

			.portal {
				border: calc(var(--portal-border-width) / var(--portal-scale)) var(--portal-border-style) var(--portal-border-color);
				box-sizing: border-box;
				display: block;
				width: min(calc(var(--portal-width) / var(--portal-scale)), calc(var(--portal-max-width) / var(--portal-scale)));
				height: min(calc(var(--portal-height) / var(--portal-scale)), calc(var(--portal-max-height) / var(--portal-scale)));
				transform: scale(var(--portal-scale));
				transform-origin: 0 0;
				transition: width var(--portal-animation-duration), height var(--portal-animation-duration), top var(--portal-animation-duration), left var(--portal-animation-duration), transform var(--portal-animation-duration);
				cursor: pointer;
			}
			.portal:focus {
				outline: calc(var(--portal-outline-width) / var(--portal-scale)) var(--portal-outline-style) var(--portal-outline-color);
				outline-offset: calc(var(--portal-outline-offset) / var(--portal-scale));
			}

			.portal.-fullscreen {
				--portal-border-width: 0;
				position: fixed;
				width: 100vw !important;
				height: 100vh;
				top: 0 !important;
				left: 0 !important;
				transform: none;
				z-index: 2147483647;
			}
		`;
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
			<portal id="portal" class="portal"></portal>
		`;
        if (shadow.adoptedStyleSheets !== undefined) {
            const cssStyleSheet = new CSSStyleSheet();
            cssStyleSheet.replaceSync(cssString);
            shadow.adoptedStyleSheets = [cssStyleSheet];
        }
        else {
            /* adoptedStyleSheets 未対応環境 */
            shadow.innerHTML += `<style>${cssString}</style>`;
        }
        __classPrivateFieldSet(this, _portalElement, this.shadowRoot?.getElementById('portal'));
        __classPrivateFieldSet(this, _portalClickEventListener, this._portalClickEvent.bind(this));
        __classPrivateFieldSet(this, _portalTrainsitionEndEventListener, this._portalTrainsitionEndEvent.bind(this));
    }
    static get observedAttributes() {
        return ['src', 'referrerpolicy'];
    }
    connectedCallback() {
        const portalElement = __classPrivateFieldGet(this, _portalElement);
        const src = this.src;
        if (src !== null) {
            portalElement.src = src;
        }
        const referrerPolicy = this.referrerpolicy;
        if (referrerPolicy !== null) {
            portalElement.referrerPolicy = referrerPolicy;
        }
        portalElement.addEventListener('click', __classPrivateFieldGet(this, _portalClickEventListener), { passive: true });
        portalElement.addEventListener('transitionend', __classPrivateFieldGet(this, _portalTrainsitionEndEventListener), { passive: true });
    }
    disconnectedCallback() {
        const portalElement = __classPrivateFieldGet(this, _portalElement);
        portalElement.removeEventListener('click', __classPrivateFieldGet(this, _portalClickEventListener));
        portalElement.removeEventListener('transitionend', __classPrivateFieldGet(this, _portalTrainsitionEndEventListener));
    }
    attributeChangedCallback(name, _oldValue, newValue) {
        switch (name) {
            case 'src': {
                if (newValue !== null) {
                    __classPrivateFieldGet(this, _portalElement).src = newValue;
                }
                else {
                    __classPrivateFieldGet(this, _portalElement).removeAttribute('src');
                }
                break;
            }
            case 'referrerpolicy': {
                if (newValue !== null) {
                    __classPrivateFieldGet(this, _portalElement).referrerPolicy = newValue;
                }
                else {
                    __classPrivateFieldGet(this, _portalElement).removeAttribute('referrerpolicy');
                }
                break;
            }
        }
    }
    get src() {
        return this.getAttribute('src');
    }
    set src(value) {
        if (value !== null) {
            this.setAttribute('src', value);
        }
    }
    get referrerpolicy() {
        return this.getAttribute('referrerpolicy');
    }
    set referrerpolicy(value) {
        if (value !== null) {
            this.setAttribute('referrerpolicy', value);
        }
    }
    /**
     * <portal> 要素をクリックした時の処理
     */
    _portalClickEvent() {
        this._fullScreen();
    }
    /**
     * <portal> の包括要素のアニメーションが終わった時の処理
     *
     * @param {TransitionEvent} ev - Event
     */
    _portalTrainsitionEndEvent(ev) {
        switch (ev.propertyName) { // ウィンドウサイズの変更でもアニメーションが起こってしまうので、とくに height を無視したい
            case 'transform': {
                this._activate();
                break;
            }
        }
    }
    /**
     * <portal> の包括要素をフルスクリーン表示にする
     */
    _fullScreen() {
        const portalElement = __classPrivateFieldGet(this, _portalElement);
        /* 表示位置を変えずに potision: fixed にするための前準備 */
        const rect = portalElement.getBoundingClientRect();
        if (__classPrivateFieldGet(this, _supportCSSTypedOM)) {
            portalElement.attributeStyleMap.set('top', CSS.px(rect.top));
            portalElement.attributeStyleMap.set('left', CSS.px(rect.left));
            portalElement.attributeStyleMap.set('width', CSS.px(rect.width));
        }
        else {
            portalElement.style.top = `${rect.top}px`;
            portalElement.style.left = `${rect.left}px`;
            portalElement.style.width = `${rect.width}px`;
        }
        /* potision: fixed を使ったフルスクリーン表示にする */
        setTimeout(() => {
            portalElement.classList.add('-fullscreen');
        });
    }
    /**
     * <portal> 要素をアクティベートする
     */
    _activate() {
        __classPrivateFieldGet(this, _portalElement).activate();
    }
}
_portalElement = new WeakMap(), _supportCSSTypedOM = new WeakMap(), _portalClickEventListener = new WeakMap(), _portalTrainsitionEndEventListener = new WeakMap();
