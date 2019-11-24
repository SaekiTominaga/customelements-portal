/**
 * <portal>
 *
 * @example
 * <x-portal
 *   src="【任意】表示するコンテンツのURL https://wicg.github.io/portals/#element-attrdef-portal-src"
 *   title="【任意】表示するコンテンツのタイトル"
 *   referrerpolicy="【任意】リファラーポリシー https://html.spec.whatwg.org/multipage/urls-and-fetching.html#referrer-policy-attribute">
 * </x-portal>
 *
 * @version 1.0.1 2019-09-05 <portal> 上での右クリックやTabキーによるフォーカスで遷移してしまうバグを修正
 */
export default class Portal extends HTMLElement {
	static get observedAttributes() {
		return ['src', 'referrerpolicy', 'title'];
	}

	constructor() {
		super();

		this.attachShadow({mode: 'open'}).innerHTML = `
			<style>
				:host {
					--height: 40em;
					--scale: .5;
					--transition-duration: .5s;

					display: block;
					height: calc(var(--height) * var(--scale));
					position: relative;
				}

				.portal-wrap {
					border: 1px solid;
					box-sizing: border-box;
					height: var(--height);
					transform: scale(var(--scale));
					transform-origin: 0 0;
					transition: height var(--transition-duration), width var(--transition-duration), top var(--transition-duration), left var(--transition-duration), transform var(--transition-duration);
				}
				.portal-wrap.-fullscreen {
					border: none;
					position: fixed;
					height: 100vh;
					width: 100vw !important;
					top: 0 !important;
					left: 0 !important;
					transform: none;
				}

				.portal {
					display: block;
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
			</style>
			<div id="portal-wrap" class="portal-wrap" tabindex="0" role="link" hidden="">
				<portal id="portal" class="portal"></portal>
			</div>
		`;

		this._portalWrapElement = this.shadowRoot.getElementById('portal-wrap');
		this._portalElement = this.shadowRoot.getElementById('portal');

		this._portalElement.addEventListener('click', () => {
			/* 表示位置を変えずに potision: fixed にするため、 top, left, width のスタイルを設定する */
			const rect = this.getBoundingClientRect();

			const portalWrapElement = this._portalWrapElement;
			portalWrapElement.style.top = `${Number.parseInt(rect.top)}px`;
			portalWrapElement.style.left = `${Number.parseInt(rect.left)}px`;
			portalWrapElement.style.width = `${Number.parseInt(rect.width)}px`;

			/* potision: fixed を使ったフルスクリーン表示にする */
			setTimeout(() => {
				portalWrapElement.classList.add('-fullscreen');
			}, 0);
		});
		this._portalWrapElement.addEventListener('transitionend', () => {
			this._portalElement.activate();
		});

		this._portalWrapElement.addEventListener('keydown', (ev) => {
			switch (ev.key) {
				case 'Enter':
					this._portalElement.dispatchEvent(new MouseEvent('click'));
					break;
			}
		});
	}

	connectedCallback() {
		const portalElement = this._portalElement;
		const portalWrapElement = this._portalWrapElement;
		if (this.src !== null) {
			portalElement.src = this.src;
			portalWrapElement.hidden = false;
		}
		if (this.referrerpolicy !== null) {
			portalElement.referrerPolicy = this.referrerpolicy;
		}
		if (this.title !== null) {
			portalWrapElement.setAttribute('aria-label', this.title);
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const portalElement = this._portalElement;
		const portalWrapElement = this._portalWrapElement;
		switch (name) {
			case 'src':
				if (newValue !== null) {
					portalElement.src = newValue;
					portalWrapElement.hidden = false;
				} else {
					portalElement.removeAttribute('src');
					portalWrapElement.hidden = true;
				}
				break;
			case 'referrerpolicy':
				if (newValue !== null) {
					portalElement.referrerPolicy = newValue;
				} else {
					portalElement.removeAttribute('referrerpolicy');
				}
				break;
			case 'title':
				if (newValue !== null) {
					portalWrapElement.setAttribute('aria-label', this.title);
				} else {
					portalWrapElement.removeAttribute('aria-label');
				}
				break;
		}
	}

	get src() {
		return this.getAttribute('src');
	}
	set src(value) {
		this.setAttribute('src', value);
	}

	get referrerpolicy() {
		return this.getAttribute('referrerpolicy');
	}
	set referrerpolicy(value) {
		this.setAttribute('referrerpolicy', value);
	}

	get title() {
		return this.getAttribute('title');
	}
	set title(value) {
		this.setAttribute('title', value);
	}
}
