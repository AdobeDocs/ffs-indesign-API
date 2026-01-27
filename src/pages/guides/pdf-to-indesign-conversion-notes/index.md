---
title: PDF to InDesign Conversion Notes
description: Notes and limitations for converting PDFs to editable InDesign files.
keywords:
  - Adobe InDesign API
  - PDF to InDesign
  - PDF conversion
  - INDD
  - IDML
  - limitations
  - conversion notes
hideBreadcrumbNav: true
---

# PDF to InDesign conversion notes

## Points to note

1. Convert multiple PDFs from any source (e.g., PDFs created from Illustrator, Photoshop, Express, Microsoft Word, Microsoft Excel, Microsoft PowerPoint, Apple Numbers, Canva, etc.).
2. Strikethrough, superscript and subscript, baseline shift, underline, tables, special characters, hyperlinks, nested ordered and unordered lists, spot colors, and gradients are supported.
3. Superscript & Subscript are visually correct and editable in most cases.
4. Tables are supported.
5. Paragraph and Character Styles are created as part of the PDF to INDD document conversion. (InDesign will not create Paragraph and Character Styles if, during the PDF conversion process, it detects that the number of unique styles in the document exceeds 80.)
6. PDF conversion supports the Drop Shadow Effect in PDFs created in InDesign. Object opacity, Blending modes, and optimization of the creation of a number of text frames are now fully or partially supported for PDFs.
7. Grouping of paragraphs into a single text frame is supported.
8. Use the Preserve InDesign Editing Capabilities during Export PDF. This will help recreate the PDF as it was originally created in InDesign.

## Limitations

- Supports PDFs up to 200 pages only.
- Does not support OCR scenarios (scanned PDF files) or Password protected PDFs.
- Only PDFs upto 150MB in size are supported.
- The API does not suppoprt conversion of PDF files that are corrupted or malformed in any manner and were created from unreliable sources.
- The API does not support documents with advanced bullets and numbers and advanced table features.

## Reference

- [Convert PDFs to InDesign Documents](https://helpx.adobe.com/indesign/using/convert-pdf-to-indesign-file.html)

