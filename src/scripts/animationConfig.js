// ===== 設定管理モジュール =====
export class AnimationConfig {
  static getDefaultConfig() {
    return {
      selector: '.monkey-magic',
      thumbnailDelay: 200,
      thumbnailCount: 6,
      animationDuration: 1400,
      thumbnailClass: 'monkey-magic-thumbnail',
      // IntersectionObserver設定
      observerEnabled: true,
      threshold: 1.0, // 要素の100%が表示されたら発火（全体がビューポートに入る）
      rootMargin: '0px 0px -20% 0px', // 下から20%の位置で発火
      triggerOnce: true, // 一度だけ実行するか
    };
  }

  constructor(customConfig = {}) {
    this.config = {
      ...AnimationConfig.getDefaultConfig(),
      ...customConfig,
    };
  }

  get(key) {
    return this.config[key];
  }

  getAll() {
    return { ...this.config };
  }
}
