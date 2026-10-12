---
title: Working with the Convert InDesign to IDML API
description: Convert an InDesign document to IDML using the Convert InDesign to IDML API.
keywords:
  - Adobe InDesign API
  - Convert InDesign to IDML API
  - IDML
  - INDD
  - document conversion
---

# Working with the Convert InDesign to IDML API

Use the Convert InDesign to IDML API to convert an INDD file to IDML.

## Submit a conversion

Send a `POST` request to `/v3/convert-to-idml`. Include a pre-signed URL for the document and its destination file name. Currently, only one document can be converted per request.

The output file takes the name from the input asset's `destination`, replacing its extension with `.idml`. For example, `example.indd` produces `example.idml`.

```curl
curl --request POST \
  --url https://indesign.adobe.io/v3/convert-to-idml \
  --header 'Authorization: Bearer {YOUR_OAUTH_TOKEN}' \
  --header 'x-api-key: {YOUR_API_KEY}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "assets": [
      {
        "source": {
          "url": "{PRESIGNED_URL}"
        },
        "destination": "example.indd"
      }
    ],
    "params": {
      "targetDocuments": ["example.indd"]
    }
  }'
```

An accepted request returns a `jobId` and `statusUrl`. Poll the status endpoint using the job ID to retrieve the conversion status and output.

```json
{
  "jobId": "{JOB_ID}",
  "statusUrl": "https://indesign.adobe.io/v3/status/{JOB_ID}"
}
```

## Links and fonts

If linked assets in the document are not included with the request, they are reported as missing links. Fonts unavailable are reported as missing fonts unless supplied using a pre-signed URL.
