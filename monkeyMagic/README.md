# monkeyMagic

西遊記OP風のサムネイルアニメーションを実現するJavaScriptライブラリです。
指定した画像要素を6分割のサムネイルで順次表示し、最後に元画像を表示します。

## 特徴

- IntersectionObserverによる遅延アニメーション対応
- サムネイル数・遅延・アニメーション時間などカスタマイズ可能
- モジュラー設計・ESモジュール対応

## 使い方

1. 画像を配置し、`.monkey-magic`クラスを付与します。

```html
<figure class="monkey-magic">
  <img src="./img/001.jpg" alt="" />
</figure>
```

2. スクリプトとCSSを読み込みます。

```html
<link rel="stylesheet" href="./styles/style.css" />
<script type="module" src="./scripts/main.js"></script>
```

3. ページ読み込み時に自動でアニメーションが適用されます。

### カスタマイズ例

```js
import { MonkeyMagicAnimator } from './scripts/monkeyMagic.js';

const animator = new MonkeyMagicAnimator({
  selector: '.custom-magic',
  thumbnailCount: 8,
  thumbnailDelay: 150,
  animationDuration: 2000,
  threshold: 0.5,
  rootMargin: '0px 0px -30% 0px',
  triggerOnce: false
});
animator.init();
```
