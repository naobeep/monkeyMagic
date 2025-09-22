/**
 * Monkey Magic Animation System - Modular Version
 * 責任を分離したモジュラー設計
 */

import { AnimationConfig } from './animationConfig.js';
import { AnimationExecutor } from './animationExecutor.js';
import { DOMManager } from './domManager.js';
import { ValidationHelper } from './validationHelper.js';
import { IntersectionObserverManager } from './intersectionObserverManager.js';

// ===== メインクラス（ファサードパターン）=====
export class MonkeyMagicAnimator {
  constructor(customConfig = {}) {
    this.config = new AnimationConfig(customConfig);
    this.animationExecutor = new AnimationExecutor(this.config);
    this.observerManager = null;
  }

  /**
   * アニメーションシステムを初期化
   */
  init() {
    const targets = DOMManager.getTargets(this.config.get('selector'));

    if (
      !ValidationHelper.validateTargets(targets, this.config.get('selector'))
    ) {
      return;
    }

    if (this.config.get('observerEnabled')) {
      this.initWithObserver(targets);
    } else {
      this.initImmediate(targets);
    }
  }

  /**
   * IntersectionObserverを使用して初期化
   * @param {NodeList} targets - ターゲット要素リスト
   */
  initWithObserver(targets) {
    this.observerManager = new IntersectionObserverManager(
      this.config,
      target => this.processTarget(target)
    );
    this.observerManager.init(targets);
  }

  /**
   * 即座に実行で初期化
   * @param {NodeList} targets - ターゲット要素リスト
   */
  initImmediate(targets) {
    targets.forEach(target => this.processTarget(target));
  }

  /**
   * 個別のターゲット要素を処理
   * @param {Element} target - 処理対象の要素
   */
  processTarget(target) {
    const originalImage = DOMManager.getOriginalImage(target);

    if (!ValidationHelper.validateImage(target, originalImage)) {
      return;
    }

    const imgSrc = DOMManager.getImageSource(originalImage);

    if (!ValidationHelper.validateImageSource(originalImage, imgSrc)) {
      return;
    }

    this.animationExecutor.executeAnimation(target, originalImage, imgSrc);
  }

  /**
   * アニメーションシステムを破棄
   */
  destroy() {
    if (this.observerManager) {
      this.observerManager.destroy();
      this.observerManager = null;
    }
  }
}

// エクスポート（モジュール環境用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MonkeyMagicAnimator,
    AnimationConfig,
    DOMManager,
    ValidationHelper,
    AnimationExecutor,
    IntersectionObserverManager,
  };
}
