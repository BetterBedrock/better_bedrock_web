# DownloadsItemDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**buttonType** | [**DownloadsButtonType**](DownloadsButtonType.md) |  | [default to undefined]
**title** | **string** | Title of the item | [default to undefined]
**creator** | **string** | Creator of the download item | [default to undefined]
**description** | **string** | Description of the item | [default to undefined]
**downloadId** | **string** | Id of the item &amp; file name used when downloading and fetching file from the server | [default to undefined]
**itemWeight** | **number** | Weigh of the download item | [default to undefined]
**imageAssetUrl** | **Array&lt;string&gt;** | Image urls used for download items with preview option | [default to undefined]
**richDescription** | [**Array&lt;DownloadsRichDescriptionDto&gt;**](DownloadsRichDescriptionDto.md) |  | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** | Tags displayed inside the download grid card | [optional] [default to undefined]
**titleColor** | **string** | Color of the text inside the download card | [optional] [default to undefined]
**betterBedrockContent** | **boolean** | Determines whether the item is considered better bedrock content | [optional] [default to undefined]
**tagBgColor** | **string** |  | [optional] [default to undefined]

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
    tagBgColor,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
