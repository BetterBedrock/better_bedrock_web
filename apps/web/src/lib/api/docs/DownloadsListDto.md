# DownloadsListDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Title of the list | [default to undefined]
**description** | **string** | Description of the list | [default to undefined]
**buttons** | [**Array&lt;DownloadsButtonDto&gt;**](DownloadsButtonDto.md) |  | [optional] [default to undefined]
**items** | [**Array&lt;DownloadsItemDto&gt;**](DownloadsItemDto.md) |  | [default to undefined]

## Example

```typescript
import { DownloadsListDto } from './api';

const instance: DownloadsListDto = {
    title,
    description,
    buttons,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
