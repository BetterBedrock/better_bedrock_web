# DownloadsItemDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**buttonType** | [**DownloadsButtonType**](DownloadsButtonType.md) |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**creator** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**downloadId** | **string** |  | [default to undefined]
**itemWeight** | **number** |  | [default to undefined]
**imageAssetUrl** | **Array&lt;string&gt;** |  | [default to undefined]
**richDescription** | [**Array&lt;DownloadsRichDescriptionDto&gt;**](DownloadsRichDescriptionDto.md) |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**titleColor** | **string** |  | [optional] [default to undefined]
**betterBedrockContent** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { DownloadsItemDto } from './api';

const instance: DownloadsItemDto = {
    buttonType,
    title,
    creator,
    description,
    downloadId,
    itemWeight,
    imageAssetUrl,
    richDescription,
    tags,
    titleColor,
    betterBedrockContent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
