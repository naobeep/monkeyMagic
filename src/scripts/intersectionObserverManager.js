import { ValidationHelper } from "./validationHelper.js";

// ===== オブザーバー管理モジュール =====
export class IntersectionObserverManager {
  constructor(config, onIntersect) {
    this.config = config;
    this.onIntersect = onIntersect;
    this.observer = null;
    this.processedTargets = new Set();
  }

  /**
   * IntersectionObserverを初期化
   * @param {NodeList} targets - 監視対象の要素リスト
   */
  init(targets) {
    if (!ValidationHelper.validateIntersectionObserverSupport()) {
      // フォールバック: 即座に実行
      targets.forEach(target => this.onIntersect(target));
      return;
    }

    const options = this.getObserverOptions();
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      options
    );

    // 各ターゲット要素を監視開始
    targets.forEach(target => {
      this.observer.observe(target);
    });
  }

  /**
   * IntersectionObserverのオプションを取得
   * @returns {Object} オプションオブジェクト
   */
  getObserverOptions() {
    return {
      root: null,
      rootMargin: this.config.get('rootMargin'),
      threshold: this.config.get('threshold'),
    };
  }

  /**
   * 交差イベントを処理
   * @param {Array} entries - 交差エントリー
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // 既に処理済みかチェック
        if (
          this.config.get('triggerOnce') &&
          this.processedTargets.has(target)
        ) {
          return;
        }

        this.onIntersect(target);
        this.processedTargets.add(target);

        // 一度だけ実行する場合は監視を停止
        if (this.config.get('triggerOnce')) {
          this.observer.unobserve(target);
        }
      }
    });
  }

  /**
   * オブザーバーを破棄
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.processedTargets.clear();
  }
}
