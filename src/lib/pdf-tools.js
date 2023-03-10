import PdfPrinter from "pdfmake";
import { pipeline } from "stream";
import { promisify } from "util";
import { getPDFWritableStream } from "./fs-tools.js";

export const getPDFRedeableStream = (e) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [e.title, e.year, e.type, e.imdbID],
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();

  return pdfReadableStream;
};

export const asyncPDFGeneration = async (e) => {
  const source = getPDFRedeableStream(e);
  const destination = getPDFWritableStream(`${e.imdbID}.pdf`);

  const promiseBasedPipeline = promisify(pipeline);
  await promiseBasedPipeline(source, destination);
};
