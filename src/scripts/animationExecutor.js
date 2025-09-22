import { DOMManager } from "./domManager.js";

// ===== アニメーション実行モジュール =====
export class AnimationExecutor {
  constructor(config) {
    this.config = config;
  }

  /**
   * ターゲット要素のアニメーション実行
   * @param {Element} target - ターゲット要素
   * @param {Element} originalImage - オリジナル画像
   * @param {string} imgSrc - 画像のソースURL
   */
  executeAnimation(target, originalImage, imgSrc) {
    // 親要素を相対配置に設定（サムネイルの絶対配置の基準点として）
    this.setupTargetPosition(target);

    // オリジナル画像を非表示
    this.hideOriginalImage(originalImage);

    // サムネイルコンテナを作成（元の画像と同じサイズ）
    const thumbnail = DOMManager.createThumbnailContainer(
      this.config.get('thumbnailClass'),
      originalImage
    );
    target.appendChild(thumbnail);

    // サムネイル画像を順次表示
    this.createThumbnailSequence(thumbnail, imgSrc);

    // アニメーション完了後の処理
    this.scheduleAnimationComplete(originalImage, thumbnail);
  }

  /**
   * ターゲット要素のポジション設定
   * @param {Element} target - ターゲット要素
   */
  setupTargetPosition(target) {
    const computedStyle = window.getComputedStyle(target);

    // すでにpositionが設定されていない場合のみrelativeを設定
    if (computedStyle.position === 'static') {
      DOMManager.setStyles(target, { position: 'relative' });
    }
  }

  /**
   * オリジナル画像を非表示
   * @param {Element} originalImage - オリジナル画像要素
   */
  hideOriginalImage(originalImage) {
    DOMManager.setStyles(originalImage, { opacity: '0' });
  }

  /**
   * サムネイル画像を順次作成
   * @param {Element} container - サムネイルコンテナ
   * @param {string} imgSrc - 画像のソースURL
   */
  createThumbnailSequence(container, imgSrc) {
    const count = this.config.get('thumbnailCount');
    const delay = this.config.get('thumbnailDelay');

    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        const figure = DOMManager.createThumbnailFigure(imgSrc, i);
        container.appendChild(figure);
      }, i * delay);
    }
  }

  /**
   * アニメーション完了処理をスケジュール
   * @param {Element} originalImage - オリジナル画像要素
   * @param {Element} thumbnail - サムネイル要素
   */
  scheduleAnimationComplete(originalImage, thumbnail) {
    const duration = this.config.get('animationDuration');

    setTimeout(() => {
      this.completeAnimation(originalImage, thumbnail);
    }, duration);
  }

  /**
   * アニメーション完了処理
   * @param {Element} originalImage - オリジナル画像要素
   * @param {Element} thumbnail - サムネイル要素
   */
  completeAnimation(originalImage, thumbnail) {
    DOMManager.setStyles(originalImage, { opacity: '1' });
    DOMManager.setStyles(thumbnail, { opacity: '0' });

    // メモリリークを防ぐため、しばらく後にサムネイルを削除
    setTimeout(() => {
      if (thumbnail.parentNode) {
        thumbnail.parentNode.removeChild(thumbnail);
      }
    }, 1000);
  }
}
