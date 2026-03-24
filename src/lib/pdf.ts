export async function exportToPdf(element: HTMLElement, filename = "etiquetas.pdf"): Promise<void> {
  // Dynamically import to avoid SSR issues
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  // A4 dimensions in points (72 dpi)
  const A4_WIDTH_PT = 595.28;
  const A4_HEIGHT_PT = 841.89;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const imgWidth = A4_WIDTH_PT;
  const imgHeight = (canvas.height * A4_WIDTH_PT) / canvas.width;

  // If content fits in one page
  if (imgHeight <= A4_HEIGHT_PT) {
    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  } else {
    // Slice canvas into A4-page-height chunks
    const pageHeightPx = Math.floor((canvas.width * A4_HEIGHT_PT) / A4_WIDTH_PT);
    let yOffset = 0;
    let pageIndex = 0;

    while (yOffset < canvas.height) {
      const remainingPx = canvas.height - yOffset;
      const sliceHeightPx = Math.min(pageHeightPx, remainingPx);

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;
      const ctx = pageCanvas.getContext("2d")!;
      ctx.drawImage(canvas, 0, -yOffset);

      const sliceImgData = pageCanvas.toDataURL("image/jpeg", 0.9);
      const sliceImgHeight = (sliceHeightPx * A4_WIDTH_PT) / canvas.width;

      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(sliceImgData, "JPEG", 0, 0, imgWidth, sliceImgHeight);

      yOffset += sliceHeightPx;
      pageIndex++;
    }
  }

  pdf.save(filename);
}
