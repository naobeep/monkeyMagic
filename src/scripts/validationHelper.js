// ===== バリデーションモジュール =====
export class ValidationHelper {
  /**
   * ターゲット要素の妥当性を検証
   * @param {NodeList} targets - ターゲット要素リスト
   * @param {string} selector - セレクター
   * @returns {boolean} 妥当性
   */
  static validateTargets(targets, selector) {
    if (targets.length === 0) {
      console.warn(`要素が見つかりません: ${selector}`);
      return false;
    }
    return true;
  }

  /**
   * 画像要素の妥当性を検証
   * @param {Element} target - ターゲット要素
   * @param {Element} imageElement - 画像要素
   * @returns {boolean} 妥当性
   */
  static validateImage(target, imageElement) {
    if (!imageElement) {
      console.warn('画像要素が見つかりません:', target);
      return false;
    }
    return true;
  }

  /**
   * 画像ソースの妥当性を検証
   * @param {Element} imageElement - 画像要素
   * @param {string} imgSrc - 画像ソース
   * @returns {boolean} 妥当性
   */
  static validateImageSource(imageElement, imgSrc) {
    if (!imgSrc) {
      console.warn('画像のsrc属性が見つかりません:', imageElement);
      return false;
    }
    return true;
  }

  /**
   * IntersectionObserverのサポート状況を確認
   * @returns {boolean} サポート状況
   */
  static validateIntersectionObserverSupport() {
    if (!('IntersectionObserver' in window)) {
      console.warn(
        'IntersectionObserverがサポートされていません。即座に実行します。'
      );
      return false;
    }
    return true;
  }
}
