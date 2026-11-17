---
title: Input Asset Caching with InDesign API
description: Learn how input asset caching reuses downloaded assets and how to disable it for a job or organization.
keywords:
  - Adobe InDesign API
  - input assets
  - asset caching
  - assetCache
  - ETag
  - pre-signed URLs
hideBreadcrumbNav: true
---

# Input Asset Caching

Input asset caching lets InDesign API reuse previously downloaded input assets instead of downloading the same asset for every job. This can reduce download latency and network usage when jobs reuse assets such as documents, images, or fonts.

Caching is enabled by default. It does not change asset content, asset format, or job output. If caching is unavailable or an asset cannot be safely identified for caching, InDesign API uses the existing download flow.

## Control caching for a job

No additional parameters are needed to use caching. To disable caching for a specific job, set `params.generalSettings.assetCache.enabled` to `false` in your request. This setting applies at the job level; you do not need to configure each asset separately.

The following example disables caching for a [Rendition API](../working-with-rendition-api/index.md) request:

```json
{
  "assets": [
    {
      "source": {
        "url": "<PRE-SIGNED URL FOR DOCUMENT>"
      },
      "destination": "document.indd"
    }
  ],
  "params": {
    "generalSettings": {
      "assetCache": {
        "enabled": false
      }
    },
    "targetDocuments": [
      "document.indd"
    ],
    "outputMediaType": "application/pdf"
  }
}
```

Keep the other parameters required by the API you are calling. See the [API reference](../../api/index.md) for request schemas.

### Cache settings

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `params.generalSettings.assetCache.enabled` | boolean | No | `true` | Set to `false` to disable input asset caching for the job and use the normal download flow. |

The `assetCache` object is optional. If `generalSettings`, `assetCache`, or `enabled` is omitted, caching is enabled by default unless it has been disabled for your organization.

### Disable caching for your organization

To disable caching at the organization level, contact the InDesign APIs team. This lets your organization opt out without setting `params.generalSettings.assetCache.enabled` to `false` in each job request.

## How assets are reused

When caching is enabled, InDesign API automatically determines the underlying storage type and retrieves the asset's ETag, a value provided by the storage service to identify the asset version. You do not need to supply a storage type, ETag, or cache identifier.

For HTTP sources backed by Azure or Google Cloud Storage, the service uses a `HEAD` request to retrieve the ETag. For AWS sources, it uses a ranged `GET` request with `Range: bytes=0-0` to retrieve response headers.

If a usable ETag is available, the service uses it with your organization and client application identifiers to identify the cached asset:

- If a matching cached file is available and readable, the job reuses it.
- If no matching cached file is available, the service downloads the asset and caches it when eligible.
- If no usable ETag is available, the service downloads the asset without caching.

Caching does not guarantee a cache hit for every asset or job.

## Retention and freshness

Cached assets are retained for no more than **24 hours**. The cache lifetime is the shorter of:

- 24 hours.
- The remaining validity of the asset's pre-signed URL.

For example, if the URL expires in six hours, the cache lifetime is at most six hours. If the URL remains valid for more than 24 hours, the cache lifetime is capped at 24 hours. Assets with already-expired pre-signed URLs are not cached.

When asset content changes and its ETag changes, the service uses a different cache identifier. The updated content is downloaded and cached separately rather than reusing the previous version. Ensure your storage service updates the ETag when you replace asset content.

Continue to provide valid [pre-signed URLs](../../getting-started/concepts/index.md#pre-signed-urls) for your input assets. Caching is not a replacement for maintaining access to the source assets.

## Isolation and data handling

- Cached assets are isolated by organization and client application, using identifiers from the authentication context.
- Identical assets used by different organizations or client applications have different cache identifiers.
- Pre-signed URLs and authentication credentials are not stored in the cache.
- Cached asset files are temporary and are deleted after the retention period.

## Fallback behavior

Cache failures do not fail a job on their own. If the cache is unavailable, or a cached file is missing or unreadable, the service falls back to the normal download flow. The job still requires a successful download and remains subject to normal asset access and processing errors.

No request changes are needed to use the default caching behavior; set `params.generalSettings.assetCache.enabled` to `false` when a job must use the normal download flow.
