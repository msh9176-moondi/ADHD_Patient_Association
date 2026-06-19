/**
 * 한국ADHD환우회 홈페이지 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // 모바일 메뉴 토글
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');

      // 아이콘 애니메이션
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (nav.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });
  }

  // 스크롤 시 헤더 그림자 효과
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
      } else {
        header.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
      }
    });
  }

  // 현재 페이지 네비게이션 활성화
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 외부 링크에 rel="noopener" 추가
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
      const currentRel = link.getAttribute('rel') || '';
      link.setAttribute('rel', (currentRel + ' noopener').trim());
    }
  });

  // 접근성: 키보드 포커스 스타일
  document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.body.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });

  // 키보드 네비게이션용 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-navigation *:focus {
      outline: 2px solid var(--primary) !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(style);
});
