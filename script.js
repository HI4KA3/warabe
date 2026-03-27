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


}); // DOMContentLoaded ここまで
