/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable require-jsdoc */
// import {Spinner} from '@app/components/icon/icons';
import React from 'react';
import {
  Container,
  ErrorMessage,
} from './pdf-components';

type Props = {
	pdfLink: string;
	errorMsg?: string;
	onError?: (e: any) => void;
};
export function ViewerPdf({pdfLink, onError, errorMsg}: Props) {
  const [isError, setIsError] = React.useState(false);
  //   const [loading, setLoading] = React.useState(true);
  const windowObj: any = window;
  React.useEffect(() => {
    isPdf().then((res) => {
      // console.log(res, pdfLink, 'ViewPdf')
      // https://svaasqastorage.blob.core.windows.net/drlsvaas/Policy%20PDF.pdf?sp=r&st=2021-08-25T06:25:08Z&se=2022-01-31T14:25:08Z&spr=https&sv=2020-08-04&sr=b&sig=73hkLvPEXRMF489ezArFPBYgi7ncqGywPmUDvdv4%2BF0%3D
      loadPdf();
    });
  }, []);
  function loadPdf() {
    try {
      setTimeout(() => {
        const pdfjsLib: any = windowObj['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc =
					'//mozilla.github.io/pdf.js/build/pdf.worker.js';
        const loadingTask = pdfjsLib.getDocument(pdfLink);
        loadingTask.promise.then(
            (pdf: any) => {
              const pageNumber = 1;
              pdf.getPage(pageNumber).then((page: any) => {
                const scale = 1.2;
                const viewport = page.getViewport({scale: scale});
                // Prepare canvas using PDF page dimensions
                const canvas: any = document.getElementById('the-canvas');
                // if (!canvas && !canvas.getContext) {
                // 	return
                // }
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                //   setLoading(false);
                });
              });
            },
            (reason: any) => {
              // PDF loading error
              setIsError(true);
            },
        );
      }, 500);
    } catch (error) {
      setIsError(true);
    }
  }
  async function isPdf() {
    const ext = pdfLink.substring(pdfLink.lastIndexOf('.') + 1);
    if (onError) {
      if (ext === 'pdf') {
        setIsError(false);
        onError(false);
        return true;
      } else {
        setIsError(true);
        onError(true);
        return false;
      }
    } else {
      return true;
    }
  }
  return (
    <Container>

      {isError && false ? (
				<ErrorMessage>{errorMsg ? errorMsg : 'Failed to load PDF'}
				</ErrorMessage>
			) : (
				<>

				  <canvas id='the-canvas'></canvas>
				</>
			)}
    </Container>
  );
}
