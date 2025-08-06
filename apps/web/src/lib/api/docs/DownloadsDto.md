# DownloadsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**_default** | **string** | Default section which will be opened on the website | [default to undefined]
**featured** | **string** | Featured item on the website (an item after clicking which, user gets redirected to /latest) | [default to undefined]
**categories** | [**Array&lt;DownloadsCategoryDto&gt;**](DownloadsCategoryDto.md) | Categories of downloads on the website | [default to undefined]

## Example

```typescript
import { DownloadsDto } from './api';

const instance: DownloadsDto = {
    _default,
    featured,
    categories,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
