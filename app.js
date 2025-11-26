// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// 언어 감지 및 다국어 지원
const detectLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    // 한국어가 아니면 영어로 설정
    return browserLang.startsWith('ko') ? 'ko' : 'en';
};

let currentLanguage = detectLanguage();

// 번역 텍스트 객체
const translations = {
    ko: {
        // Header
        title: "Free PDF Editor",
        subtitle: "PDF 파일을 업로드하고 PDF 분할(Split), PDF 회전(Rotate), PDF 자르기(Crop), PDF 합치기(Merge), 페이지 삭제 등 다양한 PDF 편집 기능을 무료로 사용하세요",
        helpBtn: "❓ 사용법",
        
        // Sections
        fileUpload: "파일 업로드",
        editTools: "편집 도구",
        pdfPreview: "PDF 미리보기",
        
        // Page Order
        pageOrderChange: "📑 페이지 순서 변경",
        totalPages: "총 페이지:",
        apply: "적용",
        
        // Image to PDF
        imageToPdf: "🖼️ 이미지로 PDF 만들기",
        imageToPdfBtn: "이미지로 PDF 만들기",
        
        // Split
        pdfSplit: "✂️ PDF 분할",
        splitFrom: "시작 페이지",
        splitTo: "끝 페이지",
        splitExecute: "분할 실행",
        
        // Crop
        pdfCrop: "✂️ PDF 자르기",
        pdfCropBtn: "🔲 PDF 자르기",
        
        // Merge
        pdfMerge: "🔗 PDF 합치기",
        pdfMergeBtn: "PDF 합치기",
        
        // Rotate
        pageRotate: "🔄 페이지 회전하기",
        pageRotateBtn: "페이지 회전하기",
        
        // Delete
        pageDelete: "🗑️ 페이지 삭제",
        deletePagePlaceholder: "삭제할 페이지 번호",
        deletePageBtn: "페이지 삭제",
        
        // Actions
        downloadPdf: "💾 PDF 다운로드",
        downloadJpg: "🖼️ JPG로 다운로드",
        downloadText: "📝 텍스트로 다운로드",
        reset: "🔄 초기화",
        
        // File Upload
        selectPdfFile: "PDF 파일 선택",
        uploadPdf: "PDF 파일을 업로드하세요",
        fileName: "파일명:",
        fileSize: "크기:",
        
        // Modals
        cropModalTitle: "✂️ PDF 자르기",
        cropDirection: "자르기 방향 선택:",
        cropHorizontal: "좌우 반으로 자르기",
        cropVertical: "상하 반으로 자르기",
        cropCustom: "크롭하기",
        confirm: "확인",
        cancel: "취소",
        
        rotateModalTitle: "🔄 페이지 회전하기",
        rotatePageSelection: "회전할 페이지 선택:",
        rotateAll: "전체 페이지",
        rotateRange: "페이지 범위",
        rotateSpecific: "특정 페이지",
        rotateDirection: "회전 방향 선택:",
        rotate90: "90도 (시계방향)",
        rotate180: "180도",
        rotate270: "270도 (반시계방향)",
        apply: "적용",
        
        imageToPdfModalTitle: "🖼️ 이미지로 PDF 만들기",
        selectImages: "이미지 파일 선택 (여러 개 선택 가능):",
        upload: "업로드",
        
        mergeModalTitle: "🔗 PDF 합치기",
        mergeFile1: "첫 번째 PDF 파일:",
        mergeFile2: "두 번째 PDF 파일:",
        merge: "합치기",
        
        helpModalTitle: "📖 사용법",
        
        // Alerts
        pdfNotOpen: "PDF파일이 열려있지 않습니다.",
        imagePdfOcr: "이미지PDF는 OCR을 통해 텍스트를 추출할 수 있습니다.",
        libraryLoadError: "PDF 편집 라이브러리 로드에 실패했습니다. 페이지를 새로고침해주세요.",
        pdfOnly: "PDF 파일만 업로드할 수 있습니다.",
        loadError: "PDF 파일을 로드하는 중 오류가 발생했습니다.",
        noPdfData: "PDF 데이터가 없습니다.",
        uploadFirst: "먼저 PDF 파일을 업로드하세요.",
        invalidPageRange: "올바른 페이지 범위를 입력하세요.",
        pageExceeded: "총 페이지 수를 초과할 수 없습니다.",
        invalidPageNumber: "올바른 페이지 번호를 입력하세요.",
        lastPageCannotDelete: "마지막 페이지는 삭제할 수 없습니다.",
        selectCropArea: "크롭할 영역을 선택하세요.",
        noPdfToDownload: "다운로드할 PDF가 없습니다.",
        selectTwoPdfs: "두 개의 PDF 파일을 모두 선택해주세요.",
        selectImages: "이미지 파일을 선택해주세요.",
        imageFilesOnly: "이미지 파일만 선택할 수 있습니다."
    },
    en: {
        // Header
        title: "Free PDF Editor",
        subtitle: "Upload PDF files and use various PDF editing features for free: PDF Split, PDF Rotate, PDF Crop, PDF Merge, page deletion, and more",
        helpBtn: "❓ Help",
        
        // Sections
        fileUpload: "File Upload",
        editTools: "Edit Tools",
        pdfPreview: "PDF Preview",
        
        // Page Order
        pageOrderChange: "📑 Reorder Pages",
        totalPages: "Total Pages:",
        apply: "Apply",
        
        // Image to PDF
        imageToPdf: "🖼️ Create PDF from Images",
        imageToPdfBtn: "Create PDF from Images",
        
        // Split
        pdfSplit: "✂️ Split PDF",
        splitFrom: "Start Page",
        splitTo: "End Page",
        splitExecute: "Split",
        
        // Crop
        pdfCrop: "✂️ Crop PDF",
        pdfCropBtn: "🔲 Crop PDF",
        
        // Merge
        pdfMerge: "🔗 Merge PDF",
        pdfMergeBtn: "Merge PDF",
        
        // Rotate
        pageRotate: "🔄 Rotate Pages",
        pageRotateBtn: "Rotate Pages",
        
        // Delete
        pageDelete: "🗑️ Delete Page",
        deletePagePlaceholder: "Page number to delete",
        deletePageBtn: "Delete Page",
        
        // Actions
        downloadPdf: "💾 Download PDF",
        downloadJpg: "🖼️ Download as JPG",
        downloadText: "📝 Download as Text",
        reset: "🔄 Reset",
        
        // File Upload
        selectPdfFile: "Select PDF File",
        uploadPdf: "Upload a PDF file",
        fileName: "File Name:",
        fileSize: "Size:",
        
        // Modals
        cropModalTitle: "✂️ Crop PDF",
        cropDirection: "Select crop direction:",
        cropHorizontal: "Split horizontally (left/right)",
        cropVertical: "Split vertically (top/bottom)",
        cropCustom: "Crop",
        confirm: "Confirm",
        cancel: "Cancel",
        
        rotateModalTitle: "🔄 Rotate Pages",
        rotatePageSelection: "Select pages to rotate:",
        rotateAll: "All Pages",
        rotateRange: "Page Range",
        rotateSpecific: "Specific Pages",
        rotateDirection: "Select rotation direction:",
        rotate90: "90° (Clockwise)",
        rotate180: "180°",
        rotate270: "270° (Counter-clockwise)",
        apply: "Apply",
        
        imageToPdfModalTitle: "🖼️ Create PDF from Images",
        selectImages: "Select image files (multiple selection available):",
        upload: "Upload",
        
        mergeModalTitle: "🔗 Merge PDF",
        mergeFile1: "First PDF file:",
        mergeFile2: "Second PDF file:",
        merge: "Merge",
        
        helpModalTitle: "📖 Help",
        
        // Alerts
        pdfNotOpen: "PDF file is not open.",
        imagePdfOcr: "Image PDFs can extract text via OCR.",
        libraryLoadError: "Failed to load PDF editing library. Please refresh the page.",
        pdfOnly: "Only PDF files can be uploaded.",
        loadError: "An error occurred while loading the PDF file.",
        noPdfData: "No PDF data available.",
        uploadFirst: "Please upload a PDF file first.",
        invalidPageRange: "Please enter a valid page range.",
        pageExceeded: "Cannot exceed total number of pages.",
        invalidPageNumber: "Please enter a valid page number.",
        lastPageCannotDelete: "The last page cannot be deleted.",
        selectCropArea: "Please select an area to crop.",
        noPdfToDownload: "No PDF to download.",
        selectTwoPdfs: "Please select both PDF files.",
        selectImages: "Please select image files.",
        imageFilesOnly: "Only image files can be selected."
    }
};

// 언어 변경 함수
const changeLanguage = (lang) => {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    const t = translations[lang];
    
    // Header
    document.querySelector('header h1').textContent = t.title;
    document.querySelector('header p').textContent = t.subtitle;
    document.querySelector('#helpBtn').textContent = t.helpBtn;
    
    // Sections
    document.querySelector('.upload-section h2').textContent = t.fileUpload;
    document.querySelector('.tools-section h2').textContent = t.editTools;
    document.querySelector('.preview-section h2').textContent = t.pdfPreview;
    
    // Page Order
    const pageOrderGroup = document.querySelector('.tool-group h3');
    if (pageOrderGroup && pageOrderGroup.textContent.includes('페이지 순서')) {
        pageOrderGroup.textContent = t.pageOrderChange;
    }
    const totalPagesLabel = document.querySelector('.page-info span');
    if (totalPagesLabel) {
        totalPagesLabel.innerHTML = `<strong>${t.totalPages}</strong> <strong id="totalPages">0</strong>`;
    }
    const applyBtn = document.querySelector('#applyPageOrderBtn');
    if (applyBtn) applyBtn.textContent = t.apply;
    
    // Image to PDF
    const imageToPdfGroup = document.querySelectorAll('.tool-group h3')[1];
    if (imageToPdfGroup) imageToPdfGroup.textContent = t.imageToPdf;
    const imageToPdfBtn = document.querySelector('#imageToPdfBtn');
    if (imageToPdfBtn) imageToPdfBtn.textContent = t.imageToPdfBtn;
    
    // Split
    const splitGroup = document.querySelectorAll('.tool-group h3')[2];
    if (splitGroup) splitGroup.textContent = t.pdfSplit;
    const splitFromInput = document.querySelector('#splitFrom');
    if (splitFromInput) splitFromInput.placeholder = t.splitFrom;
    const splitToInput = document.querySelector('#splitTo');
    if (splitToInput) splitToInput.placeholder = t.splitTo;
    const splitBtn = document.querySelector('#splitBtn');
    if (splitBtn) splitBtn.textContent = t.splitExecute;
    
    // Crop
    const cropGroup = document.querySelectorAll('.tool-group h3')[3];
    if (cropGroup) cropGroup.textContent = t.pdfCrop;
    const cropBtn = document.querySelector('#splitPdfBtn');
    if (cropBtn) cropBtn.textContent = t.pdfCropBtn;
    
    // Merge
    const mergeGroup = document.querySelectorAll('.tool-group h3')[4];
    if (mergeGroup) mergeGroup.textContent = t.pdfMerge;
    const mergeBtn = document.querySelector('#mergeBtn');
    if (mergeBtn) mergeBtn.textContent = t.pdfMergeBtn;
    
    // Rotate
    const rotateGroup = document.querySelectorAll('.tool-group h3')[5];
    if (rotateGroup) rotateGroup.textContent = t.pageRotate;
    const rotateBtn = document.querySelector('#rotatePdfBtn');
    if (rotateBtn) rotateBtn.textContent = t.pageRotateBtn;
    
    // Delete
    const deleteGroup = document.querySelectorAll('.tool-group h3')[6];
    if (deleteGroup) deleteGroup.textContent = t.pageDelete;
    const deletePageInput = document.querySelector('#deletePage');
    if (deletePageInput) deletePageInput.placeholder = t.deletePagePlaceholder;
    const deleteBtn = document.querySelector('#deleteBtn');
    if (deleteBtn) deleteBtn.textContent = t.deletePageBtn;
    
    // Action Buttons
    const downloadPdfBtn = document.querySelector('#downloadBtn');
    if (downloadPdfBtn) downloadPdfBtn.textContent = t.downloadPdf;
    const downloadJpgBtn = document.querySelector('#downloadJpgBtn');
    if (downloadJpgBtn) downloadJpgBtn.textContent = t.downloadJpg;
    const downloadTextBtn = document.querySelector('#downloadTextBtn');
    if (downloadTextBtn) downloadTextBtn.textContent = t.downloadText;
    const resetBtn = document.querySelector('#resetBtn');
    if (resetBtn) resetBtn.textContent = t.reset;
    
    // File Upload
    const fileLabel = document.querySelector('.file-label span:last-child');
    if (fileLabel) fileLabel.textContent = t.selectPdfFile;
    const emptyState = document.querySelector('.empty-state p');
    if (emptyState) emptyState.textContent = `📄 ${t.uploadPdf}`;
    
    // Modals
    const cropModalTitle = document.querySelector('#splitPdfModal h2');
    if (cropModalTitle) cropModalTitle.textContent = t.cropModalTitle;
    const cropDirectionLabel = document.querySelector('#splitPdfModal label');
    if (cropDirectionLabel && cropDirectionLabel.textContent.includes('자르기 방향')) {
        cropDirectionLabel.textContent = t.cropDirection;
    }
    const cropOptions = document.querySelectorAll('#splitPdfModal input[type="radio"]');
    if (cropOptions.length >= 3) {
        cropOptions[0].nextSibling.textContent = t.cropHorizontal;
        cropOptions[1].nextSibling.textContent = t.cropVertical;
        cropOptions[2].nextSibling.textContent = t.cropCustom;
    }
    const confirmBtn = document.querySelector('#executeSplitPdfBtn');
    if (confirmBtn) confirmBtn.textContent = t.confirm;
    const cancelBtn = document.querySelector('#cancelSplitPdfBtn');
    if (cancelBtn) cancelBtn.textContent = t.cancel;
    
    const rotateModalTitle = document.querySelector('#rotatePdfModal h2');
    if (rotateModalTitle) rotateModalTitle.textContent = t.rotateModalTitle;
    const rotatePageSelectionLabel = document.querySelector('#rotatePdfModal .input-group label');
    if (rotatePageSelectionLabel && rotatePageSelectionLabel.textContent.includes('회전할 페이지')) {
        rotatePageSelectionLabel.textContent = t.rotatePageSelection;
    }
    const rotateOptions = document.querySelectorAll('#rotatePdfModal input[type="radio"][name="rotatePageSelection"]');
    if (rotateOptions.length >= 3) {
        rotateOptions[0].nextSibling.textContent = t.rotateAll;
        rotateOptions[1].nextSibling.textContent = t.rotateRange;
        rotateOptions[2].nextSibling.textContent = t.rotateSpecific;
    }
    const rotateDirectionLabel = document.querySelectorAll('#rotatePdfModal .input-group label')[1];
    if (rotateDirectionLabel && rotateDirectionLabel.textContent.includes('회전 방향')) {
        rotateDirectionLabel.textContent = t.rotateDirection;
    }
    const rotateDirectionOptions = document.querySelectorAll('#rotatePdfModal input[type="radio"][name="rotateDirection"]');
    if (rotateDirectionOptions.length >= 3) {
        rotateDirectionOptions[0].nextSibling.textContent = t.rotate90;
        rotateDirectionOptions[1].nextSibling.textContent = t.rotate180;
        rotateDirectionOptions[2].nextSibling.textContent = t.rotate270;
    }
    const executeRotateBtn = document.querySelector('#executeRotatePdfBtn');
    if (executeRotateBtn) executeRotateBtn.textContent = t.apply;
    const cancelRotateBtn = document.querySelector('#cancelRotatePdfBtn');
    if (cancelRotateBtn) cancelRotateBtn.textContent = t.cancel;
    
    const imageToPdfModalTitle = document.querySelector('#imageToPdfModal h2');
    if (imageToPdfModalTitle) imageToPdfModalTitle.textContent = t.imageToPdfModalTitle;
    const selectImagesLabel = document.querySelector('#imageToPdfModal label');
    if (selectImagesLabel) selectImagesLabel.textContent = t.selectImages;
    const uploadImagesBtn = document.querySelector('#uploadImagesBtn');
    if (uploadImagesBtn) uploadImagesBtn.textContent = t.upload;
    const cancelImageToPdfBtn = document.querySelector('#cancelImageToPdfBtn');
    if (cancelImageToPdfBtn) cancelImageToPdfBtn.textContent = t.cancel;
    
    const mergeModalTitle = document.querySelector('#mergeModal h2');
    if (mergeModalTitle) mergeModalTitle.textContent = t.mergeModalTitle;
    const mergeFile1Label = document.querySelector('#mergeModal label[for="mergeFile1"]');
    if (mergeFile1Label) mergeFile1Label.textContent = t.mergeFile1;
    const mergeFile2Label = document.querySelector('#mergeModal label[for="mergeFile2"]');
    if (mergeFile2Label) mergeFile2Label.textContent = t.mergeFile2;
    const executeMergeBtn = document.querySelector('#executeMergeBtn');
    if (executeMergeBtn) executeMergeBtn.textContent = t.merge;
    const cancelMergeBtn = document.querySelector('#cancelMergeBtn');
    if (cancelMergeBtn) cancelMergeBtn.textContent = t.cancel;
    
    const helpModalTitle = document.querySelector('#helpModal h2');
    if (helpModalTitle) helpModalTitle.textContent = t.helpModalTitle;
};

// 페이지 로드 시 언어 자동 감지 및 적용
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});

// 라이브러리 로드 확인
window.addEventListener('load', () => {
    if (typeof PDFLib === 'undefined') {
        console.error('PDFLib이 로드되지 않았습니다.');
        const t = translations[currentLanguage];
        alert(t.libraryLoadError);
    } else {
        console.log('PDFLib이 성공적으로 로드되었습니다.');
    }
});

// 전역 변수
let currentPdfDoc = null;
let currentPdfBytes = null;
let pdfPages = [];
let isCropMode = false;
let cropSelection = null; // { x, y, width, height, startX, startY }
let cropStartPos = null;

// currentPdfBytes를 안전하게 저장하는 함수
function savePdfBytes(bytes) {
    // 완전히 독립적인 복사본 생성
    const newArrayBuffer = new ArrayBuffer(bytes.length);
    const newBytes = new Uint8Array(newArrayBuffer);
    newBytes.set(bytes);
    currentPdfBytes = newBytes;
    console.log('savePdfBytes: currentPdfBytes 저장 완료, 크기:', currentPdfBytes.length);
    return currentPdfBytes;
}

// DOM 요소
const pdfInput = document.getElementById('pdfInput');
const fileInfo = document.getElementById('fileInfo');
const totalPages = document.getElementById('totalPages');
const pageList = document.getElementById('pageList');
const pdfPreview = document.getElementById('pdfPreview');
const splitFrom = document.getElementById('splitFrom');
const splitTo = document.getElementById('splitTo');
const splitBtn = document.getElementById('splitBtn');
const deletePage = document.getElementById('deletePage');
const deleteBtn = document.getElementById('deleteBtn');
const splitPdfBtn = document.getElementById('splitPdfBtn');
const splitPdfModal = document.getElementById('splitPdfModal');
const closeSplitPdfModal = document.getElementById('closeSplitPdfModal');
const executeSplitPdfBtn = document.getElementById('executeSplitPdfBtn');
const cancelSplitPdfBtn = document.getElementById('cancelSplitPdfBtn');
const rotatePdfBtn = document.getElementById('rotatePdfBtn');
const rotatePdfModal = document.getElementById('rotatePdfModal');
const closeRotatePdfModal = document.getElementById('closeRotatePdfModal');
const executeRotatePdfBtn = document.getElementById('executeRotatePdfBtn');
const cancelRotatePdfBtn = document.getElementById('cancelRotatePdfBtn');
const downloadBtn = document.getElementById('downloadBtn');
const downloadJpgBtn = document.getElementById('downloadJpgBtn');
const downloadTextBtn = document.getElementById('downloadTextBtn');
const applyPageOrderBtn = document.getElementById('applyPageOrderBtn');
const imageToPdfBtn = document.getElementById('imageToPdfBtn');
const imageToPdfModal = document.getElementById('imageToPdfModal');
const closeImageToPdfModal = document.getElementById('closeImageToPdfModal');
const imageFiles = document.getElementById('imageFiles');
const imageFilesInfo = document.getElementById('imageFilesInfo');
const imagePreviewList = document.getElementById('imagePreviewList');
const uploadImagesBtn = document.getElementById('uploadImagesBtn');
const cancelImageToPdfBtn = document.getElementById('cancelImageToPdfBtn');
const mergeBtn = document.getElementById('mergeBtn');
const mergeModal = document.getElementById('mergeModal');
const closeMergeModal = document.getElementById('closeMergeModal');
const mergeFile1 = document.getElementById('mergeFile1');
const mergeFile2 = document.getElementById('mergeFile2');
const mergeFile1Info = document.getElementById('mergeFile1Info');
const mergeFile2Info = document.getElementById('mergeFile2Info');
const executeMergeBtn = document.getElementById('executeMergeBtn');
const cancelMergeBtn = document.getElementById('cancelMergeBtn');
const resetBtn = document.getElementById('resetBtn');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelpModal = document.getElementById('closeHelpModal');

// PDF 파일 업로드
if (!pdfInput) {
    console.error('pdfInput 요소를 찾을 수 없습니다.');
} else {
    pdfInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        alert(translations[currentLanguage].pdfOnly);
        return;
    }

    // 기존 상태 초기화
    currentPdfDoc = null;
    currentPdfBytes = null;
    pdfPages = [];
    
    // UI 초기화
    const t = translations[currentLanguage];
    pdfPreview.innerHTML = `<div class="empty-state"><p>📄 ${t.uploadPdf}</p></div>`;
    pageList.innerHTML = '';
    totalPages.textContent = '0';
    splitFrom.value = '';
    splitTo.value = '';
    deletePage.value = '';
    downloadBtn.disabled = true;
    downloadJpgBtn.disabled = true;
    downloadTextBtn.disabled = true;
    applyPageOrderBtn.style.display = 'none';

    const t = translations[currentLanguage];
    fileInfo.innerHTML = `
        <strong>${t.fileName}</strong> ${file.name}<br>
        <strong>${t.fileSize}</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;

    const arrayBuffer = await file.arrayBuffer();
    const tempBytes = new Uint8Array(arrayBuffer);
    
    // 완전히 독립적인 복사본 생성 (ArrayBuffer detached 방지)
    savePdfBytes(tempBytes);
    
    // currentPdfBytes를 백업 (절대 변경되지 않도록)
    const originalPdfBytes = new Uint8Array(currentPdfBytes);
    
    console.log('PDF 업로드 완료, 크기:', currentPdfBytes.length);
    console.log('originalPdfBytes 백업 완료, 크기:', originalPdfBytes.length);
    console.log('currentPdfBytes 타입:', currentPdfBytes.constructor.name);

    try {
        // originalPdfBytes를 사용하여 pdf.js에 전달 (currentPdfBytes는 절대 건드리지 않음)
        const pdfBytesForPreview = new Uint8Array(originalPdfBytes);
        
        // 독립적인 ArrayBuffer 생성하여 pdf.js에 전달
        const pdfArrayBuffer = new ArrayBuffer(pdfBytesForPreview.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(pdfBytesForPreview);
        
        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        pdfPages = [];
        
        const numPages = currentPdfDoc.numPages;
        totalPages.textContent = numPages;

        // 페이지 목록 생성
        updatePageList(numPages);

        // PDF 미리보기 렌더링
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;
        
        // currentPdfBytes가 변경되지 않았는지 확인
        console.log('PDF 로드 완료, 페이지 수:', numPages);
        console.log('업로드 후 currentPdfBytes 최종 확인:', currentPdfBytes.length);
        console.log('originalPdfBytes 크기 확인:', originalPdfBytes.length);
        
        // 만약 currentPdfBytes가 손상되었다면 복구
        if (currentPdfBytes.length === 0 && originalPdfBytes.length > 0) {
            console.warn('currentPdfBytes가 손상되었습니다. 복구 중...');
            savePdfBytes(originalPdfBytes);
            console.log('복구 완료, currentPdfBytes 크기:', currentPdfBytes.length);
        }
    } catch (error) {
        console.error('PDF 로드 오류:', error);
        alert(translations[currentLanguage].loadError);
    }
    });
}

// 페이지 목록 업데이트
function updatePageList(numPages) {
    pageList.innerHTML = '';
    applyPageOrderBtn.style.display = 'none';
    
    for (let i = 1; i <= numPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = 'page-item';
        pageItem.draggable = true;
        pageItem.dataset.originalIndex = i - 1; // 원본 인덱스
        pageItem.dataset.currentIndex = i - 1; // 현재 표시 인덱스
        
        // 드래그 핸들 아이콘
        const dragHandle = document.createElement('span');
        dragHandle.className = 'drag-handle';
        dragHandle.textContent = '☰';
        dragHandle.title = '드래그하여 순서 변경';
        
        // 페이지 번호
        const pageNumber = document.createElement('span');
        pageNumber.className = 'page-number-text';
        pageNumber.textContent = i;
        
        pageItem.appendChild(dragHandle);
        pageItem.appendChild(pageNumber);
        
        // 클릭 이벤트
        pageItem.addEventListener('click', (e) => {
            // 드래그 핸들 클릭 시에는 선택하지 않음
            if (e.target.classList.contains('drag-handle')) return;
            
            document.querySelectorAll('.page-item').forEach(item => item.classList.remove('selected'));
            pageItem.classList.add('selected');
            // 원본 페이지 번호 사용
            const originalPageNum = parseInt(pageItem.dataset.originalIndex) + 1;
            deletePage.value = originalPageNum;
        });
        
        // 드래그 이벤트
        pageItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', pageItem.dataset.currentIndex);
            pageItem.classList.add('dragging');
        });
        
        pageItem.addEventListener('dragend', () => {
            pageItem.classList.remove('dragging');
            checkPageOrderChanged();
        });
        
        pageItem.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const dragging = document.querySelector('.dragging');
            if (dragging && dragging !== pageItem) {
                const allItems = Array.from(pageList.querySelectorAll('.page-item'));
                const draggingIndex = allItems.indexOf(dragging);
                const currentIndex = allItems.indexOf(pageItem);
                
                if (draggingIndex < currentIndex) {
                    pageList.insertBefore(dragging, pageItem.nextSibling);
                } else {
                    pageList.insertBefore(dragging, pageItem);
                }
            }
        });
        
        pageItem.addEventListener('drop', (e) => {
            e.preventDefault();
        });
        
        pageList.appendChild(pageItem);
    }
}

// 페이지 번호는 원본 번호 유지 (드래그 후에도 변경하지 않음)

// 페이지 순서가 변경되었는지 확인
function checkPageOrderChanged() {
    const items = pageList.querySelectorAll('.page-item');
    let hasChanged = false;
    
    items.forEach((item, index) => {
        const originalIndex = parseInt(item.dataset.originalIndex);
        if (originalIndex !== index) {
            hasChanged = true;
        }
    });
    
    if (hasChanged) {
        applyPageOrderBtn.style.display = 'block';
    } else {
        applyPageOrderBtn.style.display = 'none';
    }
}

// 적용 버튼 클릭 시 페이지 순서 변경
applyPageOrderBtn.addEventListener('click', async () => {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert(translations[currentLanguage].noPdfData);
        return;
    }

    try {
        const items = pageList.querySelectorAll('.page-item');
        const newOrder = [];
        
        items.forEach((item) => {
            newOrder.push(parseInt(item.dataset.originalIndex));
        });
        
        await applyPageOrder(newOrder);
        applyPageOrderBtn.style.display = 'none';
    } catch (error) {
        console.error('페이지 순서 적용 오류:', error);
        alert(`페이지 순서 적용 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// 페이지 순서 적용
async function applyPageOrder(newOrder) {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert(translations[currentLanguage].noPdfData);
        return;
    }

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }

        applyPageOrderBtn.disabled = true;
        applyPageOrderBtn.textContent = '적용 중...';

        const { PDFDocument } = PDFLib;
        
        // currentPdfBytes를 안전하게 복사하여 사용
        const sourceBytes = new Uint8Array(currentPdfBytes);
        const sourceArrayBuffer = new ArrayBuffer(sourceBytes.length);
        const sourceView = new Uint8Array(sourceArrayBuffer);
        sourceView.set(sourceBytes);
        
        const sourcePdf = await PDFDocument.load(sourceArrayBuffer);
        const newPdf = await PDFDocument.create();
        
        // 새로운 순서로 페이지 복사
        const copiedPages = await newPdf.copyPages(sourcePdf, newOrder);
        copiedPages.forEach((page) => {
            newPdf.addPage(page);
        });
        
        // 저장
        const base64String = await newPdf.saveAsBase64();
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        savePdfBytes(bytes);
        
        // pdf.js에 전달
        const pdfArrayBuffer = new ArrayBuffer(currentPdfBytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(currentPdfBytes);
        
        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        
        // 페이지 목록 및 미리보기 업데이트
        const newNumPages = currentPdfDoc.numPages;
        totalPages.textContent = newNumPages;
        // 페이지 목록을 다시 생성하여 원본 순서로 초기화
        updatePageList(newNumPages);
        await renderPdfPreview();
        
        applyPageOrderBtn.disabled = false;
        applyPageOrderBtn.textContent = '적용';
        
        alert('페이지 순서가 적용되었습니다.');
    } catch (error) {
        console.error('페이지 순서 적용 오류:', error);
        applyPageOrderBtn.disabled = false;
        applyPageOrderBtn.textContent = '적용';
        alert(`페이지 순서 적용 중 오류가 발생했습니다: ${error.message || error}`);
    }
}

// PDF 미리보기 렌더링
async function renderPdfPreview() {
    if (!currentPdfDoc) return;

    pdfPreview.innerHTML = '';

    for (let i = 1; i <= currentPdfDoc.numPages; i++) {
        const page = await currentPdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        pageDiv.style.position = 'relative';

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        // 이미지 우클릭 컨텍스트 메뉴
        canvas.addEventListener('contextmenu', async (e) => {
            e.preventDefault();
            await copyImageFromCanvas(canvas, e);
        });

        pageDiv.appendChild(canvas);

        // 크롭 모드일 때 선택 영역 오버레이 추가
        if (isCropMode) {
            const overlay = document.createElement('div');
            overlay.className = 'crop-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.cursor = 'crosshair';
            overlay.style.zIndex = '5';
            
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let selectionBox = null;
            
            overlay.addEventListener('mousedown', (e) => {
                if (!isCropMode) return;
                isDragging = true;
                const rect = canvas.getBoundingClientRect();
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;
                cropStartPos = { x: startX, y: startY };
                
                // 기존 선택 박스 제거
                if (selectionBox) {
                    selectionBox.remove();
                }
                
                // 새 선택 박스 생성
                selectionBox = document.createElement('div');
                selectionBox.className = 'crop-selection-box';
                selectionBox.style.position = 'absolute';
                selectionBox.style.border = '2px dashed #667eea';
                selectionBox.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                selectionBox.style.pointerEvents = 'none';
                pageDiv.appendChild(selectionBox);
            });
            
            overlay.addEventListener('mousemove', (e) => {
                if (!isDragging || !isCropMode) return;
                const rect = canvas.getBoundingClientRect();
                const currentX = e.clientX - rect.left;
                const currentY = e.clientY - rect.top;
                
                const x = Math.min(startX, currentX);
                const y = Math.min(startY, currentY);
                const width = Math.abs(currentX - startX);
                const height = Math.abs(currentY - startY);
                
                // Canvas 좌표로 변환 (스케일 고려)
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                
                cropSelection = {
                    x: x * scaleX,
                    y: y * scaleY,
                    width: width * scaleX,
                    height: height * scaleY,
                    startX: startX,
                    startY: startY
                };
                
                selectionBox.style.left = `${x}px`;
                selectionBox.style.top = `${y}px`;
                selectionBox.style.width = `${width}px`;
                selectionBox.style.height = `${height}px`;
            });
            
            overlay.addEventListener('mouseup', () => {
                if (!isCropMode) return;
                isDragging = false;
            });
            
            pageDiv.appendChild(overlay);
        }

        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = `페이지 ${i}`;

        pageDiv.appendChild(canvas);
        pageDiv.appendChild(pageNumber);
        pdfPreview.appendChild(pageDiv);
    }
}

// 크롭 적용 함수
async function applyCrop() {
    if (!cropSelection) {
        alert(translations[currentLanguage].selectCropArea);
        return;
    }
    
    try {
        const applyCropBtn = document.getElementById('applyCropBtn');
        if (applyCropBtn) {
            applyCropBtn.disabled = true;
            applyCropBtn.textContent = '처리 중...';
        }
        
        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }
        
        const { PDFDocument } = PDFLib;
        const numPages = currentPdfDoc.numPages;
        
        // 새 PDF 문서 생성
        const newPdf = await PDFDocument.create();
        
        // 첫 번째 페이지의 viewport를 기준으로 크롭 좌표 계산
        const firstPage = await currentPdfDoc.getPage(1);
        const firstViewport = firstPage.getViewport({ scale: 1.5 });
        
        // 크롭 좌표를 PDF 좌표계로 변환
        const scaleX = firstViewport.width / (firstViewport.width);
        const scaleY = firstViewport.height / (firstViewport.height);
        
        const cropX = cropSelection.x;
        const cropY = cropSelection.y;
        const cropWidth = cropSelection.width;
        const cropHeight = cropSelection.height;
        
        // 각 페이지를 크롭
        for (let i = 1; i <= numPages; i++) {
            const page = await currentPdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // 고해상도로 렌더링
            
            // 페이지를 Canvas로 렌더링
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // 크롭 좌표를 고해상도 viewport에 맞게 조정
            const highScaleX = viewport.width / firstViewport.width;
            const highScaleY = viewport.height / firstViewport.height;
            
            const scaledCropX = cropX * highScaleX;
            const scaledCropY = cropY * highScaleY;
            const scaledCropWidth = cropWidth * highScaleX;
            const scaledCropHeight = cropHeight * highScaleY;
            
            // 크롭된 영역만 추출
            const croppedCanvas = document.createElement('canvas');
            const croppedContext = croppedCanvas.getContext('2d');
            croppedCanvas.width = scaledCropWidth;
            croppedCanvas.height = scaledCropHeight;
            
            croppedContext.drawImage(
                canvas,
                scaledCropX, scaledCropY, scaledCropWidth, scaledCropHeight,
                0, 0, scaledCropWidth, scaledCropHeight
            );
            
            // Canvas를 PNG로 변환
            const imageData = croppedCanvas.toDataURL('image/png');
            const base64 = imageData.split(',')[1];
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let j = 0; j < binary.length; j++) {
                bytes[j] = binary.charCodeAt(j);
            }
            
            // 이미지를 PDF에 임베드
            const image = await newPdf.embedPng(bytes);
            
            // 크롭된 페이지 추가
            const newPage = newPdf.addPage([scaledCropWidth, scaledCropHeight]);
            newPage.drawImage(image, {
                x: 0,
                y: 0,
                width: scaledCropWidth,
                height: scaledCropHeight,
            });
        }
        
        // PDF 저장
        const base64String = await newPdf.saveAsBase64();
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        savePdfBytes(bytes);
        
        // pdf.js에 전달
        const pdfArrayBuffer = new ArrayBuffer(bytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(bytes);
        
        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        pdfPages = [];
        
        const newNumPages = currentPdfDoc.numPages;
        totalPages.textContent = newNumPages;
        
        // 페이지 목록 생성
        updatePageList(newNumPages);
        
        // 크롭 모드 비활성화
        isCropMode = false;
        cropSelection = null;
        cropStartPos = null;
        
        if (applyCropBtn) {
            applyCropBtn.style.display = 'none';
        }
        
        // PDF 미리보기 렌더링
        await renderPdfPreview();
        
        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;
        
        alert(`PDF가 크롭되었습니다. ${numPages}페이지가 처리되었습니다.`);
        
    } catch (error) {
        console.error('PDF 크롭 오류:', error);
        alert(`PDF 크롭 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
        const applyCropBtn = document.getElementById('applyCropBtn');
        if (applyCropBtn) {
            applyCropBtn.disabled = false;
            applyCropBtn.textContent = '✂️ 크롭 적용';
        }
    }
}


// Canvas에서 이미지 복사
async function copyImageFromCanvas(canvas, event) {
    try {
        // 클릭한 위치 주변의 이미지 영역 추출 (선택적으로 전체 이미지 복사)
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // 전체 Canvas를 이미지로 복사
        canvas.toBlob(async (blob) => {
            try {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                alert('이미지가 클립보드에 복사되었습니다.');
            } catch (err) {
                // ClipboardItem을 지원하지 않는 경우 대체 방법
                const dataUrl = canvas.toDataURL('image/png');
                const textArea = document.createElement('textarea');
                textArea.value = dataUrl;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert('이미지 데이터 URL이 클립보드에 복사되었습니다.');
                } catch (e) {
                    // 최종 대체: 다운로드
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `page_image_${Date.now()}.png`;
                    link.click();
                    alert('이미지를 다운로드했습니다. 이미지 편집 프로그램에서 열어 복사하세요.');
                }
                document.body.removeChild(textArea);
            }
        }, 'image/png');
    } catch (error) {
        console.error('이미지 복사 오류:', error);
        alert('이미지 복사 중 오류가 발생했습니다.');
    }
}

// PDF 분할
splitBtn.addEventListener('click', async () => {
    console.log('=== 분할 버튼 클릭 ===');
    console.log('currentPdfBytes 직접 확인:', currentPdfBytes);
    console.log('currentPdfBytes 타입:', currentPdfBytes ? currentPdfBytes.constructor.name : 'null');
    console.log('currentPdfBytes 크기:', currentPdfBytes ? currentPdfBytes.length : 0);
    console.log('currentPdfDoc:', currentPdfDoc ? `존재 (페이지: ${currentPdfDoc.numPages})` : '없음');
    
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        console.error('currentPdfBytes가 없거나 비어있습니다.');
        alert('PDF 데이터가 손실되었습니다. PDF 파일을 다시 업로드해주세요.');
        return;
    }

    if (!currentPdfDoc) {
        alert('PDF 문서가 로드되지 않았습니다. PDF 파일을 다시 업로드하세요.');
        return;
    }

    const from = parseInt(splitFrom.value);
    const to = parseInt(splitTo.value);

    if (!from || !to || from < 1 || to < 1 || from > to) {
        alert(translations[currentLanguage].invalidPageRange);
        return;
    }

    if (to > currentPdfDoc.numPages) {
        alert(`${translations[currentLanguage].pageExceeded} (${currentPdfDoc.numPages})`);
        return;
    }

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
        }

        console.log('PDF 분할 시작: 페이지', from, '~', to);
        
        const { PDFDocument } = PDFLib;
        
        // currentPdfBytes를 안전하게 복사하여 사용
        const sourceBytes = new Uint8Array(currentPdfBytes);
        const sourceArrayBuffer = new ArrayBuffer(sourceBytes.length);
        const sourceView = new Uint8Array(sourceArrayBuffer);
        sourceView.set(sourceBytes);
        
        console.log('원본 PDF 로드 중...', '크기:', sourceBytes.length);
        const sourcePdf = await PDFDocument.load(sourceArrayBuffer);
        console.log('원본 PDF 로드 완료, 페이지 수:', sourcePdf.getPageCount());
        
        const newPdf = await PDFDocument.create();
        console.log('새 PDF 생성 완료');

        // 선택한 페이지 범위 복사 (0부터 시작하는 인덱스)
        const pageIndices = Array.from({ length: to - from + 1 }, (_, i) => from + i - 1);
        console.log('복사할 페이지 인덱스:', pageIndices);
        
        if (pageIndices.length === 0) {
            throw new Error('복사할 페이지가 없습니다.');
        }
        
        console.log('페이지 복사 중...');
        const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
        console.log('페이지 복사 완료, 복사된 페이지 수:', copiedPages.length);
        
        if (!copiedPages || copiedPages.length === 0) {
            throw new Error('페이지 복사에 실패했습니다.');
        }
        
        // 복사한 페이지들을 새 PDF에 추가
        console.log('페이지 추가 중...');
        copiedPages.forEach((page, index) => {
            newPdf.addPage(page);
            console.log(`페이지 ${index + 1} 추가 완료`);
        });
        console.log('모든 페이지 추가 완료, 새 PDF 페이지 수:', newPdf.getPageCount());

        // 업데이트 - saveAsBase64를 사용하여 안정적으로 변환
        console.log('PDF 저장 중 (Base64 방식)...');
        const base64String = await newPdf.saveAsBase64();
        console.log('PDF Base64 저장 완료, 길이:', base64String.length);
        
        // Base64를 Uint8Array로 변환
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        console.log('Base64 변환 완료, 크기:', bytes.length);
        
        // PDF 헤더 확인
        const headerBytes = bytes.slice(0, Math.min(4, bytes.length));
        const header = String.fromCharCode(...headerBytes);
        console.log('PDF 헤더 확인:', header);
        
        if (header !== '%PDF') {
            console.error('PDF 헤더가 올바르지 않습니다:', header);
            throw new Error('생성된 PDF가 유효하지 않습니다.');
        }
        
        // 저장
        savePdfBytes(bytes);
        
        // pdf.js에 전달
        console.log('pdf.js로 PDF 로드 중...');
        const pdfArrayBuffer = new ArrayBuffer(currentPdfBytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(currentPdfBytes);
        
        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        console.log('pdf.js PDF 로드 완료, 페이지 수:', currentPdfDoc.numPages);
        
        const numPages = currentPdfDoc.numPages;
        totalPages.textContent = numPages;
        updatePageList(numPages);
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;

        splitFrom.value = '';
        splitTo.value = '';
        
        alert(`페이지 ${from}~${to}가 성공적으로 분할되었습니다.`);
    } catch (error) {
        console.error('PDF 분할 오류:', error);
        alert(`PDF 분할 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// 페이지 삭제
deleteBtn.addEventListener('click', async () => {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert(translations[currentLanguage].uploadFirst);
        return;
    }

    const pageNum = parseInt(deletePage.value);

    if (!pageNum || pageNum < 1 || pageNum > currentPdfDoc.numPages) {
        alert(translations[currentLanguage].invalidPageNumber);
        return;
    }

    if (currentPdfDoc.numPages === 1) {
        alert(translations[currentLanguage].lastPageCannotDelete);
        return;
    }

    if (!confirm(`페이지 ${pageNum}을(를) 삭제하시겠습니까?`)) {
        return;
    }

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
        }

        const { PDFDocument } = PDFLib;
        
        // currentPdfBytes를 안전하게 복사하여 사용
        const sourceBytes = new Uint8Array(currentPdfBytes);
        const sourceArrayBuffer = new ArrayBuffer(sourceBytes.length);
        const sourceView = new Uint8Array(sourceArrayBuffer);
        sourceView.set(sourceBytes);
        
        const pdfDoc = await PDFDocument.load(sourceArrayBuffer);
        
        // 페이지 삭제 (0부터 시작하는 인덱스)
        pdfDoc.removePage(pageNum - 1);

        // 업데이트 - saveAsBase64를 사용하여 안정적으로 변환
        const base64String = await pdfDoc.saveAsBase64();
        // Base64를 Uint8Array로 변환
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        savePdfBytes(bytes);
        
        // pdf.js에 전달
        const pdfArrayBuffer = new ArrayBuffer(currentPdfBytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(currentPdfBytes);
        
        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        
        const numPages = currentPdfDoc.numPages;
        totalPages.textContent = numPages;
        updatePageList(numPages);
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;

        deletePage.value = '';
        
        alert(`페이지 ${pageNum}이(가) 삭제되었습니다.`);
    } catch (error) {
        console.error('페이지 삭제 오류:', error);
        alert(`페이지 삭제 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// PDF 자르기 모달 열기
splitPdfBtn.addEventListener('click', () => {
    if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
        alert('PDF파일이 열려있지 않습니다.');
        return;
    }
    splitPdfModal.style.display = 'flex';
});

// PDF 자르기 모달 닫기
closeSplitPdfModal.addEventListener('click', () => {
    splitPdfModal.style.display = 'none';
});

cancelSplitPdfBtn.addEventListener('click', () => {
    splitPdfModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
splitPdfModal.addEventListener('click', (e) => {
    if (e.target === splitPdfModal) {
        splitPdfModal.style.display = 'none';
    }
});

// PDF 자르기 실행
executeSplitPdfBtn.addEventListener('click', async () => {
    const splitDirection = document.querySelector('input[name="splitDirection"]:checked').value;
    
    // 크롭 모드인 경우
    if (splitDirection === 'crop') {
        splitPdfModal.style.display = 'none';
        isCropMode = true;
        cropSelection = null;
        cropStartPos = null;
        
        // 크롭 모드 활성화 안내
        alert('PDF 미리보기에서 드래그하여 크롭할 영역을 선택하세요.\n선택 후 "크롭 적용" 버튼을 클릭하세요.');
        
        // 크롭 적용 버튼 추가
        if (!document.getElementById('applyCropBtn')) {
            const applyCropBtn = document.createElement('button');
            applyCropBtn.id = 'applyCropBtn';
            applyCropBtn.className = 'btn btn-success';
            applyCropBtn.textContent = '✂️ 크롭 적용';
            applyCropBtn.style.position = 'fixed';
            applyCropBtn.style.top = '20px';
            applyCropBtn.style.right = '20px';
            applyCropBtn.style.zIndex = '1001';
            applyCropBtn.style.display = 'none';
            document.body.appendChild(applyCropBtn);
            
            applyCropBtn.addEventListener('click', async () => {
                if (!cropSelection) {
                    alert('먼저 크롭할 영역을 선택하세요.');
                    return;
                }
                await applyCrop();
            });
        }
        
        document.getElementById('applyCropBtn').style.display = 'block';
        
        // 미리보기 다시 렌더링하여 크롭 모드 활성화
        await renderPdfPreview();
        return;
    }
    
    try {
        executeSplitPdfBtn.disabled = true;
        executeSplitPdfBtn.textContent = '처리 중...';

        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }

        const { PDFDocument } = PDFLib;
        const numPages = currentPdfDoc.numPages;

        // 새 PDF 문서 생성
        const newPdf = await PDFDocument.create();

        // 각 페이지를 자르기
        for (let i = 1; i <= numPages; i++) {
            const page = await currentPdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // 고해상도로 렌더링

            // 페이지를 Canvas로 렌더링
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            if (splitDirection === 'horizontal') {
                // 좌우 반으로 자르기
                const halfWidth = Math.floor(viewport.width / 2);

                // 왼쪽 절반 이미지 생성
                const leftCanvas = document.createElement('canvas');
                const leftContext = leftCanvas.getContext('2d');
                leftCanvas.width = halfWidth;
                leftCanvas.height = viewport.height;
                leftContext.drawImage(canvas, 0, 0, halfWidth, viewport.height, 0, 0, halfWidth, viewport.height);

                // 오른쪽 절반 이미지 생성
                const rightCanvas = document.createElement('canvas');
                const rightContext = rightCanvas.getContext('2d');
                rightCanvas.width = halfWidth;
                rightCanvas.height = viewport.height;
                rightContext.drawImage(canvas, halfWidth, 0, halfWidth, viewport.height, 0, 0, halfWidth, viewport.height);

                // Canvas를 PNG로 변환
                const leftImageData = leftCanvas.toDataURL('image/png');
                const rightImageData = rightCanvas.toDataURL('image/png');

                // Base64를 Uint8Array로 변환
                const leftBase64 = leftImageData.split(',')[1];
                const leftBinary = atob(leftBase64);
                const leftBytes = new Uint8Array(leftBinary.length);
                for (let j = 0; j < leftBinary.length; j++) {
                    leftBytes[j] = leftBinary.charCodeAt(j);
                }

                const rightBase64 = rightImageData.split(',')[1];
                const rightBinary = atob(rightBase64);
                const rightBytes = new Uint8Array(rightBinary.length);
                for (let j = 0; j < rightBinary.length; j++) {
                    rightBytes[j] = rightBinary.charCodeAt(j);
                }

                // 이미지를 PDF에 임베드
                const leftImage = await newPdf.embedPng(leftBytes);
                const rightImage = await newPdf.embedPng(rightBytes);

                // 왼쪽 페이지 추가
                const leftPage = newPdf.addPage([halfWidth, viewport.height]);
                leftPage.drawImage(leftImage, {
                    x: 0,
                    y: 0,
                    width: halfWidth,
                    height: viewport.height,
                });

                // 오른쪽 페이지 추가
                const rightPage = newPdf.addPage([halfWidth, viewport.height]);
                rightPage.drawImage(rightImage, {
                    x: 0,
                    y: 0,
                    width: halfWidth,
                    height: viewport.height,
                });
            } else {
                // 상하 반으로 자르기
                const halfHeight = Math.floor(viewport.height / 2);

                // 위쪽 절반 이미지 생성
                const topCanvas = document.createElement('canvas');
                const topContext = topCanvas.getContext('2d');
                topCanvas.width = viewport.width;
                topCanvas.height = halfHeight;
                topContext.drawImage(canvas, 0, 0, viewport.width, halfHeight, 0, 0, viewport.width, halfHeight);

                // 아래쪽 절반 이미지 생성
                const bottomCanvas = document.createElement('canvas');
                const bottomContext = bottomCanvas.getContext('2d');
                bottomCanvas.width = viewport.width;
                bottomCanvas.height = halfHeight;
                bottomContext.drawImage(canvas, 0, halfHeight, viewport.width, halfHeight, 0, 0, viewport.width, halfHeight);

                // Canvas를 PNG로 변환
                const topImageData = topCanvas.toDataURL('image/png');
                const bottomImageData = bottomCanvas.toDataURL('image/png');

                // Base64를 Uint8Array로 변환
                const topBase64 = topImageData.split(',')[1];
                const topBinary = atob(topBase64);
                const topBytes = new Uint8Array(topBinary.length);
                for (let j = 0; j < topBinary.length; j++) {
                    topBytes[j] = topBinary.charCodeAt(j);
                }

                const bottomBase64 = bottomImageData.split(',')[1];
                const bottomBinary = atob(bottomBase64);
                const bottomBytes = new Uint8Array(bottomBinary.length);
                for (let j = 0; j < bottomBinary.length; j++) {
                    bottomBytes[j] = bottomBinary.charCodeAt(j);
                }

                // 이미지를 PDF에 임베드
                const topImage = await newPdf.embedPng(topBytes);
                const bottomImage = await newPdf.embedPng(bottomBytes);

                // 위쪽 페이지 추가
                const topPage = newPdf.addPage([viewport.width, halfHeight]);
                topPage.drawImage(topImage, {
                    x: 0,
                    y: 0,
                    width: viewport.width,
                    height: halfHeight,
                });

                // 아래쪽 페이지 추가
                const bottomPage = newPdf.addPage([viewport.width, halfHeight]);
                bottomPage.drawImage(bottomImage, {
                    x: 0,
                    y: 0,
                    width: viewport.width,
                    height: halfHeight,
                });
            }
        }

        // PDF 저장
        const base64String = await newPdf.saveAsBase64();
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        savePdfBytes(bytes);

        // pdf.js에 전달
        const pdfArrayBuffer = new ArrayBuffer(bytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(bytes);

        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        pdfPages = [];

        const newNumPages = currentPdfDoc.numPages;
        totalPages.textContent = newNumPages;

        // 페이지 목록 생성
        updatePageList(newNumPages);

        // PDF 미리보기 렌더링
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;

        // 모달 닫기
        splitPdfModal.style.display = 'none';

        const directionText = splitDirection === 'horizontal' ? '좌우' : '상하';
        alert(`PDF가 ${directionText}로 분할되었습니다. ${numPages}페이지가 ${newNumPages}페이지로 변경되었습니다.`);

    } catch (error) {
        console.error('PDF 자르기 오류:', error);
        alert(`PDF 자르기 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
        executeSplitPdfBtn.disabled = false;
        executeSplitPdfBtn.textContent = '확인';
    }
});

// 페이지 회전하기 모달 열기
if (rotatePdfBtn) {
    rotatePdfBtn.addEventListener('click', () => {
        if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
            alert(translations[currentLanguage].pdfNotOpen);
            return;
        }
        rotatePdfModal.style.display = 'block';
        
        // 페이지 선택 라디오 버튼에 따라 입력 필드 표시/숨김
        const pageSelectionRadios = document.querySelectorAll('input[name="rotatePageSelection"]');
        const rotatePageInputs = document.getElementById('rotatePageInputs');
        const rotatePageRange = document.getElementById('rotatePageRange');
        
        pageSelectionRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'all') {
                    rotatePageRange.style.display = 'none';
                } else {
                    rotatePageRange.style.display = 'block';
                    if (radio.value === 'range') {
                        rotatePageRange.placeholder = '예: 1-3 또는 1,3,5';
                    } else if (radio.value === 'specific') {
                        rotatePageRange.placeholder = '예: 1,3,5';
                    }
                }
            });
        });
    });
}

// 페이지 회전하기 모달 닫기
if (closeRotatePdfModal) {
    closeRotatePdfModal.addEventListener('click', () => {
        rotatePdfModal.style.display = 'none';
    });
}

if (cancelRotatePdfBtn) {
    cancelRotatePdfBtn.addEventListener('click', () => {
        rotatePdfModal.style.display = 'none';
    });
}


// PDF 다운로드
downloadBtn.addEventListener('click', () => {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert(translations[currentLanguage].noPdfToDownload);
        return;
    }

    const blob = new Blob([currentPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edited_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// JPG로 다운로드
downloadJpgBtn.addEventListener('click', async () => {
    if (!currentPdfDoc) {
        alert(translations[currentLanguage].noPdfToDownload);
        return;
    }

    try {
        const numPages = currentPdfDoc.numPages;
        const timestamp = Date.now();
        
        // 진행 상황 표시
        downloadJpgBtn.disabled = true;
        downloadJpgBtn.textContent = '처리 중...';
        
        // 각 페이지를 JPG로 변환하여 다운로드
        for (let i = 1; i <= numPages; i++) {
            const page = await currentPdfDoc.getPage(i);
            
            // 원본 PDF의 DPI를 고려한 고해상도 렌더링
            // PDF의 기본 DPI는 72이므로, 300 DPI로 변환하려면 약 4.17배 스케일 필요
            // 하지만 너무 크면 메모리 문제가 발생할 수 있으므로 4배로 설정
            const scale = 4.0;
            const viewport = page.getViewport({ scale: scale });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // 고품질 렌더링 설정
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Canvas를 JPG로 변환 (최고 품질)
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `page_${i}_${timestamp}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/jpeg', 1.0); // 100% 품질
            
            // 다운로드 간 약간의 지연 (브라우저가 각 파일을 처리할 시간 제공)
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        downloadJpgBtn.disabled = false;
        downloadJpgBtn.textContent = '🖼️ JPG로 다운로드';
        
        alert(`${numPages}개의 페이지가 고해상도 JPG 파일로 다운로드되었습니다.`);
    } catch (error) {
        console.error('JPG 다운로드 오류:', error);
        downloadJpgBtn.disabled = false;
        downloadJpgBtn.textContent = '🖼️ JPG로 다운로드';
        alert(`JPG 다운로드 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// 텍스트로 다운로드
downloadTextBtn.addEventListener('click', async () => {
    if (!currentPdfDoc) {
        alert(translations[currentLanguage].noPdfToDownload);
        return;
    }

    try {
        const numPages = currentPdfDoc.numPages;
        
        // 진행 상황 표시
        downloadTextBtn.disabled = true;
        downloadTextBtn.textContent = '텍스트 추출 중...';
        
        // 모든 페이지에서 텍스트 추출
        let allText = '';
        let hasText = false;
        
        for (let i = 1; i <= numPages; i++) {
            const page = await currentPdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            
            // 페이지별 텍스트 추출
            let pageText = '';
            textContent.items.forEach((textItem) => {
                if (textItem.str && textItem.str.trim()) {
                    pageText += textItem.str + ' ';
                    hasText = true;
                }
            });
            
            if (pageText.trim()) {
                allText += `=== 페이지 ${i} ===\n\n${pageText.trim()}\n\n\n`;
            }
            
            // 진행 상황 업데이트
            downloadTextBtn.textContent = `텍스트 추출 중... (${i}/${numPages})`;
        }
        
        // 텍스트가 없는 경우 경고
        if (!hasText || !allText.trim()) {
            downloadTextBtn.disabled = false;
            downloadTextBtn.textContent = '📝 텍스트로 다운로드';
            alert(translations[currentLanguage].imagePdfOcr);
            return;
        }
        
        // 텍스트 파일로 다운로드
        const blob = new Blob([allText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pdf_text_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        downloadTextBtn.disabled = false;
        downloadTextBtn.textContent = '📝 텍스트로 다운로드';
        
        alert('텍스트 파일이 다운로드되었습니다.');
    } catch (error) {
        console.error('텍스트 다운로드 오류:', error);
        downloadTextBtn.disabled = false;
        downloadTextBtn.textContent = '📝 텍스트로 다운로드';
        alert(`텍스트 다운로드 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// 페이지 회전하기 모달 열기
if (rotatePdfBtn) {
    rotatePdfBtn.addEventListener('click', () => {
        if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
            alert(translations[currentLanguage].pdfNotOpen);
            return;
        }
        rotatePdfModal.style.display = 'block';
        
        // 페이지 선택 라디오 버튼에 따라 입력 필드 표시/숨김
        const pageSelectionRadios = document.querySelectorAll('input[name="rotatePageSelection"]');
        const rotatePageInputs = document.getElementById('rotatePageInputs');
        const rotatePageRange = document.getElementById('rotatePageRange');
        
        pageSelectionRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'all') {
                    rotatePageRange.style.display = 'none';
                } else {
                    rotatePageRange.style.display = 'block';
                    if (radio.value === 'range') {
                        rotatePageRange.placeholder = '예: 1-3 또는 1,3,5';
                    } else if (radio.value === 'specific') {
                        rotatePageRange.placeholder = '예: 1,3,5';
                    }
                }
            });
        });
    });
}

// 페이지 회전하기 모달 닫기
if (closeRotatePdfModal) {
    closeRotatePdfModal.addEventListener('click', () => {
        rotatePdfModal.style.display = 'none';
    });
}

if (cancelRotatePdfBtn) {
    cancelRotatePdfBtn.addEventListener('click', () => {
        rotatePdfModal.style.display = 'none';
    });
}

// 페이지 회전하기 실행
if (executeRotatePdfBtn) {
    executeRotatePdfBtn.addEventListener('click', async () => {
        if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
            alert(translations[currentLanguage].noPdfData);
            return;
        }

        try {
            const numPages = currentPdfDoc.numPages;
            const pageSelection = document.querySelector('input[name="rotatePageSelection"]:checked').value;
            const rotateDirection = parseInt(document.querySelector('input[name="rotateDirection"]:checked').value);
            const rotatePageRange = document.getElementById('rotatePageRange');
            
            // 회전할 페이지 목록 결정
            let pagesToRotate = [];
            
            if (pageSelection === 'all') {
                // 전체 페이지
                pagesToRotate = Array.from({ length: numPages }, (_, i) => i);
            } else if (pageSelection === 'range' || pageSelection === 'specific') {
                // 페이지 범위 또는 특정 페이지
                const input = rotatePageRange.value.trim();
                if (!input) {
                    alert('페이지를 입력하세요.');
                    return;
                }
                
                // 입력 파싱 (예: "1-3" 또는 "1,3,5" 또는 "1-3,5,7-9")
                const parts = input.split(',');
                for (const part of parts) {
                    const trimmed = part.trim();
                    if (trimmed.includes('-')) {
                        // 범위 (예: "1-3")
                        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim()));
                        if (isNaN(start) || isNaN(end) || start < 1 || end > numPages || start > end) {
                            alert(`잘못된 페이지 범위입니다: ${trimmed}`);
                            return;
                        }
                        for (let i = start; i <= end; i++) {
                            const pageIndex = i - 1; // 0-based index
                            if (!pagesToRotate.includes(pageIndex)) {
                                pagesToRotate.push(pageIndex);
                            }
                        }
                    } else {
                        // 단일 페이지 (예: "1")
                        const pageNum = parseInt(trimmed);
                        if (isNaN(pageNum) || pageNum < 1 || pageNum > numPages) {
                            alert(`잘못된 페이지 번호입니다: ${trimmed}`);
                            return;
                        }
                        const pageIndex = pageNum - 1; // 0-based index
                        if (!pagesToRotate.includes(pageIndex)) {
                            pagesToRotate.push(pageIndex);
                        }
                    }
                }
                
                if (pagesToRotate.length === 0) {
                    alert('회전할 페이지를 선택하세요.');
                    return;
                }
            }
            
            executeRotatePdfBtn.disabled = true;
            executeRotatePdfBtn.textContent = '처리 중...';
            
            if (typeof PDFLib === 'undefined') {
                throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
            }

            const { PDFDocument } = PDFLib;
            
            // currentPdfBytes를 안전하게 복사하여 사용
            const sourceBytes = new Uint8Array(currentPdfBytes);
            const sourceArrayBuffer = new ArrayBuffer(sourceBytes.length);
            const sourceView = new Uint8Array(sourceArrayBuffer);
            sourceView.set(sourceBytes);
            
            const sourcePdf = await PDFDocument.load(sourceArrayBuffer);
            const newPdf = await PDFDocument.create();
            
            // 모든 페이지를 한 번에 복사
            const allPageIndices = Array.from({ length: numPages }, (_, i) => i);
            const copiedPages = await newPdf.copyPages(sourcePdf, allPageIndices);
            
            // 복사된 페이지들을 추가하고 선택된 페이지만 회전
            copiedPages.forEach((copiedPage, i) => {
                const newPage = newPdf.addPage(copiedPage);
                
                // 회전할 페이지인 경우 회전 적용
                if (pagesToRotate.includes(i)) {
                    // 현재 회전 각도 가져오기
                    const currentRotation = newPage.getRotation().angle;
                    // 새로운 회전 각도 계산
                    const newRotationAngle = (currentRotation + rotateDirection) % 360;
                    // pdf-lib의 degrees 함수를 사용하여 Rotation 객체 생성
                    newPage.setRotation(PDFLib.degrees(newRotationAngle));
                }
            });
            
            // 저장
            const base64String = await newPdf.saveAsBase64();
            const binaryString = atob(base64String);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            savePdfBytes(bytes);
            
            // pdf.js에 전달
            const pdfArrayBuffer = new ArrayBuffer(bytes.length);
            const pdfView = new Uint8Array(pdfArrayBuffer);
            pdfView.set(bytes);
            
            currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
            pdfPages = [];
            
            const newNumPages = currentPdfDoc.numPages;
            totalPages.textContent = newNumPages;
            
            updatePageList(newNumPages);
            await renderPdfPreview();
            
            downloadBtn.disabled = false;
            downloadJpgBtn.disabled = false;
            downloadTextBtn.disabled = false;
            splitPdfBtn.disabled = false;
            rotatePdfBtn.disabled = false;
            
            // 모달 닫기
            rotatePdfModal.style.display = 'none';
            
            alert(`${pagesToRotate.length}개의 페이지가 ${rotateDirection}도 회전되었습니다.`);
        } catch (error) {
            console.error('페이지 회전 오류:', error);
            alert(`페이지 회전 중 오류가 발생했습니다: ${error.message || error}`);
        } finally {
            executeRotatePdfBtn.disabled = false;
            executeRotatePdfBtn.textContent = '적용';
        }
    });
}

// 사용법 모달 열기
if (helpBtn) {
    helpBtn.addEventListener('click', () => {
        if (helpModal) {
            helpModal.style.display = 'flex';
        }
    });
}

// 사용법 모달 닫기
if (closeHelpModal) {
    closeHelpModal.addEventListener('click', () => {
        if (helpModal) {
            helpModal.style.display = 'none';
        }
    });
}

// 사용법 모달 외부 클릭 시 닫기
if (helpModal) {
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });
}

// 이미지로 PDF 만들기 모달 열기
if (imageToPdfBtn) {
    imageToPdfBtn.addEventListener('click', () => {
        console.log('이미지로 PDF 만들기 버튼 클릭됨');
        if (!imageToPdfModal) {
            console.error('imageToPdfModal을 찾을 수 없습니다.');
            return;
        }
        imageToPdfModal.style.display = 'flex';
        // 파일 입력 초기화
        if (imageFiles) imageFiles.value = '';
        if (imageFilesInfo) imageFilesInfo.textContent = '';
        if (imagePreviewList) imagePreviewList.innerHTML = '';
    });
} else {
    console.error('imageToPdfBtn을 찾을 수 없습니다.');
}

// 이미지로 PDF 만들기 모달 닫기
closeImageToPdfModal.addEventListener('click', () => {
    imageToPdfModal.style.display = 'none';
});

cancelImageToPdfBtn.addEventListener('click', () => {
    imageToPdfModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
imageToPdfModal.addEventListener('click', (e) => {
    if (e.target === imageToPdfModal) {
        imageToPdfModal.style.display = 'none';
    }
});

// 이미지 파일 선택 시 정보 표시
imageFiles.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
        imageFilesInfo.textContent = '';
        imagePreviewList.innerHTML = '';
        return;
    }

    // 이미지 파일만 필터링
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        alert(translations[currentLanguage].imageFilesOnly);
        e.target.value = '';
        return;
    }

    if (imageFiles.length !== files.length) {
        alert('일부 파일이 이미지가 아니어서 제외되었습니다.');
    }

    imageFilesInfo.textContent = `${imageFiles.length}개의 이미지 파일 선택됨`;
    imageFilesInfo.style.color = '#28a745';

    // 이미지 미리보기
    imagePreviewList.innerHTML = '';
    imageFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'image-preview-item';
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="${file.name}" />
                <span>${file.name}</span>
            `;
            imagePreviewList.appendChild(previewDiv);
        };
        reader.readAsDataURL(file);
    });
});

// 이미지 업로드 및 PDF 생성
uploadImagesBtn.addEventListener('click', async () => {
    const files = Array.from(imageFiles.files).filter(file => file.type.startsWith('image/'));
    
    if (files.length === 0) {
        alert(translations[currentLanguage].selectImages);
        return;
    }

    try {
        uploadImagesBtn.disabled = true;
        uploadImagesBtn.textContent = 'PDF 생성 중...';

        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }

        const { PDFDocument } = PDFLib;

        // 새 PDF 문서 생성
        const pdfDoc = await PDFDocument.create();

        // 각 이미지를 PDF 페이지로 추가
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // 이미지 타입에 따라 적절한 메서드 사용
            let image;
            if (file.type === 'image/png') {
                image = await pdfDoc.embedPng(uint8Array);
            } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                image = await pdfDoc.embedJpg(uint8Array);
            } else {
                // 다른 이미지 형식은 PNG로 변환 시도
                try {
                    // Canvas를 사용하여 이미지 변환
                    const img = new Image();
                    const imgUrl = URL.createObjectURL(file);
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                        img.src = imgUrl;
                    });

                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    const pngData = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                    const pngArrayBuffer = await pngData.arrayBuffer();
                    const pngUint8Array = new Uint8Array(pngArrayBuffer);
                    image = await pdfDoc.embedPng(pngUint8Array);
                    
                    URL.revokeObjectURL(imgUrl);
                } catch (error) {
                    console.warn(`이미지 ${file.name} 변환 실패, 건너뜀:`, error);
                    continue;
                }
            }

            // 새 페이지 추가
            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            
            // 이미지 크기에 맞게 페이지 크기 조정
            const imageDims = image.scale(1);
            const imageAspectRatio = imageDims.width / imageDims.height;
            const pageAspectRatio = width / height;

            let finalWidth, finalHeight;
            if (imageAspectRatio > pageAspectRatio) {
                // 이미지가 더 넓음
                finalWidth = width;
                finalHeight = width / imageAspectRatio;
            } else {
                // 이미지가 더 높음
                finalHeight = height;
                finalWidth = height * imageAspectRatio;
            }

            // 페이지 크기 조정
            page.setSize(finalWidth, finalHeight);

            // 이미지를 페이지에 그리기
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: finalWidth,
                height: finalHeight,
            });
        }

        // PDF 저장
        const base64String = await pdfDoc.saveAsBase64();
        const binaryString = atob(base64String);
        const mergedBytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            mergedBytes[i] = binaryString.charCodeAt(i);
        }

        // currentPdfBytes에 저장
        savePdfBytes(mergedBytes);

        // pdf.js에 전달하여 미리보기
        const pdfArrayBuffer = new ArrayBuffer(mergedBytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(mergedBytes);

        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        pdfPages = [];

        const numPages = currentPdfDoc.numPages;
        totalPages.textContent = numPages;

        // 페이지 목록 생성
        updatePageList(numPages);

        // PDF 미리보기 렌더링
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;

        // 파일 정보 업데이트
        fileInfo.innerHTML = `
            <strong>파일명:</strong> ${files.length}개의 이미지로 생성된 PDF<br>
            <strong>총 페이지:</strong> ${numPages}페이지
        `;

        // 모달 닫기
        imageToPdfModal.style.display = 'none';
        
        alert(`${files.length}개의 이미지로 PDF가 생성되었습니다. 총 ${numPages}페이지입니다.`);

    } catch (error) {
        console.error('이미지로 PDF 만들기 오류:', error);
        alert(`이미지로 PDF 만들기 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
        uploadImagesBtn.disabled = false;
        uploadImagesBtn.textContent = '업로드';
    }
});

// PDF 합치기 모달 열기
mergeBtn.addEventListener('click', () => {
    mergeModal.style.display = 'flex';
    // 파일 입력 초기화
    mergeFile1.value = '';
    mergeFile2.value = '';
    mergeFile1Info.textContent = '';
    mergeFile2Info.textContent = '';
});

// PDF 합치기 모달 닫기
closeMergeModal.addEventListener('click', () => {
    mergeModal.style.display = 'none';
});

cancelMergeBtn.addEventListener('click', () => {
    mergeModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
mergeModal.addEventListener('click', (e) => {
    if (e.target === mergeModal) {
        mergeModal.style.display = 'none';
    }
});

// 파일 선택 시 정보 표시
mergeFile1.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        mergeFile1Info.textContent = `선택됨: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        mergeFile1Info.style.color = '#28a745';
    } else {
        mergeFile1Info.textContent = '';
    }
});

mergeFile2.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        mergeFile2Info.textContent = `선택됨: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        mergeFile2Info.style.color = '#28a745';
    } else {
        mergeFile2Info.textContent = '';
    }
});

// PDF 합치기 실행
executeMergeBtn.addEventListener('click', async () => {
    const file1 = mergeFile1.files[0];
    const file2 = mergeFile2.files[0];

    if (!file1 || !file2) {
        alert(translations[currentLanguage].selectTwoPdfs);
        return;
    }

    if (file1.type !== 'application/pdf' || file2.type !== 'application/pdf') {
        alert('PDF 파일만 선택할 수 있습니다.');
        return;
    }

    try {
        executeMergeBtn.disabled = true;
        executeMergeBtn.textContent = '합치는 중...';

        // 두 PDF 파일 읽기
        const arrayBuffer1 = await file1.arrayBuffer();
        const arrayBuffer2 = await file2.arrayBuffer();
        
        const bytes1 = new Uint8Array(arrayBuffer1);
        const bytes2 = new Uint8Array(arrayBuffer2);

        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }

        const { PDFDocument } = PDFLib;

        // 두 PDF 문서 로드
        const pdfDoc1 = await PDFDocument.load(bytes1);
        const pdfDoc2 = await PDFDocument.load(bytes2);

        // 새 PDF 문서 생성
        const mergedPdf = await PDFDocument.create();

        // 첫 번째 PDF의 모든 페이지 복사
        const pages1 = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
        pages1.forEach((page) => mergedPdf.addPage(page));

        // 두 번째 PDF의 모든 페이지 복사
        const pages2 = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
        pages2.forEach((page) => mergedPdf.addPage(page));

        // 합쳐진 PDF 저장
        const base64String = await mergedPdf.saveAsBase64();
        const binaryString = atob(base64String);
        const mergedBytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            mergedBytes[i] = binaryString.charCodeAt(i);
        }

        // currentPdfBytes에 저장
        savePdfBytes(mergedBytes);

        // pdf.js에 전달하여 미리보기
        const pdfArrayBuffer = new ArrayBuffer(mergedBytes.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(mergedBytes);

        currentPdfDoc = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise;
        pdfPages = [];

        const numPages = currentPdfDoc.numPages;
        totalPages.textContent = numPages;

        // 페이지 목록 생성
        updatePageList(numPages);

        // PDF 미리보기 렌더링
        await renderPdfPreview();

        downloadBtn.disabled = false;
        downloadJpgBtn.disabled = false;
        downloadTextBtn.disabled = false;

        // 파일 정보 업데이트
        fileInfo.innerHTML = `
            <strong>파일명:</strong> ${file1.name} + ${file2.name}<br>
            <strong>총 페이지:</strong> ${numPages}페이지
        `;

        // 모달 닫기
        mergeModal.style.display = 'none';
        
        alert(`PDF 합치기 완료! 총 ${numPages}페이지가 생성되었습니다.`);

    } catch (error) {
        console.error('PDF 합치기 오류:', error);
        alert(`PDF 합치기 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
        executeMergeBtn.disabled = false;
        executeMergeBtn.textContent = '합치기';
    }
});

// 초기화
resetBtn.addEventListener('click', () => {
    if (confirm('모든 작업을 초기화하시겠습니까?')) {
        currentPdfDoc = null;
        currentPdfBytes = null;
        pdfPages = [];
        
        pdfInput.value = '';
        fileInfo.innerHTML = '';
        totalPages.textContent = '0';
        pageList.innerHTML = '';
        const t = translations[currentLanguage];
        pdfPreview.innerHTML = `<div class="empty-state"><p>📄 ${t.uploadPdf}</p></div>`;
        
        splitFrom.value = '';
        splitTo.value = '';
        deletePage.value = '';

        downloadBtn.disabled = true;
        downloadJpgBtn.disabled = true;
        downloadTextBtn.disabled = true;
        splitPdfBtn.disabled = true;
    }
});

