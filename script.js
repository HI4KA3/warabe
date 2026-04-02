// ============================================
// 居酒屋 笑べ WARABE - JavaScript
// script.js
// ============================================
//
// このファイルの機能：
//   1. ハンバーガーメニューの開閉（スマホ）
//   2. スクロール時のヘッダーに影をつける
//   3. 画像が読み込めない場合の処理
//
// ============================================

document.addEventListener('DOMContentLoaded', function () {


  // ============================================
  // 1. ハンバーガーメニューの開閉
  // ============================================
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {

    // ハンバーガーボタンをクリックしたとき
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    // メニュー外をタップしたら閉じる
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // メニュー内のリンクをクリックしたら閉じる
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ============================================
  // 2. スクロール時にヘッダーへ影をつける
  // ============================================
  var header = document.querySelector('.site-header');

  if (header) {
    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ============================================
  // 3. 画像が読み込めない場合の処理
  //    画像ファイルが存在しないとき、プレースホルダーが表示されます
  // ============================================
  document.querySelectorAll('.img-wrap img').forEach(function (img) {

    // 画像読み込み失敗のとき → img を非表示にしてプレースホルダーを見せる
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });

    // 画像読み込み成功のとき → プレースホルダーを非表示にする
    img.addEventListener('load', function () {
      var placeholder = this.parentElement.querySelector('.img-placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    });

    // すでに読み込み済みの場合（ブラウザキャッシュなど）
    if (img.complete) {
      if (img.naturalWidth > 0) {
        var placeholder = img.parentElement.querySelector('.img-placeholder');
        if (placeholder) {
          placeholder.style.display = 'none';
        }
      } else {
        img.style.display = 'none';
      }
    }
  });



  // ============================================
  // 4. ギャラリーのライトボックス（クリックで拡大）
  // ============================================

  // オーバーレイ要素を動的に生成
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', '画像を拡大表示中');
  overlay.innerHTML = '<button class="lightbox-close" aria-label="閉じる">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);

  var lightboxImg = overlay.querySelector('img');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // ギャラリーの各画像にクリックイベントを設定
  document.querySelectorAll('.gallery-item .img-wrap img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      if (this.naturalWidth > 0) {
        openLightbox(this.src, this.alt);
      }
    });
  });

  // オーバーレイ背景クリックで閉じる
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // 閉じるボタン
  closeBtn.addEventListener('click', closeLightbox);

  // Escキーで閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });


}); // DOMContentLoaded ここまで
