// Aguarda o DOM ser carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initContactForm();
    initPortfolioModal();
    initAnimations();
    initThemeToggle();
});

// Navegação mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle do menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Efeitos de scroll
function initScrollEffects() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

     // Adiciona funcionalidade à seta de scroll
     const scrollIndicator = document.querySelector('.scroll-indicator');
     if (scrollIndicator) {
         scrollIndicator.addEventListener('click', function() {
             const sobreSection = document.querySelector('#sobre');
             if (sobreSection) {
                 const headerHeight = header.offsetHeight;
                 const targetPosition = sobreSection.offsetTop - headerHeight;
                 
                 window.scrollTo({
                     top: targetPosition,
                     behavior: 'smooth'
                 });
            }
        });
    }

    // Header transparente no topo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = '0 2px 20px var(--shadow-color)';
        } else {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = 'none';
        }
    });

    // Navegação ativa baseada na seção visível
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll suave para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Barras de habilidades animadas
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Observer para animar as barras quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Envia email usando EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                service: formData.get('service') || 'Não especificado',
                date: new Date().toLocaleDateString('pt-BR')
            };
            
            emailjs.send('service_ivdr3bx', 'template_ic88fxc', templateParams)
                .then(function(response) {
                    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    showNotification('Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.', 'error');
                    console.error('EmailJS Error:', error);
                });
        });
    }
}

// Modal do portfólio
function initPortfolioModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    
    if (modal && closeBtn) {
        // Fecha o modal
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Fecha o modal ao clicar fora
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Fecha o modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}

// Mostra detalhes do projeto no modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    const projectDetails = {
        fontoura: {
            title: 'Fontoura Advocacia',
            description: 'Site institucional completo para escritório de advocacia, desenvolvido com WordPress.',
            features: [
                'Design responsivo e moderno',
                'Sistema de blog/notícias integrado',
                'Formulários de contato',
                'Otimização para SEO',
                'Painel administrativo WordPress',
                'Integração com redes sociais'
            ],
            technologies: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Elementor'],
            link: 'https://fontouraadvocacia.com.br',
            image: 'images/fontoura-site.png'
        },
        felipe: {
            title: 'Felipe Vendrametto',
            description: 'Site pessoal e portfólio profissional com blog integrado.',
            features: [
                'Blog com sistema de categorias',
                'Design minimalista e elegante',
                'Formulário de contato',
                'Integração com redes sociais',
                'Otimização para performance'
            ],
            technologies: ['WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Elementor'],
            link: 'https://felipevendrametto.com.br',
            image: 'images/felipe-site.png'
        },
        angular: {
            title: 'Aplicação Angular - Gestor Agro',
            description: 'Sistema de gestão de produtos e serviços para o setor agropecuário',
            features: [
                'Gestão de produtos e serviços',
                'Gestão de pagamentos',
                'Gestão de estoque',
                'Gestão financeira',
                'Gestão de relatórios',
                'Gestão de usuários',
                'Entre outras'
            ],
            technologies: ['TypeScript', 'Angular', 'API', 'HTML', 'SCSS'],
            image: 'images/angular-project.png'
        }
    };
    
    const project = projectDetails[projectId];
    
    if (project && modal && modalContent) {
        modalContent.innerHTML = `
            <div class="project-modal">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
                <h2>${project.title}</h2>
                <p style="margin-bottom: 1.5rem; color: #64748b;">${project.description}</p>
                
                <h3 style="margin-bottom: 1rem;">Características:</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${project.features.map(feature => `<li style="margin-bottom: 0.5rem; color: #64748b;">${feature}</li>`).join('')}
                </ul>
                
                <h3 style="margin-bottom: 1rem;">Tecnologias utilizadas:</h3>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    ${project.technologies.map(tech => `<span style="background: #e0e7ff; color: #3730a3; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem;">${tech}</span>`).join('')}
                </div>
                
                ${project.link ? `
                    <a href="${project.link}" target="_blank" class="btn btn-primary" style="text-decoration: none;">
                        <i class="fas fa-external-link-alt"></i>
                        Visitar Site
                    </a>
                ` : ''}
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Anima elementos com classe 'animate-on-scroll'
    const animateElements = document.querySelectorAll('.skill-card, .portfolio-item, .service-card, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Adiciona ao DOM
    document.body.appendChild(notification);
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botão fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll para elementos internos
function smoothScrollTo(element, duration = 800) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}


// Adiciona classe ativa ao link de navegação
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Inicializa funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa EmailJS
    emailjs.init("ucplCWRbEuDHb1Ep4");
    
    setActiveNavLink();
    initLazyLoading();
    initWhatsAppFeatures();
    
    // Adiciona efeito de digitação ao título
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Inicia a animação após um delay
        setTimeout(typeWriter, 500);
    }
});

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Adiciona efeito parallax sutil ao hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Funcionalidades do WhatsApp
function initWhatsAppFeatures() {
    // Adiciona evento de clique para rastreamento (opcional)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aqui você pode adicionar analytics ou rastreamento
            console.log('WhatsApp link clicked:', this.href);
            
            // Opcional: Mostrar notificação de sucesso
            showNotification('Abrindo WhatsApp...', 'success');
        });
    });
    
    // Adiciona tooltip ao botão flutuante
    const whatsappFloat = document.querySelector('.whatsapp-float-btn');
    if (whatsappFloat) {
        whatsappFloat.setAttribute('title', 'Falar no WhatsApp');
    }
}

// Funcionalidade de Toggle do Tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Adiciona evento de clique ao botão
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Aplica o novo tema
            html.setAttribute('data-theme', newTheme);
            
            // Salva no localStorage
            localStorage.setItem('theme', newTheme);
            
            // Atualiza o ícone
            updateThemeIcon(newTheme);
            
        });
    }
}

// Atualiza o ícone do tema
function updateThemeIcon(theme) {
    const lightIcon = document.querySelector('.light-icon');
    const darkIcon = document.querySelector('.dark-icon');
    
    if (theme === 'dark') {
        if (lightIcon) lightIcon.style.opacity = '0';
        if (darkIcon) darkIcon.style.opacity = '1';
    } else {
        if (lightIcon) lightIcon.style.opacity = '1';
        if (darkIcon) darkIcon.style.opacity = '0';
    }
}

// Adiciona efeito de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-card, .portfolio-item, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
