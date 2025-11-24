// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// 라이브러리 로드 확인
window.addEventListener('load', () => {
    if (typeof PDFLib === 'undefined') {
        console.error('PDFLib이 로드되지 않았습니다.');
        alert('PDF 편집 라이브러리 로드에 실패했습니다. 페이지를 새로고침해주세요.');
    } else {
        console.log('PDFLib이 성공적으로 로드되었습니다.');
    }
});

// 전역 변수
let currentPdfDoc = null;
let currentPdfBytes = null;
let pdfPages = [];

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
const downloadBtn = document.getElementById('downloadBtn');
const downloadJpgBtn = document.getElementById('downloadJpgBtn');
const downloadPptBtn = document.getElementById('downloadPptBtn');
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

// PDF 파일 업로드
pdfInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
    }

    // 기존 상태 초기화
    currentPdfDoc = null;
    currentPdfBytes = null;
    pdfPages = [];
    
    // UI 초기화
    pdfPreview.innerHTML = '<div class="empty-state"><p>📄 PDF 파일을 업로드하세요</p></div>';
    pageList.innerHTML = '';
    totalPages.textContent = '0';
    splitFrom.value = '';
    splitTo.value = '';
    deletePage.value = '';
    downloadBtn.disabled = true;
    downloadJpgBtn.disabled = true;
    downloadPptBtn.disabled = true;
    applyPageOrderBtn.style.display = 'none';

    fileInfo.innerHTML = `
        <strong>파일명:</strong> ${file.name}<br>
        <strong>크기:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB
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
        downloadPptBtn.disabled = false;
        
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
        alert('PDF 파일을 로드하는 중 오류가 발생했습니다.');
    }
});

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
        alert('PDF 데이터가 없습니다.');
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
        alert('PDF 데이터가 없습니다.');
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

        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = `페이지 ${i}`;

        pageDiv.appendChild(canvas);
        pageDiv.appendChild(pageNumber);
        pdfPreview.appendChild(pageDiv);
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
        alert('올바른 페이지 범위를 입력하세요.');
        return;
    }

    if (to > currentPdfDoc.numPages) {
        alert(`총 페이지 수(${currentPdfDoc.numPages})를 초과할 수 없습니다.`);
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
        alert('먼저 PDF 파일을 업로드하세요.');
        return;
    }

    const pageNum = parseInt(deletePage.value);

    if (!pageNum || pageNum < 1 || pageNum > currentPdfDoc.numPages) {
        alert('올바른 페이지 번호를 입력하세요.');
        return;
    }

    if (currentPdfDoc.numPages === 1) {
        alert('마지막 페이지는 삭제할 수 없습니다.');
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

        deletePage.value = '';
        
        alert(`페이지 ${pageNum}이(가) 삭제되었습니다.`);
    } catch (error) {
        console.error('페이지 삭제 오류:', error);
        alert(`페이지 삭제 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

// PDF 다운로드
downloadBtn.addEventListener('click', () => {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert('다운로드할 PDF가 없습니다.');
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
        alert('다운로드할 PDF가 없습니다.');
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

// PPT로 다운로드
downloadPptBtn.addEventListener('click', async () => {
    if (!currentPdfDoc) {
        alert('다운로드할 PDF가 없습니다.');
        return;
    }

    if (typeof PptxGenJS === 'undefined') {
        alert('PPT 생성 라이브러리가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }

    try {
        const numPages = currentPdfDoc.numPages;
        
        // 진행 상황 표시
        downloadPptBtn.disabled = true;
        downloadPptBtn.textContent = 'PPT 생성 중...';
        
        // 새 PPT 프레젠테이션 생성
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_WIDE'; // 16:9 비율
        
        // PPT 슬라이드 크기 (인치 단위) - LAYOUT_WIDE는 10 x 5.625 인치
        const pptWidth = 10;
        const pptHeight = 5.625;
        
        // 각 페이지를 텍스트로 변환하여 PPT 슬라이드에 추가
        for (let i = 1; i <= numPages; i++) {
            const page = await currentPdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 1.0 });
            
            // 텍스트 내용 추출
            const textContent = await page.getTextContent();
            
            // 새 슬라이드 추가
            const slide = pptx.addSlide();
            
            // PDF 페이지 크기
            const pdfWidth = viewport.width;
            const pdfHeight = viewport.height;
            
            // PDF 좌표를 PPT 좌표로 변환하는 비율
            const scaleX = pptWidth / pdfWidth;
            const scaleY = pptHeight / pdfHeight;
            
            // 텍스트 항목들을 처리
            const textItems = [];
            textContent.items.forEach((textItem) => {
                if (textItem.str && textItem.str.trim()) {
                    try {
                        const tx = textItem.transform;
                        const x = tx[4];
                        const fontSize = Math.abs(tx[0]) || 12;
                        const fontHeight = Math.abs(tx[3]) || fontSize;
                        // PDF 좌표계는 하단이 0이므로 Y 좌표 변환
                        const y = pdfHeight - tx[5] - fontHeight;
                        
                        // PPT 좌표로 변환 (인치 단위)
                        let pptX = x * scaleX;
                        let pptY = y * scaleY;
                        const pptFontSize = Math.max(8, Math.min(72, fontSize * scaleY * 0.75));
                        
                        // 좌표 범위 검증 (슬라이드 범위 내로 제한)
                        pptX = Math.max(0, Math.min(pptWidth - 0.5, pptX));
                        pptY = Math.max(0, Math.min(pptHeight - 0.5, pptY));
                        
                        // 텍스트 너비 계산
                        const textWidth = Math.min(pptWidth - pptX, (textItem.str.length * pptFontSize * 0.1));
                        const textHeight = Math.min(pptHeight - pptY, fontHeight * scaleY);
                        
                        if (textWidth > 0 && textHeight > 0 && pptX >= 0 && pptY >= 0) {
                            textItems.push({
                                text: textItem.str,
                                x: pptX,
                                y: pptY,
                                w: textWidth,
                                h: textHeight,
                                fontSize: pptFontSize,
                                bold: textItem.fontName && textItem.fontName.includes('Bold'),
                                italic: textItem.fontName && textItem.fontName.includes('Italic')
                            });
                        }
                    } catch (error) {
                        console.warn('텍스트 항목 처리 실패:', error, textItem);
                    }
                }
            });
            
            // 텍스트 항목들을 슬라이드에 추가 (최대 500개로 제한하여 안정성 확보)
            const maxItems = Math.min(500, textItems.length);
            for (let j = 0; j < maxItems; j++) {
                const item = textItems[j];
                try {
                    slide.addText(item.text, {
                        x: item.x,
                        y: item.y,
                        w: item.w,
                        h: item.h,
                        fontSize: item.fontSize,
                        fontFace: 'Arial',
                        bold: item.bold || false,
                        italic: item.italic || false,
                        color: '000000',
                        align: 'left',
                        valign: 'top',
                        wrap: false
                    });
                } catch (error) {
                    console.warn('텍스트 추가 실패:', error, item);
                }
            }
            
            // 텍스트가 없는 경우 빈 슬라이드라도 유지
            if (textItems.length === 0) {
                slide.addText(`페이지 ${i}`, {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 1,
                    fontSize: 24,
                    color: '666666'
                });
            }
            
            // 진행 상황 업데이트
            downloadPptBtn.textContent = `PPT 생성 중... (${i}/${numPages})`;
        }
        
        // PPT 파일 다운로드
        const timestamp = Date.now();
        await pptx.writeFile({ fileName: `pdf_to_ppt_${timestamp}.pptx` });
        
        downloadPptBtn.disabled = false;
        downloadPptBtn.textContent = '📊 PPT로 다운로드';
        
        alert(`${numPages}개의 페이지가 텍스트 형태로 PPT 파일로 다운로드되었습니다.`);
    } catch (error) {
        console.error('PPT 다운로드 오류:', error);
        downloadPptBtn.disabled = false;
        downloadPptBtn.textContent = '📊 PPT로 다운로드';
        alert(`PPT 다운로드 중 오류가 발생했습니다: ${error.message || error}`);
    }
});

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
        alert('이미지 파일만 선택할 수 있습니다.');
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
        alert('이미지 파일을 선택해주세요.');
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
        downloadPptBtn.disabled = false;

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
        alert('두 개의 PDF 파일을 모두 선택해주세요.');
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
        downloadPptBtn.disabled = false;

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
        pdfPreview.innerHTML = '<div class="empty-state"><p>📄 PDF 파일을 업로드하세요</p></div>';
        
        splitFrom.value = '';
        splitTo.value = '';
        deletePage.value = '';

        downloadBtn.disabled = true;
        downloadJpgBtn.disabled = true;
        downloadPptBtn.disabled = true;
    }
});

