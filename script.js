document.addEventListener('DOMContentLoaded', function() {
    // تبديل الأقسام عند النقر على القائمة
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('.section');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع الروابط والأقسام
            menuLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // إضافة النشاط للرابط الحالي
            this.classList.add('active');
            
            // إظهار القسم المطلوب
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
            
            // إعادة تحريك العناصر عند التبديل
            animateElements();
            
            // تغيير الخلفية حسب القسم
            changeBackground(target);
        });
    });
    
    // تغيير الخلفية حسب القسم النشط
    function changeBackground(sectionId) {
        const bg = document.querySelector('.animated-bg');
        
        switch(sectionId) {
            case '#about':
                bg.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
                break;
            case '#education':
                bg.style.background = 'linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)';
                break;
            case '#skills':
                bg.style.background = 'linear-gradient(-45deg, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1)';
                break;
            case '#projects':
                bg.style.background = 'linear-gradient(-45deg, #ffecd2, #fcb69f, #ff8177, #ff867a)';
                break;
            case '#contact':
                bg.style.background = 'linear-gradient(-45deg, #84fab0, #8fd3f4, #a6c1ee, #fbc2eb)';
                break;
            default:
                bg.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
        }
    }
    
    // تحريك شريط المهارات عند الظهور
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // تحريك العناصر عند التحميل وعند التبديل
    function animateElements() {
        const animateItems = document.querySelectorAll('.animate-title, .info-item, .timeline-item, .skill-item, .portfolio-item');
        
        animateItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // تحريك شريط المهارات إذا كان قسم المهارات نشط
        if (document.querySelector('#skills').classList.contains('active')) {
            animateSkills();
        }
    }
    
    // تأثيرات للروابط الاجتماعية
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // تأخير ظهور كل رابط
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 100 * index);
        
        // تأثير عند التحويم
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // تحميل السيرة الذاتية
    function downloadPDF() {
        // يمكنك استبدال هذا الرابط برابط ملف PDF الخاص بك
        const pdfUrl = 'downloads/cv.pdf';
        
        // إنشاء رابط تحميل
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'CV_Ahmed_Adel.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // أو يمكنك استخدام هذا إذا كنت تريد فتح الملف في نافذة جديدة
        // window.open(pdfUrl, '_blank');
    }
    
    // تعيين الحدث لزر التحميل
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPDF);
    }
    
    // إرسال نموذج الاتصال
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // تغيير سمة action في الفورم لتشير إلى Formspree
        contactForm.action = 'https://formspree.io/f/mdkgalrr';
        contactForm.method = 'POST';

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // رسالة نجاح جميلة
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert-message success';
                    successMsg.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h3>تم الإرسال بنجاح!</h3>
                        <p>شكراً لتواصلك، سأرد عليك في أقرب وقت.</p>
                    `;
                    document.body.appendChild(successMsg);
                    
                    // إخفاء الرسالة بعد 5 ثواني
                    setTimeout(() => {
                        successMsg.style.opacity = '0';
                        setTimeout(() => successMsg.remove(), 500);
                    }, 5000);
                    
                    this.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // رسالة خطأ جميلة
                const errorMsg = document.createElement('div');
                errorMsg.className = 'alert-message error';
                errorMsg.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>حدث خطأ!</h3>
                    <p>لم يتم إرسال الرسالة، يرجى المحاولة مرة أخرى.</p>
                `;
                document.body.appendChild(errorMsg);
                
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                    setTimeout(() => errorMsg.remove(), 500);
                }, 5000);
                
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // تشغيل التحريك عند التحميل الأولي
    animateElements();
    
    // تعيين الخلفية الافتراضية
    changeBackground('#about');
});