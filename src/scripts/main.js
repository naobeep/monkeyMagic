// const targets = document.querySelectorAll('.monkey-magic');

// targets.forEach(target => {
//   console.log(target.children[0]);
//   target.children[0].style.opacity = 0;
//   const thumbnail = document.createElement('div');
//   thumbnail.className = 'monkey-magic-thumbnail';

//   const imgSrc = target.children[0].getAttribute('src');

//   target.append(thumbnail);

//   for (let i = 1; i <= 6; i++) {
//     setTimeout(() => {
//       const figure = document.createElement('figure');
//       const img = document.createElement('img');
//       img.src = imgSrc;
//       img.alt = `monkey-magic-thumbnail`;
//       figure.append(img);
//       thumbnail.append(figure);
//     }, i * 200);
//   }

//   setTimeout(() => {
//     target.children[0].style.opacity = 1;
//     thumbnail.style.opacity = 0;
//   }, 1400);
// });

import { MonkeyMagicAnimator } from "./monkeyMagic.js";

// ===== 初期化とセットアップ =====
document.addEventListener('DOMContentLoaded', () => {
  // デフォルト設定（IntersectionObserver有効）
  const animator = new MonkeyMagicAnimator();
  animator.init();

  // グローバル参照を保存（クリーンアップ用）
  window.monkeyMagicAnimator = animator;

  // カスタム設定の例
  // const customAnimator = new MonkeyMagicAnimator({
  //   selector: '.custom-magic',
  //   thumbnailCount: 8,
  //   thumbnailDelay: 150,
  //   animationDuration: 2000,
  //   threshold: 0.5, // 50%表示されたら発火
  //   rootMargin: '0px 0px -30% 0px', // 下から30%の位置で発火
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
  if (window.monkeyMagicAnimator) {
    window.monkeyMagicAnimator.destroy();
  }

});
