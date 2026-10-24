/* =============================================================
   0. 페이지 로드 시 HTML 셀렉트박스 옵션 자동 주입 (추가된 핵심 로직)
============================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    const monthSelect = document.getElementById("monthSelect");
    if (monthSelect) {
        let monthOptions = '<option value="" disabled selected>Select Birth Month</option>';
          const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
          ];
        for (let i = 1; i <= 12; i++) {
            const monthValue = `month${String(i).padStart(2, '0')}`;
            monthOptions += `<option value="${monthValue}">${months[i - 1]}</option>`;
            }
        monthSelect.innerHTML = monthOptions;
        }

    const fontOptionsHTML = `
      <option value="robotoFlex" disabled selected>--Select Font--</option>
      <option value="alexBrush">Alex Brush</option>
      <option value="allura">Allura</option>
      <option value="cherish">Cherish</option>
      <option value="dancingScript">Dancing Script</option>
      <option value="euphoriaScript">Euphoria Script</option>
      <option value="greatVibes">Great Vibes</option>
      <option value="herrVonMuellerhoff">Herr Von Muellerhoff</option>
      <option value="italianno">Italianno</option>
      <option value="marckScript">Marck Script</option>
      <option value="mrDafoe">Mr Dafoe</option>
      <option value="niconne">Niconne</option>
      <option value="pacifico">Pacifico</option>
      <option value="parisienne">Parisienne</option>
      <option value="sacramento">Sacramento</option>
      <option value="satisfy">Satisfy</option>
      <option value="tangerine">Tangerine</option>
      <option value="yellowtail">Yellowtail</option>
      <option value="yesteryear">Yesteryear</option>
    `;

    const fontSelects = document.querySelectorAll(".tattoo-font-select");
    fontSelects.forEach(select => {
        select.innerHTML = fontOptionsHTML;
    });

  //폰트 깜빡임 방지를 위한 사전 로드(Pre-loading)
  const fontClasses = [
    "alexBrush", "allura", "cherish", "dancingScript", "euphoriaScript",
    "greatVibes", "herrVonMuellerhoff", "italianno", "marckScript", "mrDafoe",
    "niconne", "pacifico", "parisienne", "sacramento", "satisfy",
    "tangerine", "yellowtail", "yesteryear"
  ];
  
  // 화면에는 보이지 않는 가상의 보관함
  const hiddenFontLoader = document.createElement("div");
  hiddenFontLoader.style.position = "absolute";
  hiddenFontLoader.style.width = "0";
  hiddenFontLoader.style.height = "0";
  hiddenFontLoader.style.overflow = "hidden";
  hiddenFontLoader.style.opacity = "0";
  
  // 페이지가 켜질 때 브라우저가 모든 폰트를 미리 다운로드하도록
  fontClasses.forEach(font => {
    const span = document.createElement("span");
    span.className = `font-${font}`;
    span.innerText = "A"; // 아무 글자나 넣어 브라우저가 폰트를 읽게
    hiddenFontLoader.appendChild(span);
  });
  
  document.body.appendChild(hiddenFontLoader);
});

/* =============================================================
   1. 상단 월 선택 검색 스크롤 매핑 로직
============================================================= */
function scrollToFlower() {
  const select = document.getElementById('monthSelect');
  const targetId = select.value;
  if (!targetId) {
    alert('Please select birth month.');
    return;
  }
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* =============================================================
   2. 실시간 타투 시뮬레이션 인터랙션 핵심 함수
============================================================= */
function updateTattooPreview(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const inputTxt = section.querySelector('.tattoo-name-input').value;
  const inputDob = section.querySelector('.tattoo-dob-input').value;
  const selectFont = section.querySelector('.tattoo-font-select').value;
  const previewNameDisplay = section.querySelector('.preview-name-text');
  const previewDobDisplay = section.querySelector('.preview-dob-text');

  if (inputTxt.trim() === "") {
    previewNameDisplay.innerText = "John Doe";
  } else {
    previewNameDisplay.innerText = inputTxt;
  }

  if (inputDob.trim() === "") {
    previewDobDisplay.innerText = "00.00.0000";
  } else {
    previewDobDisplay.innerText = inputDob;
  }

  previewNameDisplay.className = "preview-name-text"; // 초기화
  previewNameDisplay.classList.add(`font-${selectFont}`);
}

/* =============================================================
   3. 사진 갤러리 팝업 및 마우스 오버 인터랙션
============================================================= */
(function() {
  const currentContainers = document.querySelectorAll('.image-container');
  const bigImageModal = document.getElementById('imageModal');
  const bigModalImage = document.getElementById('modalImage');
  const bigModalClose = document.querySelector('.modal-close');

  currentContainers.forEach(container => {
    container.addEventListener('mouseenter', function() {
      this.classList.add('active');
    });
    container.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
    
    container.addEventListener('click', function() {
      const galleryData = this.getAttribute('data-gallery');
      if (!galleryData) return;
      const images = galleryData.split(',');
      
      const gridModal = document.createElement('div');
      Object.assign(gridModal.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '8000',
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px',
        boxSizing: 'border-box', cursor: 'pointer'
      });
      
      const galleryWrapper = document.createElement('div');
      Object.assign(galleryWrapper.style, {
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
        gap: '15px', maxWidth: '900px', width: '100%', maxHeight: '85vh',
        overflowY: 'auto', padding: '10px', boxSizing: 'border-box', cursor: 'default'
      });
      
      galleryWrapper.addEventListener('click', (e) => e.stopPropagation());
      
      images.forEach(src => {
        const imgWrapper = document.createElement('div');
        Object.assign(imgWrapper.style, {
          width: '100%', paddingTop: '100%', position: 'relative',
          borderRadius: '8px', overflow: 'hidden', backgroundColor: '#222'
        });

        const img = document.createElement('img');
        img.src = src.trim();
        Object.assign(img.style, {
          position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
          objectFit: 'cover', transition: 'transform 0.3s ease', cursor: 'zoom-in'
        });
        
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.05)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
        img.addEventListener('click', function(e) {
          e.stopPropagation(); 
          if (bigModalImage && bigImageModal) {
            bigModalImage.src = this.src;
            bigImageModal.style.display = 'flex';
          }
        });

        imgWrapper.appendChild(img);
        galleryWrapper.appendChild(imgWrapper);
      });

      const closeHint = document.createElement('div');
      closeHint.innerText = 'Click the background to close the gallery / Click an image to enlarge.';
      Object.assign(closeHint.style, {
        position: 'absolute', bottom: '20px', color: '#fff', fontSize: '14px',
        letterSpacing: '1px', pointerEvents: 'none', opacity: '0.8', textAlign: 'center', width: '100%'
      });
      
      gridModal.appendChild(galleryWrapper);
      gridModal.appendChild(closeHint);
      document.body.appendChild(gridModal);

      gridModal.addEventListener('click', function() {
        gridModal.remove();
      });
    });
  });

  if (bigImageModal) {
    bigImageModal.addEventListener('click', () => { bigImageModal.style.display = 'none'; });
    if (bigModalClose) {
      bigModalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        bigImageModal.style.display = 'none';
      });
    }
  }
})();

/* =============================================================
   4. TOP 스크롤 버튼 이벤트 핸들러
============================================================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  scrollTopBtn.addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

/* =============================================================
   5. 열 두개의 Ask Your Tattooist 버틀 클릭 시 하단 #Quote로 
============================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const quoteButtons = document.querySelectorAll('.btnQuote');
    
    quoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetSection = document.querySelector('#quote');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                return;
            }
        });
    });
});

/* =============================================================
   6. 타투 견적 신청 폼 제출 처리 (버튼 이름 분리 버전)
============================================================= */
(function() {
    const tattooForm = document.getElementById('frmTattoo');
    const submitBtn = document.querySelector('#btnSubmit'); 

    if (!tattooForm || !submitBtn) return;

    submitBtn.addEventListener('click', function(e) {
        if (!tattooForm.checkValidity()) {
            return;
        }

        e.preventDefault();

        const vName = document.getElementById('frmName')?.value || '';
        const vDob = document.getElementById('frmDob')?.value || '';
        const vPhone = document.getElementById('frmPhone')?.value || '';
        const vEmail = document.getElementById('frmEmail')?.value || '';
        const vComment = document.getElementById('frmComment')?.value || 'None';
        
        const checkedRadio = tattooForm.querySelector('input[name="frmWhetherFlower"]:checked');
        const vFlower = checkedRadio && checkedRadio.value === 'wanted' ? 'Yes' : 'No';

        const alertMessage = 
            `[Quote Request Sent]\n\n` +
            `• Full Name: ${vName}\n` +
            `• Date of Birth: ${vDob}\n` +
            `• Phone: ${vPhone}\n` +
            `• Email: ${vEmail}\n` +
            `• Add Flower: ${vFlower}\n\n` +
            `[Details]\n${vComment}\n\n` +
            `Thank you for your application.`;

        alert(alertMessage);

        tattooForm.reset();
    });
})();
