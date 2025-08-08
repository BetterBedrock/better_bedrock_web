# DownloadsCategoryDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Id of the category (also used in url as a way to determine which category to open) | [default to undefined]
**name** | **string** | Name of the category | [default to undefined]
**lists** | [**Array&lt;DownloadsListDto&gt;**](DownloadsListDto.md) |  | [default to undefined]

## Example

```typescript
import { DownloadsCategoryDto } from './api';

const instance: DownloadsCategoryDto = {
    id,
    name,
    lists,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
