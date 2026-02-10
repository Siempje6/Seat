export function initPDFExport() {
    document.querySelectorAll('[data-pdf-export]').forEach(button => {
      button.addEventListener('click', async () => {
        const targetId = button.dataset.pdfExport;
        const element = document.getElementById(targetId);
        
        if (!element) {
          console.error(`Element #${targetId} niet gevonden`);
          return;
        }
        
        const { default: html2pdf } = await import('html2pdf.js');
        
        const opt = {
          margin: 10,
          filename: `SEAT-${targetId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        // Loading state
        button.disabled = true;
        button.textContent = 'PDF maken...';
        
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            button.disabled = false;
            button.textContent = 'Download PDF';
          });
      });
    });
  }