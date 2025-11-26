// PDF.js 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Help 모달 다국어 지원
let helpCurrentLang = 'en';

const helpTranslations = {
    en: {
        title: "📖 Help",
        fileUpload: {
            title: "📁 File Upload",
            description: "Upload a PDF file to start editing.",
            items: [
                "Click the \"Select PDF File\" button in the top left.",
                "Select the PDF file you want to edit.",
                "Once uploaded, PDF pages will be displayed in the preview area on the right.",
                "File information (file name, size) and total page count will be displayed on the left.",
                "Uploading a new PDF file will reset any existing edits."
            ]
        },
        reorderPages: {
            title: "📑 Reorder Pages",
            description: "You can change the order of PDF pages by dragging and dropping.",
            items: [
                "In the \"Reorder Pages\" section on the left, find the handle icon (☰) next to each page number.",
                "Click and drag the handle of the page you want to move to the desired position.",
                "For example, to move page 1 to position 3, drag page 1's handle to position 3.",
                "After changing the order, an \"Apply\" button will appear.",
                "Click the \"Apply\" button to apply the new order to the PDF and update the preview on the right.",
                "Note: Page numbers will not change until you click \"Apply\". The changes are only applied after clicking \"Apply\"."
            ]
        },
        createPdfFromImages: {
            title: "🖼️ Create PDF from Images",
            description: "You can convert multiple image files into a single PDF file.",
            items: [
                "Click the \"Create PDF from Images\" button to open a modal window.",
                "In the modal, click \"Select Files\" to choose image files. (Multiple selection available)",
                "Supported image formats: JPG, PNG, GIF, BMP, and other common image formats",
                "The selected image file list will be displayed, and you can preview each image.",
                "Click the \"Upload\" button to convert the selected images into PDF pages in order.",
                "The converted PDF will be displayed in the preview area on the right and can be edited immediately.",
                "The image order will become the PDF page order."
            ]
        },
        splitPdf: {
            title: "✂️ Split PDF",
            description: "You can extract a specific page range from a PDF file to create a new PDF file.",
            items: [
                "In the \"Split PDF\" section on the left, enter the start page and end page.",
                "For example, to split pages 3 to 10, enter 3 in the start page and 10 in the end page.",
                "Click the \"Split\" button to create a new PDF containing only the selected page range.",
                "The split PDF will be displayed in the preview area on the right, replacing the original PDF.",
                "Note: Split operations cannot be undone, so download the original file first if you want to preserve it.",
                "After splitting, page numbers will restart from 1."
            ]
        },
        cropPdf: {
            title: "✂️ Crop PDF",
            description: "You can crop PDF pages or extract specific areas. There are three methods.",
            items: [
                "<strong>Split horizontally (left/right)</strong>:",
                "Click the \"Crop PDF\" button and select the \"Split horizontally (left/right)\" option.",
                "Each page will be divided left and right at the center.",
                "For example, if there was originally 1 page, the left half becomes page 1 and the right half becomes page 2.",
                "This applies to all pages equally.",
                "<strong>Split vertically (top/bottom)</strong>:",
                "Click the \"Crop PDF\" button and select the \"Split vertically (top/bottom)\" option.",
                "Each page will be divided top and bottom at the center.",
                "For example, if there was originally 1 page, the top half becomes page 1 and the bottom half becomes page 2.",
                "This applies to all pages equally.",
                "<strong>Crop</strong>:",
                "Click the \"Crop PDF\" button, select the \"Crop\" option, and click \"Confirm\".",
                "Drag your mouse in the PDF preview area on the right to select the desired area.",
                "The selected area will be displayed with a blue dashed line.",
                "After selecting the area, click the \"✂️ Apply Crop\" button that appears in the top right.",
                "The selected area will be applied to all pages at the same position.",
                "For example, if you select the top-left area on page 1, the same position on all pages will be cropped.",
                "Crop operations cannot be undone, so select carefully."
            ]
        },
        mergePdf: {
            title: "🔗 Merge PDF",
            description: "You can merge two PDF files into one.",
            items: [
                "Click the \"Merge PDF\" button to open a modal window.",
                "In the modal, select the first PDF file and the second PDF file.",
                "The selected file information (file name, size) will be displayed.",
                "Click the \"Merge\" button to merge the two PDF files into one.",
                "The merged PDF will have the pages from the first PDF followed by the pages from the second PDF.",
                "For example, if the first PDF has 5 pages and the second PDF has 3 pages, the merged PDF will have 8 pages total.",
                "The merged PDF will be displayed in the preview area on the right and can be edited immediately.",
                "Note: After merging, the original PDFs will be replaced, so download them first if needed."
            ]
        },
        rotatePages: {
            title: "🔄 Rotate Pages",
            description: "You can rotate PDF pages by 90°, 180°, or 270°.",
            items: [
                "Click the \"Rotate Pages\" button to open a modal window.",
                "Select pages to rotate:",
                "<strong>All Pages</strong>: Rotates all pages in the PDF.",
                "<strong>Page Range</strong>: Rotates a specific range of pages. e.g., \"1-5\" (pages 1 to 5), \"3-7\" (pages 3 to 7)",
                "<strong>Specific Pages</strong>: Select individual pages to rotate. e.g., \"1,3,5\" (pages 1, 3, 5), \"2,4,6,8\" (pages 2, 4, 6, 8)",
                "If you select page range or specific pages, enter page numbers in the input field:",
                "Range input: \"1-3\" (pages 1 to 3), \"5-10\" (pages 5 to 10)",
                "Individual page input: \"1,3,5\" (comma-separated), \"2,4,6,8\"",
                "Mixed input: \"1-3,5,7-9\" (combining ranges and individual pages)",
                "Select rotation direction:",
                "<strong>90° (Clockwise)</strong>: Rotates the page 90° to the right.",
                "<strong>180°</strong>: Rotates the page 180° (flips it).",
                "<strong>270° (Counter-clockwise)</strong>: Rotates the page 90° to the left (or 270° to the right).",
                "Click the \"Apply\" button to rotate the selected pages.",
                "Rotations are cumulative. For example, applying 90° rotation twice results in 180° rotation.",
                "The rotated PDF will be immediately reflected in the preview area on the right."
            ]
        },
        deletePage: {
            title: "🗑️ Delete Page",
            description: "You can delete specific pages from a PDF.",
            items: [
                "In the \"Delete Page\" section on the left, enter the page number to delete.",
                "For example, to delete page 5, enter \"5\".",
                "Click the \"Delete Page\" button to delete the specified page.",
                "After deletion, the remaining page numbers will be automatically renumbered.",
                "For example, if you delete page 5, the original page 6 becomes page 5, and page 7 becomes page 6.",
                "Note: Deletion operations cannot be undone, so proceed carefully.",
                "To delete multiple pages, delete them one at a time or use the PDF Split feature."
            ]
        },
        downloadPdf: {
            title: "💾 Download PDF",
            description: "You can save the edited PDF file to your computer.",
            items: [
                "After completing all editing operations, click the \"Download PDF\" button.",
                "The file will be automatically downloaded with the filename format \"edited_[timestamp].pdf\".",
                "The downloaded file will be saved to your browser's default download folder.",
                "Before downloading, make sure all edits are reflected in the PDF.",
                "Note: The downloaded file is separate from the original, so the original file remains unchanged."
            ]
        },
        downloadJpg: {
            title: "🖼️ Download as JPG",
            description: "You can convert each page of the PDF into high-resolution JPG image files and download them.",
            items: [
                "Click the \"Download as JPG\" button to convert each page of the PDF into individual JPG files.",
                "Each page will be downloaded in the format \"page_1.jpg\", \"page_2.jpg\".",
                "Images are converted at high resolution, so the image quality is excellent.",
                "The conversion process will proceed, and it may take time if there are many pages.",
                "Downloaded JPG files can be used in PDF editing, image editing programs, etc.",
                "Note: PDF text is converted to images, so text cannot be directly edited."
            ]
        },
        downloadText: {
            title: "📝 Download as Text",
            description: "You can extract text from a PDF and download it as a TXT file.",
            items: [
                "Click the \"Download as Text\" button to extract all text from the PDF.",
                "The extracted text will be downloaded as a file in the format \"pdf_text_[timestamp].txt\".",
                "Text from each page will be separated and displayed in the format \"=== Page 1 ===\".",
                "For image-based PDFs with no text, a warning message \"Image PDFs can extract text via OCR.\" will be displayed.",
                "For image-based PDFs, text extraction is not possible, and OCR (Optical Character Recognition) tools must be used.",
                "Extracted text can be opened and edited in Notepad, word processors, etc.",
                "Text format is preserved, but layout or formatting is not retained."
            ]
        },
        reset: {
            title: "🔄 Reset",
            description: "Cancels all edits and returns to the initial state.",
            items: [
                "Click the \"Reset\" button to cancel all editing operations.",
                "The PDF preview, page list, and all editing content will be reset.",
                "Note: Reset operations cannot be undone. Download any necessary content before resetting.",
                "After resetting, you can upload a new PDF file or start other operations."
            ]
        },
        usefulTips: {
            title: "💡 Useful Tips",
            items: [
                "It is recommended to backup or download the original PDF file before working on it.",
                "You can perform multiple operations in sequence. For example, you can rotate pages and then split them, or merge them and then change the order.",
                "Page numbers start from 1.",
                "For large PDF files, processing may take some time.",
                "Closing the browser will not save your edits, so be sure to download after completing your work.",
                "PDF (Portable Document Format) is a format focused on preserving documents in their final output form. Unlike fluid documents like Word or HTML, \"free\" editing of text is complex and inaccurate, so this functionality has not been added. Please keep this in mind."
            ]
        }
    },
    ko: {
        title: "📖 사용법",
        fileUpload: {
            title: "📁 파일 업로드",
            description: "PDF 파일을 업로드하여 편집을 시작할 수 있습니다.",
            items: [
                "좌측 상단의 \"PDF 파일 선택\" 버튼을 클릭하세요.",
                "편집하고 싶은 PDF 파일을 선택하세요.",
                "파일이 업로드되면 우측 미리보기 영역에 PDF 페이지들이 표시됩니다.",
                "파일 정보(파일명, 크기)와 총 페이지 수가 좌측에 표시됩니다.",
                "새로운 PDF 파일을 업로드하면 기존 편집 내용은 초기화됩니다."
            ]
        },
        reorderPages: {
            title: "📑 페이지 순서 변경",
            description: "PDF 페이지의 순서를 드래그 앤 드롭으로 변경할 수 있습니다.",
            items: [
                "좌측 \"페이지 순서 변경\" 섹션에서 각 페이지 번호 옆에 있는 핸들 아이콘(☰)을 확인하세요.",
                "변경하고 싶은 페이지의 핸들을 마우스로 클릭하고 드래그하여 원하는 위치로 이동하세요.",
                "예를 들어, 1번 페이지를 3번 위치로 이동하려면 1번 페이지의 핸들을 드래그하여 3번 위치에 놓으세요.",
                "순서를 변경한 후에는 \"적용\" 버튼이 나타납니다.",
                "\"적용\" 버튼을 클릭하면 변경된 순서가 PDF에 반영되고, 우측 미리보기도 업데이트됩니다.",
                "주의: \"적용\" 버튼을 클릭하기 전까지는 페이지 번호가 변경되지 않으며, 실제 반영은 \"적용\" 버튼 클릭 후에 이루어집니다."
            ]
        },
        createPdfFromImages: {
            title: "🖼️ 이미지로 PDF 만들기",
            description: "여러 이미지 파일을 하나의 PDF 파일로 변환할 수 있습니다.",
            items: [
                "\"이미지로 PDF 만들기\" 버튼을 클릭하면 모달 창이 열립니다.",
                "모달 창에서 \"파일 선택\" 버튼을 클릭하여 이미지 파일들을 선택하세요. (여러 개 선택 가능)",
                "지원되는 이미지 형식: JPG, PNG, GIF, BMP 등 일반적인 이미지 형식",
                "선택한 이미지 파일 목록이 표시되며, 각 이미지의 미리보기를 확인할 수 있습니다.",
                "\"업로드\" 버튼을 클릭하면 선택한 이미지들이 순서대로 PDF 페이지로 변환됩니다.",
                "변환된 PDF는 우측 미리보기 영역에 표시되며, 즉시 편집할 수 있습니다.",
                "이미지 순서는 선택한 순서대로 PDF 페이지가 됩니다."
            ]
        },
        splitPdf: {
            title: "✂️ PDF 분할",
            description: "PDF 파일에서 특정 페이지 범위를 추출하여 새로운 PDF 파일로 만들 수 있습니다.",
            items: [
                "좌측 \"PDF 분할\" 섹션에서 시작 페이지와 끝 페이지를 입력하세요.",
                "예를 들어, 3페이지부터 10페이지까지 분할하려면 시작 페이지에 3, 끝 페이지에 10을 입력하세요.",
                "\"분할 실행\" 버튼을 클릭하면 선택한 페이지 범위만 포함된 새로운 PDF가 생성됩니다.",
                "분할된 PDF는 우측 미리보기 영역에 표시되며, 원본 PDF는 대체됩니다.",
                "주의: 분할 작업은 되돌릴 수 없으므로, 원본 파일을 보존하려면 먼저 다운로드하세요.",
                "분할 후에는 페이지 번호가 1부터 다시 시작됩니다."
            ]
        },
        cropPdf: {
            title: "✂️ PDF 자르기",
            description: "PDF 페이지를 자르거나 특정 영역만 추출할 수 있습니다. 세 가지 방법이 있습니다.",
            items: [
                "<strong>좌우 반으로 자르기</strong>:",
                "\"PDF 자르기\" 버튼을 클릭하고 \"좌우 반으로 자르기\" 옵션을 선택하세요.",
                "각 페이지가 중앙을 기준으로 좌우로 나뉩니다.",
                "예를 들어, 원래 1페이지가 있었다면 왼쪽 절반이 1페이지, 오른쪽 절반이 2페이지가 됩니다.",
                "모든 페이지에 동일하게 적용됩니다.",
                "<strong>상하 반으로 자르기</strong>:",
                "\"PDF 자르기\" 버튼을 클릭하고 \"상하 반으로 자르기\" 옵션을 선택하세요.",
                "각 페이지가 중앙을 기준으로 상하로 나뉩니다.",
                "예를 들어, 원래 1페이지가 있었다면 위쪽 절반이 1페이지, 아래쪽 절반이 2페이지가 됩니다.",
                "모든 페이지에 동일하게 적용됩니다.",
                "<strong>크롭하기</strong>:",
                "\"PDF 자르기\" 버튼을 클릭하고 \"크롭하기\" 옵션을 선택한 후 \"확인\" 버튼을 클릭하세요.",
                "우측 PDF 미리보기 영역에서 마우스를 드래그하여 원하는 영역을 선택하세요.",
                "선택한 영역이 파란색 점선으로 표시됩니다.",
                "영역 선택 후 우측 상단에 나타나는 \"✂️ 크롭 적용\" 버튼을 클릭하세요.",
                "선택한 영역이 모든 페이지에 동일한 위치로 적용됩니다.",
                "예를 들어, 1페이지에서 좌측 상단 영역을 선택하면 모든 페이지의 동일한 위치가 크롭됩니다.",
                "크롭 작업은 되돌릴 수 없으므로 신중하게 선택하세요."
            ]
        },
        mergePdf: {
            title: "🔗 PDF 합치기",
            description: "두 개의 PDF 파일을 하나로 합칠 수 있습니다.",
            items: [
                "\"PDF 합치기\" 버튼을 클릭하면 모달 창이 열립니다.",
                "모달 창에서 첫 번째 PDF 파일과 두 번째 PDF 파일을 각각 선택하세요.",
                "선택한 파일의 정보(파일명, 크기)가 표시됩니다.",
                "\"합치기\" 버튼을 클릭하면 두 PDF 파일이 하나로 합쳐집니다.",
                "합쳐진 PDF는 첫 번째 PDF의 페이지들 다음에 두 번째 PDF의 페이지들이 추가됩니다.",
                "예를 들어, 첫 번째 PDF가 5페이지, 두 번째 PDF가 3페이지라면 합쳐진 PDF는 총 8페이지가 됩니다.",
                "합쳐진 PDF는 우측 미리보기 영역에 표시되며, 즉시 편집할 수 있습니다.",
                "주의: 합치기 작업 후에는 원본 PDF가 대체되므로, 필요시 먼저 다운로드하세요."
            ]
        },
        rotatePages: {
            title: "🔄 페이지 회전하기",
            description: "PDF 페이지를 90도, 180도, 270도로 회전시킬 수 있습니다.",
            items: [
                "\"페이지 회전하기\" 버튼을 클릭하면 모달 창이 열립니다.",
                "회전할 페이지를 선택하세요:",
                "<strong>전체 페이지</strong>: PDF의 모든 페이지를 회전합니다.",
                "<strong>페이지 범위</strong>: 특정 범위의 페이지를 회전합니다. 예) \"1-5\" (1페이지부터 5페이지까지), \"3-7\" (3페이지부터 7페이지까지)",
                "<strong>특정 페이지</strong>: 개별 페이지를 선택하여 회전합니다. 예) \"1,3,5\" (1, 3, 5페이지), \"2,4,6,8\" (2, 4, 6, 8페이지)",
                "페이지 범위나 특정 페이지를 선택한 경우, 입력 필드에 페이지 번호를 입력하세요:",
                "범위 입력: \"1-3\" (1부터 3까지), \"5-10\" (5부터 10까지)",
                "개별 페이지 입력: \"1,3,5\" (쉼표로 구분), \"2,4,6,8\"",
                "혼합 입력: \"1-3,5,7-9\" (범위와 개별 페이지 혼합 가능)",
                "회전 방향을 선택하세요:",
                "<strong>90도 (시계방향)</strong>: 페이지를 오른쪽으로 90도 회전합니다.",
                "<strong>180도</strong>: 페이지를 180도 회전합니다 (뒤집기).",
                "<strong>270도 (반시계방향)</strong>: 페이지를 왼쪽으로 90도 회전합니다 (또는 오른쪽으로 270도).",
                "\"적용\" 버튼을 클릭하면 선택한 페이지들이 회전됩니다.",
                "회전은 누적됩니다. 예를 들어, 90도 회전을 두 번 적용하면 180도 회전됩니다.",
                "회전된 PDF는 우측 미리보기 영역에 즉시 반영됩니다."
            ]
        },
        deletePage: {
            title: "🗑️ 페이지 삭제",
            description: "PDF에서 특정 페이지를 삭제할 수 있습니다.",
            items: [
                "좌측 \"페이지 삭제\" 섹션에서 삭제할 페이지 번호를 입력하세요.",
                "예를 들어, 5페이지를 삭제하려면 \"5\"를 입력하세요.",
                "\"페이지 삭제\" 버튼을 클릭하면 해당 페이지가 삭제됩니다.",
                "페이지가 삭제되면 나머지 페이지들의 번호가 자동으로 재정렬됩니다.",
                "예를 들어, 5페이지를 삭제하면 원래 6페이지가 5페이지가 되고, 7페이지가 6페이지가 됩니다.",
                "주의: 삭제 작업은 되돌릴 수 없으므로 신중하게 진행하세요.",
                "여러 페이지를 삭제하려면 한 번에 하나씩 삭제하거나, PDF 분할 기능을 사용하세요."
            ]
        },
        downloadPdf: {
            title: "💾 PDF 다운로드",
            description: "편집된 PDF 파일을 컴퓨터에 저장할 수 있습니다.",
            items: [
                "모든 편집 작업이 완료된 후 \"PDF 다운로드\" 버튼을 클릭하세요.",
                "파일이 자동으로 다운로드되며, 파일명은 \"edited_[타임스탬프].pdf\" 형식입니다.",
                "다운로드된 파일은 브라우저의 기본 다운로드 폴더에 저장됩니다.",
                "다운로드 전에 모든 편집 내용이 PDF에 반영되어 있는지 확인하세요.",
                "주의: 다운로드한 파일은 원본과 별개의 파일이므로, 원본 파일은 그대로 유지됩니다."
            ]
        },
        downloadJpg: {
            title: "🖼️ JPG로 다운로드",
            description: "PDF의 각 페이지를 고해상도 JPG 이미지 파일로 변환하여 다운로드할 수 있습니다.",
            items: [
                "\"JPG로 다운로드\" 버튼을 클릭하면 PDF의 각 페이지가 개별 JPG 파일로 변환됩니다.",
                "각 페이지는 \"page_1.jpg\", \"page_2.jpg\" 형식으로 다운로드됩니다.",
                "고해상도로 변환되므로 이미지 품질이 우수합니다.",
                "변환 과정이 진행되며, 페이지 수가 많은 경우 시간이 걸릴 수 있습니다.",
                "다운로드된 JPG 파일은 PDF 편집, 이미지 편집 프로그램 등에서 사용할 수 있습니다.",
                "주의: PDF의 텍스트는 이미지로 변환되므로 텍스트를 직접 편집할 수 없습니다."
            ]
        },
        downloadText: {
            title: "📝 텍스트로 다운로드",
            description: "PDF에서 텍스트를 추출하여 TXT 파일로 다운로드할 수 있습니다.",
            items: [
                "\"텍스트로 다운로드\" 버튼을 클릭하면 PDF의 모든 텍스트가 추출됩니다.",
                "추출된 텍스트는 \"pdf_text_[타임스탬프].txt\" 형식의 파일로 다운로드됩니다.",
                "각 페이지의 텍스트는 \"=== 페이지 1 ===\" 형식으로 구분되어 표시됩니다.",
                "텍스트가 없는 이미지 PDF인 경우 \"이미지PDF는 OCR을 통해 텍스트를 추출할 수 있습니다.\" 경고 메시지가 표시됩니다.",
                "이미지 기반 PDF의 경우 텍스트 추출이 불가능하며, OCR(광학 문자 인식) 도구를 사용해야 합니다.",
                "추출된 텍스트는 메모장, 워드프로세서 등에서 열어 확인하고 편집할 수 있습니다.",
                "텍스트 형식은 유지되지만, 레이아웃이나 서식은 보존되지 않습니다."
            ]
        },
        reset: {
            title: "🔄 초기화",
            description: "모든 편집 내용을 취소하고 처음 상태로 되돌립니다.",
            items: [
                "\"초기화\" 버튼을 클릭하면 모든 편집 작업이 취소됩니다.",
                "PDF 미리보기, 페이지 목록, 모든 편집 내용이 초기화됩니다.",
                "주의: 초기화 작업은 되돌릴 수 없습니다. 초기화 전에 필요한 내용을 다운로드하세요.",
                "초기화 후에는 새로운 PDF 파일을 업로드하거나 다른 작업을 시작할 수 있습니다."
            ]
        },
        usefulTips: {
            title: "💡 유용한 팁",
            items: [
                "작업 전에 원본 PDF 파일을 백업하거나 다운로드하는 것을 권장합니다.",
                "여러 작업을 연속으로 수행할 수 있습니다. 예를 들어, 페이지를 회전한 후 분할하거나, 합친 후 순서를 변경할 수 있습니다.",
                "페이지 번호는 1부터 시작합니다.",
                "대용량 PDF 파일의 경우 처리 시간이 걸릴 수 있습니다.",
                "브라우저를 닫으면 편집 내용이 저장되지 않으므로, 작업 완료 후 반드시 다운로드하세요.",
                "PDF(Portable Document Format)는 문서를 최종 출력물의 형태로 보존하는 데 중점을 둔 형식입니다. Word나 HTML처럼 유동적인 문서가 아니기 때문에, 텍스트를 \"자유롭게\" 편집하는 것이 복잡하고 정확하지 않아 기능을 추가하지 않았으니 참고해주세요."
            ]
        }
    }
};

// Help 모달 언어 변경 함수
function updateHelpModalLanguage(lang) {
    helpCurrentLang = lang;
    const t = helpTranslations[lang];
    if (!t) return;
    
    const helpModalBody = document.querySelector('.help-modal-body');
    if (!helpModalBody) return;
    
    // 모든 섹션 업데이트
    helpModalBody.innerHTML = `
        <div class="help-section">
            <h3>${t.fileUpload.title}</h3>
            <p>${t.fileUpload.description}</p>
            <ul>
                ${t.fileUpload.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.reorderPages.title}</h3>
            <p>${t.reorderPages.description}</p>
            <ul>
                ${t.reorderPages.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.createPdfFromImages.title}</h3>
            <p>${t.createPdfFromImages.description}</p>
            <ul>
                ${t.createPdfFromImages.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.splitPdf.title}</h3>
            <p>${t.splitPdf.description}</p>
            <ul>
                ${t.splitPdf.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.cropPdf.title}</h3>
            <p>${t.cropPdf.description}</p>
            <ul>
                ${t.cropPdf.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.mergePdf.title}</h3>
            <p>${t.mergePdf.description}</p>
            <ul>
                ${t.mergePdf.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.rotatePages.title}</h3>
            <p>${t.rotatePages.description}</p>
            <ul>
                ${t.rotatePages.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.deletePage.title}</h3>
            <p>${t.deletePage.description}</p>
            <ul>
                ${t.deletePage.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.downloadPdf.title}</h3>
            <p>${t.downloadPdf.description}</p>
            <ul>
                ${t.downloadPdf.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.downloadJpg.title}</h3>
            <p>${t.downloadJpg.description}</p>
            <ul>
                ${t.downloadJpg.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.downloadText.title}</h3>
            <p>${t.downloadText.description}</p>
            <ul>
                ${t.downloadText.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.reset.title}</h3>
            <p>${t.reset.description}</p>
            <ul>
                ${t.reset.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="help-section">
            <h3>${t.usefulTips.title}</h3>
            <ul>
                ${t.usefulTips.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // 제목 업데이트
    const helpTitle = document.querySelector('#helpModal h2');
    if (helpTitle) helpTitle.textContent = t.title;
    
    // 활성 언어 버튼 표시
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 전역 변수
let currentPdfDoc = null;
let currentPdfBytes = null;
let pdfPages = [];
let isCropMode = false;
let cropSelection = null; // { x, y, width, height, startX, startY }
let cropStartPos = null;

// DOM 요소 전역 변수 (나중에 초기화됨)
let pdfInput;
let fileInfo;
let totalPages;
let pageList;
let pdfPreview;
let splitFrom;
let splitTo;
let splitBtn;
let deletePage;
let deleteBtn;
let splitPdfBtn;
let splitPdfModal;
let closeSplitPdfModal;
let executeSplitPdfBtn;
let cancelSplitPdfBtn;
let rotatePdfBtn;
let rotatePdfModal;
let closeRotatePdfModal;
let executeRotatePdfBtn;
let cancelRotatePdfBtn;
let downloadBtn;
let downloadJpgBtn;
let downloadTextBtn;
let applyPageOrderBtn;
let imageToPdfBtn;
let imageToPdfModal;
let closeImageToPdfModal;
let imageFiles;
let imageFilesInfo;
let imagePreviewList;
let uploadImagesBtn;
let cancelImageToPdfBtn;
let mergeBtn;
let mergeModal;
let closeMergeModal;
let mergeFile1;
let mergeFile2;
let mergeFile1Info;
let mergeFile2Info;
let executeMergeBtn;
let cancelMergeBtn;
let resetBtn;
let helpBtn;
let helpModal;
let closeHelpModal;

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

// 페이지 로드 시 언어 자동 감지 및 적용
document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 초기화
    pdfInput = document.getElementById('pdfInput');
    fileInfo = document.getElementById('fileInfo');
    totalPages = document.getElementById('totalPages');
    pageList = document.getElementById('pageList');
    pdfPreview = document.getElementById('pdfPreview');
    splitFrom = document.getElementById('splitFrom');
    splitTo = document.getElementById('splitTo');
    splitBtn = document.getElementById('splitBtn');
    deletePage = document.getElementById('deletePage');
    deleteBtn = document.getElementById('deleteBtn');
    splitPdfBtn = document.getElementById('splitPdfBtn');
    splitPdfModal = document.getElementById('splitPdfModal');
    closeSplitPdfModal = document.getElementById('closeSplitPdfModal');
    executeSplitPdfBtn = document.getElementById('executeSplitPdfBtn');
    cancelSplitPdfBtn = document.getElementById('cancelSplitPdfBtn');
    rotatePdfBtn = document.getElementById('rotatePdfBtn');
    rotatePdfModal = document.getElementById('rotatePdfModal');
    closeRotatePdfModal = document.getElementById('closeRotatePdfModal');
    executeRotatePdfBtn = document.getElementById('executeRotatePdfBtn');
    cancelRotatePdfBtn = document.getElementById('cancelRotatePdfBtn');
    downloadBtn = document.getElementById('downloadBtn');
    downloadJpgBtn = document.getElementById('downloadJpgBtn');
    downloadTextBtn = document.getElementById('downloadTextBtn');
    applyPageOrderBtn = document.getElementById('applyPageOrderBtn');
    imageToPdfBtn = document.getElementById('imageToPdfBtn');
    imageToPdfModal = document.getElementById('imageToPdfModal');
    closeImageToPdfModal = document.getElementById('closeImageToPdfModal');
    imageFiles = document.getElementById('imageFiles');
    imageFilesInfo = document.getElementById('imageFilesInfo');
    imagePreviewList = document.getElementById('imagePreviewList');
    uploadImagesBtn = document.getElementById('uploadImagesBtn');
    cancelImageToPdfBtn = document.getElementById('cancelImageToPdfBtn');
    mergeBtn = document.getElementById('mergeBtn');
    mergeModal = document.getElementById('mergeModal');
    closeMergeModal = document.getElementById('closeMergeModal');
    mergeFile1 = document.getElementById('mergeFile1');
    mergeFile2 = document.getElementById('mergeFile2');
    mergeFile1Info = document.getElementById('mergeFile1Info');
    mergeFile2Info = document.getElementById('mergeFile2Info');
    executeMergeBtn = document.getElementById('executeMergeBtn');
    cancelMergeBtn = document.getElementById('cancelMergeBtn');
    resetBtn = document.getElementById('resetBtn');
    helpBtn = document.getElementById('helpBtn');
    helpModal = document.getElementById('helpModal');
    closeHelpModal = document.getElementById('closeHelpModal');
    

    // PDF 파일 업로드
    if (!pdfInput) {
        console.error('pdfInput 요소를 찾을 수 없습니다.');
    } else {
    pdfInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        alert('Only PDF files can be uploaded.');
        return;
    }

    // 기존 상태 초기화
    currentPdfDoc = null;
    currentPdfBytes = null;
    pdfPages = [];
    
    // UI 초기화
    if (pdfPreview) pdfPreview.innerHTML = `<div class="empty-state"><p>📄 Upload a PDF file</p></div>`;
    if (pageList) pageList.innerHTML = '';
    if (totalPages) totalPages.textContent = '0';
    if (splitFrom) splitFrom.value = '';
    if (splitTo) splitTo.value = '';
    if (deletePage) deletePage.value = '';
    if (downloadBtn) downloadBtn.disabled = true;
    if (downloadJpgBtn) downloadJpgBtn.disabled = true;
    if (downloadTextBtn) downloadTextBtn.disabled = true;
    if (applyPageOrderBtn) applyPageOrderBtn.style.display = 'none';

    if (fileInfo) {
        fileInfo.innerHTML = `
            <strong>File Name:</strong> ${file.name}<br>
            <strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB
        `;
    }

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

        if (downloadBtn) downloadBtn.disabled = false;
        if (downloadJpgBtn) downloadJpgBtn.disabled = false;
        if (downloadTextBtn) downloadTextBtn.disabled = false;
        
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
        alert('An error occurred while loading the PDF file.');
    }
    });
}

// 페이지 목록 업데이트
function updatePageList(numPages) {
    if (!pageList) return;
    pageList.innerHTML = '';
    if (applyPageOrderBtn) applyPageOrderBtn.style.display = 'none';
    
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
        dragHandle.title = 'Drag to reorder';
        
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
            if (deletePage) deletePage.value = originalPageNum;
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
    if (!pageList || !applyPageOrderBtn) return;
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

// 페이지 순서 적용
async function applyPageOrder(newOrder) {
    if (!currentPdfBytes || currentPdfBytes.length === 0) {
        alert('No PDF data available.');
        return;
    }

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error('PDFLib 라이브러리가 로드되지 않았습니다.');
        }

        if (applyPageOrderBtn) {
            applyPageOrderBtn.disabled = true;
            applyPageOrderBtn.textContent = 'Applying...';
        }

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
        if (totalPages) totalPages.textContent = newNumPages;
        // 페이지 목록을 다시 생성하여 원본 순서로 초기화
        updatePageList(newNumPages);
        await renderPdfPreview();
        
        if (applyPageOrderBtn) {
            applyPageOrderBtn.disabled = false;
            applyPageOrderBtn.textContent = 'Apply';
        }
        
        alert('Page order has been applied.');
    } catch (error) {
        console.error('페이지 순서 적용 오류:', error);
        if (applyPageOrderBtn) {
            applyPageOrderBtn.disabled = false;
            applyPageOrderBtn.textContent = 'Apply';
        }
        alert(`페이지 순서 적용 중 오류가 발생했습니다: ${error.message || error}`);
    }
}

// PDF 미리보기 렌더링
async function renderPdfPreview() {
    if (!currentPdfDoc || !pdfPreview) return;

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
        pageNumber.textContent = `Page ${i}`;

        pageDiv.appendChild(canvas);
        pageDiv.appendChild(pageNumber);
        pdfPreview.appendChild(pageDiv);
    }
}

// 크롭 적용 함수
async function applyCrop() {
    if (!cropSelection) {
        alert('Please select an area to crop.');
        return;
    }
    
    try {
        const applyCropBtn = document.getElementById('applyCropBtn');
        if (applyCropBtn) {
            applyCropBtn.disabled = true;
            applyCropBtn.textContent = 'Processing...';
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
        if (totalPages) totalPages.textContent = newNumPages;
        
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
        
        alert(`PDF has been cropped. ${numPages} pages processed.`);
        
    } catch (error) {
        console.error('PDF 크롭 오류:', error);
        alert(`An error occurred while cropping PDF: ${error.message || error}`);
    } finally {
        const applyCropBtn = document.getElementById('applyCropBtn');
        if (applyCropBtn) {
            applyCropBtn.disabled = false;
            applyCropBtn.textContent = '✂️ Apply Crop';
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
                alert('Image has been copied to clipboard.');
            } catch (err) {
                // ClipboardItem을 지원하지 않는 경우 대체 방법
                const dataUrl = canvas.toDataURL('image/png');
                const textArea = document.createElement('textarea');
                textArea.value = dataUrl;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert('Image data URL has been copied to clipboard.');
                } catch (e) {
                    // 최종 대체: 다운로드
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `page_image_${Date.now()}.png`;
                    link.click();
                    alert('Image has been downloaded. Open it in an image editor to copy.');
                }
                document.body.removeChild(textArea);
            }
        }, 'image/png');
    } catch (error) {
        console.error('이미지 복사 오류:', error);
        alert('An error occurred while copying image.');
    }
}

    // PDF 분할
    if (splitBtn) {
        splitBtn.addEventListener('click', async () => {
            console.log('=== 분할 버튼 클릭 ===');
            console.log('currentPdfBytes 직접 확인:', currentPdfBytes);
            console.log('currentPdfBytes 타입:', currentPdfBytes ? currentPdfBytes.constructor.name : 'null');
            console.log('currentPdfBytes 크기:', currentPdfBytes ? currentPdfBytes.length : 0);
            console.log('currentPdfDoc:', currentPdfDoc ? `존재 (페이지: ${currentPdfDoc.numPages})` : '없음');
            
            if (!currentPdfBytes || currentPdfBytes.length === 0) {
                console.error('currentPdfBytes가 없거나 비어있습니다.');
                alert('PDF data has been lost. Please upload the PDF file again.');
                return;
            }

            if (!currentPdfDoc) {
                alert('PDF document is not loaded. Please upload the PDF file again.');
                return;
            }

            if (!splitFrom || !splitTo) {
                alert('Page range input field not found.');
                return;
            }

            const from = parseInt(splitFrom.value);
            const to = parseInt(splitTo.value);

            if (!from || !to || from < 1 || to < 1 || from > to) {
                alert('Please enter a valid page range.');
                return;
            }

            if (to > currentPdfDoc.numPages) {
                alert(`Cannot exceed total number of pages. (${currentPdfDoc.numPages})`);
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
                if (totalPages) totalPages.textContent = numPages;
                updatePageList(numPages);
                await renderPdfPreview();

                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;

                if (splitFrom) splitFrom.value = '';
                if (splitTo) splitTo.value = '';
                
                alert(`Pages ${from}~${to} have been successfully split.`);
            } catch (error) {
                console.error('PDF 분할 오류:', error);
                alert(`An error occurred while splitting PDF: ${error.message || error}`);
            }
        });
    }

    // 페이지 삭제
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            if (!currentPdfBytes || currentPdfBytes.length === 0) {
                alert('Please upload a PDF file first.');
                return;
            }

            if (!deletePage) {
                alert('Page number input field not found.');
                return;
            }

            const pageNum = parseInt(deletePage.value);

            if (!pageNum || pageNum < 1 || pageNum > currentPdfDoc.numPages) {
                alert('Please enter a valid page number.');
                return;
            }

            if (currentPdfDoc.numPages === 1) {
                alert('The last page cannot be deleted.');
                return;
            }

            if (!confirm(`Do you want to delete page ${pageNum}?`)) {
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
                if (totalPages) totalPages.textContent = numPages;
                updatePageList(numPages);
                await renderPdfPreview();

                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;

                if (deletePage) deletePage.value = '';
                
                alert(`Page ${pageNum} has been deleted.`);
            } catch (error) {
                console.error('페이지 삭제 오류:', error);
                alert(`An error occurred while deleting page: ${error.message || error}`);
            }
        });
    }

    // PDF 자르기 모달 열기
    if (splitPdfBtn) {
        splitPdfBtn.addEventListener('click', () => {
            if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
                alert('PDF data has been lost. Please upload the PDF file again.');
                return;
            }
            if (splitPdfModal) splitPdfModal.style.display = 'flex';
        });
    }

    // PDF 자르기 모달 닫기
    if (closeSplitPdfModal) {
        closeSplitPdfModal.addEventListener('click', () => {
            if (splitPdfModal) splitPdfModal.style.display = 'none';
        });
    }

    if (cancelSplitPdfBtn) {
        cancelSplitPdfBtn.addEventListener('click', () => {
            if (splitPdfModal) splitPdfModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭 시 닫기
    if (splitPdfModal) {
        splitPdfModal.addEventListener('click', (e) => {
            if (e.target === splitPdfModal) {
                splitPdfModal.style.display = 'none';
            }
        });
    }

    // PDF 자르기 실행
    if (executeSplitPdfBtn) {
        executeSplitPdfBtn.addEventListener('click', async () => {
            const checkedRadio = document.querySelector('input[name="splitDirection"]:checked');
            if (!checkedRadio) {
                alert('Please select a crop direction.');
                return;
            }
            const splitDirection = checkedRadio.value;
            
            // 크롭 모드인 경우
            if (splitDirection === 'crop') {
                if (splitPdfModal) splitPdfModal.style.display = 'none';
                isCropMode = true;
                cropSelection = null;
                cropStartPos = null;
                
                // 크롭 모드 활성화 안내
                alert('Drag in the PDF preview to select the area to crop.\nClick the "Apply Crop" button after selection.');
                
                // 크롭 적용 버튼 추가
                if (!document.getElementById('applyCropBtn')) {
                    const applyCropBtn = document.createElement('button');
                    applyCropBtn.id = 'applyCropBtn';
                    applyCropBtn.className = 'btn btn-success';
                    applyCropBtn.textContent = '✂️ Apply Crop';
                    applyCropBtn.style.position = 'fixed';
                    applyCropBtn.style.top = '20px';
                    applyCropBtn.style.right = '20px';
                    applyCropBtn.style.zIndex = '1001';
                    applyCropBtn.style.display = 'none';
                    document.body.appendChild(applyCropBtn);
                    
                    applyCropBtn.addEventListener('click', async () => {
                        if (!cropSelection) {
                            alert('Please select an area to crop first.');
                            return;
                        }
                        await applyCrop();
                    });
                }
                
                const applyCropBtn = document.getElementById('applyCropBtn');
                if (applyCropBtn) applyCropBtn.style.display = 'block';
                
                // 미리보기 다시 렌더링하여 크롭 모드 활성화
                await renderPdfPreview();
                return;
            }
            
            try {
                if (executeSplitPdfBtn) {
                    executeSplitPdfBtn.disabled = true;
                    executeSplitPdfBtn.textContent = 'Processing...';
                }

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
                if (totalPages) totalPages.textContent = newNumPages;

                // 페이지 목록 생성
                updatePageList(newNumPages);

                // PDF 미리보기 렌더링
                await renderPdfPreview();

                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;

                // 모달 닫기
                if (splitPdfModal) splitPdfModal.style.display = 'none';

                const directionText = splitDirection === 'horizontal' ? 'horizontally' : 'vertically';
                alert(`PDF has been split ${directionText}. ${numPages} pages changed to ${newNumPages} pages.`);

            } catch (error) {
                console.error('PDF 자르기 오류:', error);
                alert(`An error occurred while cropping PDF: ${error.message || error}`);
            } finally {
                if (executeSplitPdfBtn) {
                    executeSplitPdfBtn.disabled = false;
                    executeSplitPdfBtn.textContent = 'Confirm';
                }
            }
        });
    }

    // PDF 다운로드
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (!currentPdfBytes || currentPdfBytes.length === 0) {
                alert('No PDF to download.');
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
    }

    // JPG로 다운로드
    if (downloadJpgBtn) {
        downloadJpgBtn.addEventListener('click', async () => {
            if (!currentPdfDoc) {
                alert('No PDF to download.');
                return;
            }

            try {
                const numPages = currentPdfDoc.numPages;
                const timestamp = Date.now();
                
                // 진행 상황 표시
                if (downloadJpgBtn) {
                    downloadJpgBtn.disabled = true;
                    downloadJpgBtn.textContent = 'Processing...';
                }
                
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
                
                if (downloadJpgBtn) {
                    downloadJpgBtn.disabled = false;
                    downloadJpgBtn.textContent = '🖼️ Download as JPG';
                }
                
                alert(`${numPages} pages have been downloaded as high-resolution JPG files.`);
            } catch (error) {
                console.error('JPG 다운로드 오류:', error);
                if (downloadJpgBtn) {
                    downloadJpgBtn.disabled = false;
                    downloadJpgBtn.textContent = '🖼️ Download as JPG';
                }
                alert(`An error occurred while downloading JPG: ${error.message || error}`);
            }
        });
    }

    // 텍스트로 다운로드
    if (downloadTextBtn) {
        downloadTextBtn.addEventListener('click', async () => {
            if (!currentPdfDoc) {
                alert('No PDF to download.');
                return;
            }

            try {
                const numPages = currentPdfDoc.numPages;
                
                // 진행 상황 표시
                if (downloadTextBtn) {
                    downloadTextBtn.disabled = true;
                    downloadTextBtn.textContent = 'Extracting text...';
                }
                
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
                        allText += `=== Page ${i} ===\n\n${pageText.trim()}\n\n\n`;
                    }
                    
                    // 진행 상황 업데이트
                    if (downloadTextBtn) {
                        downloadTextBtn.textContent = `Extracting text... (${i}/${numPages})`;
                    }
                }
                
                // 텍스트가 없는 경우 경고
                if (!hasText || !allText.trim()) {
                    if (downloadTextBtn) {
                        downloadTextBtn.disabled = false;
                        downloadTextBtn.textContent = '📝 Download as Text';
                    }
                    alert('Image PDFs can extract text via OCR.');
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
                
                if (downloadTextBtn) {
                    downloadTextBtn.disabled = false;
                    downloadTextBtn.textContent = '📝 Download as Text';
                }
                
                alert('Text file has been downloaded.');
            } catch (error) {
                console.error('텍스트 다운로드 오류:', error);
                if (downloadTextBtn) {
                    downloadTextBtn.disabled = false;
                    downloadTextBtn.textContent = '📝 Download as Text';
                }
                alert(`An error occurred while downloading text: ${error.message || error}`);
            }
        });
    }

    // 페이지 회전하기 모달 열기
    if (rotatePdfBtn) {
        rotatePdfBtn.addEventListener('click', () => {
            if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
                alert('PDF file is not open.');
                return;
            }
            if (rotatePdfModal) rotatePdfModal.style.display = 'block';
            
            // 페이지 선택 라디오 버튼에 따라 입력 필드 표시/숨김
            const pageSelectionRadios = document.querySelectorAll('input[name="rotatePageSelection"]');
            const rotatePageInputs = document.getElementById('rotatePageInputs');
            const rotatePageRange = document.getElementById('rotatePageRange');
            
            if (pageSelectionRadios.length > 0 && rotatePageRange) {
                pageSelectionRadios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        if (radio.value === 'all') {
                            rotatePageRange.style.display = 'none';
                        } else {
                            rotatePageRange.style.display = 'block';
                            if (radio.value === 'range') {
                                rotatePageRange.placeholder = 'e.g., 1-3 or 1,3,5';
                            } else if (radio.value === 'specific') {
                                rotatePageRange.placeholder = 'e.g., 1,3,5';
                            }
                        }
                    });
                });
            }
        });
    }

    // 페이지 회전하기 모달 닫기
    if (closeRotatePdfModal) {
        closeRotatePdfModal.addEventListener('click', () => {
            if (rotatePdfModal) rotatePdfModal.style.display = 'none';
        });
    }

    if (cancelRotatePdfBtn) {
        cancelRotatePdfBtn.addEventListener('click', () => {
            if (rotatePdfModal) rotatePdfModal.style.display = 'none';
        });
    }

    // 페이지 회전하기 실행
    if (executeRotatePdfBtn) {
        executeRotatePdfBtn.addEventListener('click', async () => {
            if (!currentPdfDoc || !currentPdfBytes || currentPdfBytes.length === 0) {
                alert('No PDF data available.');
                return;
            }

            try {
                const numPages = currentPdfDoc.numPages;
                const checkedPageSelection = document.querySelector('input[name="rotatePageSelection"]:checked');
                const checkedRotateDirection = document.querySelector('input[name="rotateDirection"]:checked');
                
                if (!checkedPageSelection || !checkedRotateDirection) {
                    alert('Please select pages and rotation direction.');
                    return;
                }
                
                const pageSelection = checkedPageSelection.value;
                const rotateDirection = parseInt(checkedRotateDirection.value);
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
                    alert('Please enter pages.');
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
                            alert(`Invalid page range: ${trimmed}`);
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
                            alert(`Invalid page number: ${trimmed}`);
                            return;
                        }
                        const pageIndex = pageNum - 1; // 0-based index
                        if (!pagesToRotate.includes(pageIndex)) {
                            pagesToRotate.push(pageIndex);
                        }
                    }
                }
                
                if (pagesToRotate.length === 0) {
                    alert('Please select pages to rotate.');
                    return;
                }
            }
            
            executeRotatePdfBtn.disabled = true;
            executeRotatePdfBtn.textContent = 'Processing...';
            
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
                if (totalPages) totalPages.textContent = newNumPages;
                
                updatePageList(newNumPages);
                await renderPdfPreview();
                
                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;
                // splitPdfBtn은 항상 활성화 상태로 유지
                if (rotatePdfBtn) rotatePdfBtn.disabled = false;
                
                // 모달 닫기
                if (rotatePdfModal) rotatePdfModal.style.display = 'none';
                
                alert(`${pagesToRotate.length} pages have been rotated ${rotateDirection} degrees.`);
            } catch (error) {
                console.error('페이지 회전 오류:', error);
                alert(`An error occurred while rotating pages: ${error.message || error}`);
            } finally {
                if (executeRotatePdfBtn) {
                    executeRotatePdfBtn.disabled = false;
                    executeRotatePdfBtn.textContent = 'Apply';
                }
            }
        });
    }

    // 사용법 모달 열기
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            if (helpModal) {
                helpModal.style.display = 'flex';
                // 기본 언어로 설정 (영어)
                updateHelpModalLanguage(helpCurrentLang || 'en');
            }
        });
    }
    
    // 언어 버튼 클릭 이벤트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            updateHelpModalLanguage(lang);
        });
    });

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
            console.log('Create PDF from Images button clicked');
            if (!imageToPdfModal) {
                console.error('imageToPdfModal not found.');
                return;
            }
            imageToPdfModal.style.display = 'flex';
            // 파일 입력 초기화
            if (imageFiles) imageFiles.value = '';
            if (imageFilesInfo) imageFilesInfo.textContent = '';
            if (imagePreviewList) imagePreviewList.innerHTML = '';
        });
    } else {
        console.error('imageToPdfBtn not found.');
    }

    // 이미지로 PDF 만들기 모달 닫기
    if (closeImageToPdfModal) {
        closeImageToPdfModal.addEventListener('click', () => {
            if (imageToPdfModal) imageToPdfModal.style.display = 'none';
        });
    }

    if (cancelImageToPdfBtn) {
        cancelImageToPdfBtn.addEventListener('click', () => {
            if (imageToPdfModal) imageToPdfModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭 시 닫기
    if (imageToPdfModal) {
        imageToPdfModal.addEventListener('click', (e) => {
            if (e.target === imageToPdfModal) {
                imageToPdfModal.style.display = 'none';
            }
        });
    }

    // 이미지 파일 선택 시 정보 표시
    if (imageFiles) {
        imageFiles.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length === 0) {
                if (imageFilesInfo) imageFilesInfo.textContent = '';
                if (imagePreviewList) imagePreviewList.innerHTML = '';
                return;
            }

            // 이미지 파일만 필터링
            const filteredImageFiles = files.filter(file => file.type.startsWith('image/'));
            
            if (filteredImageFiles.length === 0) {
                alert('Only image files can be selected.');
                e.target.value = '';
                return;
            }

            if (filteredImageFiles.length !== files.length) {
                alert('Some files were excluded because they are not images.');
            }

            if (imageFilesInfo) {
                imageFilesInfo.textContent = `${filteredImageFiles.length} image files selected`;
                imageFilesInfo.style.color = '#28a745';
            }

            // 이미지 미리보기
            if (imagePreviewList) {
                imagePreviewList.innerHTML = '';
                filteredImageFiles.forEach((file, index) => {
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
            }
        });
    }

    // 이미지 업로드 및 PDF 생성
    if (uploadImagesBtn) {
        uploadImagesBtn.addEventListener('click', async () => {
            if (!imageFiles) {
                alert('Image file input field not found.');
                return;
            }
            
            const files = Array.from(imageFiles.files).filter(file => file.type.startsWith('image/'));
            
            if (files.length === 0) {
                alert('Please select image files.');
                return;
            }

            try {
                if (uploadImagesBtn) {
                    uploadImagesBtn.disabled = true;
                    uploadImagesBtn.textContent = 'Creating PDF...';
                }

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
                if (totalPages) totalPages.textContent = numPages;

                // 페이지 목록 생성
                updatePageList(numPages);

                // PDF 미리보기 렌더링
                await renderPdfPreview();

                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;

                // 파일 정보 업데이트
                if (fileInfo) {
                    fileInfo.innerHTML = `
                        <strong>File Name:</strong> PDF created from ${files.length} images<br>
                        <strong>Total Pages:</strong> ${numPages} pages
                    `;
                }

                // 모달 닫기
                if (imageToPdfModal) imageToPdfModal.style.display = 'none';
                
                alert(`PDF has been created from ${files.length} images. Total ${numPages} pages.`);

            } catch (error) {
                console.error('이미지로 PDF 만들기 오류:', error);
                alert(`An error occurred while creating PDF from images: ${error.message || error}`);
            } finally {
                if (uploadImagesBtn) {
                    uploadImagesBtn.disabled = false;
                    uploadImagesBtn.textContent = 'Upload';
                }
            }
        });
    }

    // PDF 합치기 모달 열기
    if (mergeBtn) {
        mergeBtn.addEventListener('click', () => {
            if (mergeModal) mergeModal.style.display = 'flex';
            // 파일 입력 초기화
            if (mergeFile1) mergeFile1.value = '';
            if (mergeFile2) mergeFile2.value = '';
            if (mergeFile1Info) mergeFile1Info.textContent = '';
            if (mergeFile2Info) mergeFile2Info.textContent = '';
        });
    }

    // PDF 합치기 모달 닫기
    if (closeMergeModal) {
        closeMergeModal.addEventListener('click', () => {
            if (mergeModal) mergeModal.style.display = 'none';
        });
    }

    if (cancelMergeBtn) {
        cancelMergeBtn.addEventListener('click', () => {
            if (mergeModal) mergeModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭 시 닫기
    if (mergeModal) {
        mergeModal.addEventListener('click', (e) => {
            if (e.target === mergeModal) {
                mergeModal.style.display = 'none';
            }
        });
    }

    // 파일 선택 시 정보 표시
    if (mergeFile1) {
        mergeFile1.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (mergeFile1Info) {
                    mergeFile1Info.textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                    mergeFile1Info.style.color = '#28a745';
                }
            } else {
                if (mergeFile1Info) mergeFile1Info.textContent = '';
            }
        });
    }

    if (mergeFile2) {
        mergeFile2.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (mergeFile2Info) {
                    mergeFile2Info.textContent = `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                    mergeFile2Info.style.color = '#28a745';
                }
            } else {
                if (mergeFile2Info) mergeFile2Info.textContent = '';
            }
        });
    }

    // PDF 합치기 실행
    if (executeMergeBtn) {
        executeMergeBtn.addEventListener('click', async () => {
            if (!mergeFile1 || !mergeFile2) {
                alert('PDF file input field not found.');
                return;
            }
            
            const file1 = mergeFile1.files[0];
            const file2 = mergeFile2.files[0];

            if (!file1 || !file2) {
                alert('Please select both PDF files.');
                return;
            }

            if (file1.type !== 'application/pdf' || file2.type !== 'application/pdf') {
                alert('Only PDF files can be selected.');
                return;
            }

            try {
                if (executeMergeBtn) {
                    executeMergeBtn.disabled = true;
                    executeMergeBtn.textContent = 'Merging...';
                }

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
                if (totalPages) totalPages.textContent = numPages;

                // 페이지 목록 생성
                updatePageList(numPages);

                // PDF 미리보기 렌더링
                await renderPdfPreview();

                if (downloadBtn) downloadBtn.disabled = false;
                if (downloadJpgBtn) downloadJpgBtn.disabled = false;
                if (downloadTextBtn) downloadTextBtn.disabled = false;

                // 파일 정보 업데이트
                if (fileInfo) {
                    fileInfo.innerHTML = `
                        <strong>File Name:</strong> ${file1.name} + ${file2.name}<br>
                        <strong>Total Pages:</strong> ${numPages} pages
                    `;
                }

                // 모달 닫기
                if (mergeModal) mergeModal.style.display = 'none';
                
                alert(`PDF merge completed! Total ${numPages} pages created.`);

            } catch (error) {
                console.error('PDF 합치기 오류:', error);
                alert(`An error occurred while merging PDF: ${error.message || error}`);
            } finally {
                if (executeMergeBtn) {
                    executeMergeBtn.disabled = false;
                    executeMergeBtn.textContent = 'Merge';
                }
            }
        });
    }

    // 적용 버튼 클릭 시 페이지 순서 변경
    if (applyPageOrderBtn) {
        applyPageOrderBtn.addEventListener('click', async () => {
            if (!currentPdfBytes || currentPdfBytes.length === 0) {
                alert('No PDF data available.');
                return;
            }

            try {
                if (!pageList) return;
                const items = pageList.querySelectorAll('.page-item');
                const newOrder = [];
                
                items.forEach((item) => {
                    newOrder.push(parseInt(item.dataset.originalIndex));
                });
                
                await applyPageOrder(newOrder);
                if (applyPageOrderBtn) applyPageOrderBtn.style.display = 'none';
            } catch (error) {
                console.error('Page order apply error:', error);
                alert(`An error occurred while applying page order: ${error.message || error}`);
            }
        });
    }

    // 초기화
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Do you want to reset all work?')) {
                currentPdfDoc = null;
                currentPdfBytes = null;
                pdfPages = [];
                
                if (pdfInput) pdfInput.value = '';
                if (fileInfo) fileInfo.innerHTML = '';
                if (totalPages) totalPages.textContent = '0';
                if (pageList) pageList.innerHTML = '';
                if (pdfPreview) pdfPreview.innerHTML = `<div class="empty-state"><p>📄 Upload a PDF file</p></div>`;
                
                if (splitFrom) splitFrom.value = '';
                if (splitTo) splitTo.value = '';
                if (deletePage) deletePage.value = '';

                if (downloadBtn) downloadBtn.disabled = true;
                if (downloadJpgBtn) downloadJpgBtn.disabled = true;
                if (downloadTextBtn) downloadTextBtn.disabled = true;
                // splitPdfBtn은 항상 활성화 상태로 유지
            }
        });
    }
});

// 라이브러리 로드 확인
window.addEventListener('load', () => {
        if (typeof PDFLib === 'undefined') {
        console.error('PDFLib이 로드되지 않았습니다.');
        alert('Failed to load PDF editing library. Please refresh the page.');
    } else {
        console.log('PDFLib이 성공적으로 로드되었습니다.');
    }
});

