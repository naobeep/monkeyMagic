/**
 * Monkey Magic Animation System
 * アニメーション付きサムネイル生成システム
 */

class MonkeyMagicAnimator {
  constructor(config = {}) {
    this.config = {
      selector: '.monkey-magic',
      thumbnailDelay: 200,
      thumbnailCount: 6,
      animationDuration: 1400,
      thumbnailClass: 'monkey-magic-thumbnail',
      // IntersectionObserver設定
      observerEnabled: true,
      threshold: 1, // 要素の100%が表示されたら発火
      rootMargin: '0px 0px 20% 0px', // 下から20%の位置まで来たら発火
      triggerOnce: true, // 一度だけ実行するか
      ...config,
    };

    this.observer = null;
    this.processedTargets = new Set(); // 処理済み要素を追跡
  }

  /**
   * アニメーションを初期化
   */
  init() {
    const targets = document.querySelectorAll(this.config.selector);

    if (targets.length === 0) {
      console.warn(`要素が見つかりません: ${this.config.selector}`);
      return;
    }

    if (this.config.observerEnabled) {
      this.initIntersectionObserver(targets);
    } else {
      // IntersectionObserverを使わない場合は即座に実行
      targets.forEach(target => this.processTarget(target));
    }
  }

  /**
   * IntersectionObserverを初期化
   * @param {NodeList} targets - 監視対象の要素リスト
   */
  initIntersectionObserver(targets) {
    // IntersectionObserverがサポートされていない場合の対応
    if (!('IntersectionObserver' in window)) {
      console.warn(
        'IntersectionObserverがサポートされていません。即座に実行します。'
      );
      targets.forEach(target => this.processTarget(target));
      return;
    }

    const options = {
      root: null, // ビューポートを基準
      rootMargin: this.config.rootMargin,
      threshold: this.config.threshold,
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // 既に処理済みかチェック
          if (this.config.triggerOnce && this.processedTargets.has(target)) {
            return;
          }

          this.processTarget(target);
          this.processedTargets.add(target);

          // 一度だけ実行する場合は監視を停止
          if (this.config.triggerOnce) {
            this.observer.unobserve(target);
          }
        }
      });
    }, options);

    // 各ターゲット要素を監視開始
    targets.forEach(target => {
      this.observer.observe(target);
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

  /**
   * 個別のターゲット要素を処理
   * @param {Element} target - 処理対象の要素
   */
  processTarget(target) {
    const originalImage = this.getOriginalImage(target);

    if (!originalImage) {
      console.warn('画像要素が見つかりません:', target);
      return;
    }

    const imgSrc = originalImage.getAttribute('src');

    if (!imgSrc) {
      console.warn('画像のsrc属性が見つかりません:', originalImage);
      return;
    }

    this.animateTarget(target, originalImage, imgSrc);
  }

  /**
   * オリジナル画像要素を取得
   * @param {Element} target - ターゲット要素
   * @returns {Element|null} 画像要素
   */
  getOriginalImage(target) {
    return target.children[0] || null;
  }

  /**
   * ターゲット要素のアニメーション実行
   * @param {Element} target - ターゲット要素
   * @param {Element} originalImage - オリジナル画像
   * @param {string} imgSrc - 画像のソースURL
   */
  animateTarget(target, originalImage, imgSrc) {
    // オリジナル画像を非表示
    this.hideOriginalImage(originalImage);

    // サムネイルコンテナを作成
    const thumbnail = this.createThumbnailContainer();
    target.appendChild(thumbnail);

    // サムネイル画像を順次表示
    this.createThumbnailSequence(thumbnail, imgSrc);

    // アニメーション完了後の処理
    this.scheduleAnimationComplete(originalImage, thumbnail);
  }

  /**
   * オリジナル画像を非表示
   * @param {Element} originalImage - オリジナル画像要素
   */
  hideOriginalImage(originalImage) {
    originalImage.style.opacity = '0';
  }

  /**
   * サムネイルコンテナを作成
   * @returns {Element} サムネイルコンテナ
   */
  createThumbnailContainer() {
    const thumbnail = document.createElement('div');
    thumbnail.className = this.config.thumbnailClass;
    return thumbnail;
  }

  /**
   * サムネイル画像を順次作成
   * @param {Element} container - サムネイルコンテナ
   * @param {string} imgSrc - 画像のソースURL
   */
  createThumbnailSequence(container, imgSrc) {
    for (let i = 1; i <= this.config.thumbnailCount; i++) {
      setTimeout(() => {
        const figure = this.createThumbnailFigure(imgSrc, i);
        container.appendChild(figure);
      }, i * this.config.thumbnailDelay);
    }
  }

  /**
   * サムネイル用のfigure要素を作成
   * @param {string} imgSrc - 画像のソースURL
   * @param {number} index - サムネイルのインデックス
   * @returns {Element} figure要素
   */
  createThumbnailFigure(imgSrc, index) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    img.src = imgSrc;
    img.alt = `monkey-magic-thumbnail-${index}`;
    img.loading = 'lazy'; // パフォーマンス向上

    figure.appendChild(img);
    return figure;
  }

  /**
   * アニメーション完了処理をスケジュール
   * @param {Element} originalImage - オリジナル画像要素
   * @param {Element} thumbnail - サムネイル要素
   */
  scheduleAnimationComplete(originalImage, thumbnail) {
    setTimeout(() => {
      this.completeAnimation(originalImage, thumbnail);
    }, this.config.animationDuration);
  }

  /**
   * アニメーション完了処理
   * @param {Element} originalImage - オリジナル画像要素
   * @param {Element} thumbnail - サムネイル要素
   */
  completeAnimation(originalImage, thumbnail) {
    originalImage.style.opacity = '1';
    thumbnail.style.opacity = '0';

    // メモリリークを防ぐため、しばらく後にサムネイルを削除
    setTimeout(() => {
      if (thumbnail.parentNode) {
        thumbnail.parentNode.removeChild(thumbnail);
      }
    }, 1000);
  }
}

// 使用例とセットアップ
document.addEventListener('DOMContentLoaded', () => {
  // デフォルト設定（IntersectionObserver有効）
  const animator = new MonkeyMagicAnimator();
  animator.init();

  // カスタム設定の例
  // const customAnimator = new MonkeyMagicAnimator({
  //   selector: '.custom-magic',
  //   thumbnailCount: 8,
  //   thumbnailDelay: 150,
  //   animationDuration: 2000,
  //   threshold: 0.3, // 30%表示されたら発火
  //   rootMargin: '0px 0px -100px 0px', // 下から100px手前で発火
  //   triggerOnce: false // 何度でも実行
  // });
  // customAnimator.init();

  // IntersectionObserverを無効にする例
  // const immediateAnimator = new MonkeyMagicAnimator({
  //   observerEnabled: false
  // });
  // immediateAnimator.init();
});

// ページ離脱時のクリーンアップ
window.addEventListener('beforeunload', () => {
  // グローバルなアニメーターインスタンスがあれば破棄
  if (window.monkeyMagicAnimator) {
    window.monkeyMagicAnimator.destroy();
  }
});

// エクスポート（モジュール環境用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MonkeyMagicAnimator;
}
export { MonkeyMagicAnimator };
