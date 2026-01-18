document.addEventListener('DOMContentLoaded', function() {
    // ========== ПЕРЕМЕННЫЕ ==========
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
    const mobileDropdownButtons = document.querySelectorAll('.mobile-menu__link--dropdown');
    const dropdownItems = document.querySelectorAll('.header__nav-item--dropdown');
    
    // ========== ФИКСИРОВАННАЯ ШАПКА ПРИ СКРОЛЛЕ ==========
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
    
    // ========== БУРГЕР-МЕНЮ ==========
    if (burger) {
        burger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
        });
    }
    
    // ========== ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ ==========
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        mobileDropdownButtons.forEach(button => {
            const parent = button.closest('.mobile-menu__item--dropdown');
            parent.classList.remove('active');
        });
    }
    
    // ========== ВЫПАДАЮЩИЕ МЕНЮ В МОБИЛЬНОМ МЕНЮ ==========
    mobileDropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.closest('.mobile-menu__item--dropdown');
            const isActive = parent.classList.contains('active');
            
            mobileDropdownButtons.forEach(otherButton => {
                const otherParent = otherButton.closest('.mobile-menu__item--dropdown');
                if (otherParent !== parent && otherParent.classList.contains('active')) {
                    otherParent.classList.remove('active');
                }
            });
            
            if (isActive) {
                parent.classList.remove('active');
            } else {
                parent.classList.add('active');
            }
        });
    });
    
    // ========== ВЫПАДАЮЩИЕ МЕНЮ НА ДЕСКТОПЕ ==========
    dropdownItems.forEach(item => {
        const link = item.querySelector('.header__nav-link');
        const dropdown = item.querySelector('.dropdown');
        
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
                dropdown.classList.add('active');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
                dropdown.classList.remove('active');
            }
        });
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
    
    // ========== ОБРАБОТКА РЕСАЙЗА ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) dropdown.classList.remove('active');
            });
        }
    });
    
    // ========== ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ ==========
    document.querySelectorAll('.mobile-menu__sublink, .mobile-menu__link:not(.mobile-menu__link--dropdown)').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // ========== ОБРАБОТКА КНОПОК КОРЗИНЫ ==========
    function setupCartButtons(selector) {
        const buttons = document.querySelectorAll(selector);
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('btn--soldout') || this.disabled) {
                    return;
                }
                
                // Получаем информацию о товаре
                const productId = this.getAttribute('data-id');
                const card = this.closest('.product-card');
                const productTitle = card.querySelector('.product-card__title').textContent;
                const productPrice = card.querySelector('.product-card__price').textContent;
                
                // Обновляем счетчик корзины
                updateCartCount(1);
                
                // Анимация кнопки
                const originalText = this.textContent;
                this.textContent = 'Добавлено';
                this.style.backgroundColor = '#4CAF50';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.disabled = false;
                }, 1500);
                
                console.log(`Товар добавлен в корзину:`, {
                    id: productId,
                    title: productTitle,
                    price: productPrice
                });
            });
        });
    }
    
    // Функция обновления счетчика корзины (теперь глобальная)
    window.updateCartCount = function(amount = 1) {
        const cartCountElement = document.querySelector('.header__cart-count');
        if (cartCountElement) {
            let currentCount = parseInt(cartCountElement.textContent) || 0;
            currentCount += amount;
            cartCountElement.textContent = currentCount;
            
            // Обновляем счетчик в мобильном меню
            const mobileCartCount = document.querySelector('.mobile-menu__cart-count');
            if (mobileCartCount) {
                mobileCartCount.textContent = currentCount;
            }
        }
    };
    
    // Инициализация для всех карточек товаров на всех страницах
    setupCartButtons('.product-card__btn');
    
    // Дополнительные селекторы для обратной совместимости
    setupCartButtons('.hits__btn');
    setupCartButtons('.novelties__btn');
});