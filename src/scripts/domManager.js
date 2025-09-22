// ===== DOM操作モジュール =====
export class DOMManager {
  /**
   * 要素の存在確認と取得
   * @param {string} selector - セレクター
   * @returns {NodeList} 要素リスト
   */
  static getTargets(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * オリジナル画像要素を取得
   * @param {Element} target - ターゲット要素
   * @returns {Element|null} 画像要素
   */
  static getOriginalImage(target) {
    return target.children[0] || null;
  }

  /**
   * 画像のソースURLを取得
   * @param {Element} imageElement - 画像要素
   * @returns {string|null} 画像のソースURL
   */
  static getImageSource(imageElement) {
    return imageElement.getAttribute('src');
  }

  /**
   * サムネイルコンテナを作成
   * @param {string} className - クラス名
   * @param {Element} originalElement - 元の要素（サイズの参照用）
   * @returns {Element} サムネイルコンテナ
   */
  static createThumbnailContainer(className, originalElement = null) {
    const thumbnail = document.createElement('div');
    thumbnail.className = className;

    // 元の要素と同じサイズに設定
    if (originalElement) {
      DOMManager.copyElementSize(thumbnail, originalElement);
    }

    return thumbnail;
  }

  /**
   * 元の要素のサイズとポジションをコピー
   * @param {Element} targetElement - コピー先要素
   * @param {Element} sourceElement - コピー元要素
   */
  static copyElementSize(targetElement, sourceElement) {
    const computedStyle = window.getComputedStyle(sourceElement);
    const rect = sourceElement.getBoundingClientRect();

    // サイズをコピー
    const styles = {
      width: computedStyle.width,
      height: computedStyle.height,
      minWidth: computedStyle.minWidth,
      minHeight: computedStyle.minHeight,
      maxWidth: computedStyle.maxWidth,
      maxHeight: computedStyle.maxHeight,
      // ボックスモデルもコピー
      padding: computedStyle.padding,
      margin: computedStyle.margin,
      border: computedStyle.border,
      boxSizing: computedStyle.boxSizing,
      // 絶対配置でオーバーレイ
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '10',
    };

    DOMManager.setStyles(targetElement, styles);
  }

  /**
   * サムネイル用のfigure要素を作成
   * @param {string} imgSrc - 画像のソースURL
   * @param {number} index - サムネイルのインデックス
   * @returns {Element} figure要素
   */
  static createThumbnailFigure(imgSrc, index) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    img.src = imgSrc;
    img.alt = `monkey-magic-thumbnail-${index}`;
    img.loading = 'lazy';

    figure.appendChild(img);
    return figure;
  }

  /**
   * 要素のスタイルを設定
   * @param {Element} element - 対象要素
   * @param {Object} styles - スタイルオブジェクト
   */
  static setStyles(element, styles) {
    Object.assign(element.style, styles);
  }
}
