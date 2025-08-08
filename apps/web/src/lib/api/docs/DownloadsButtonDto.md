# DownloadsButtonDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | [**DownloadsButtonType**](DownloadsButtonType.md) |  | [default to undefined]
**text** | **string** | Button inside the category yet not responsible for downloads | [default to undefined]
**link** | **string** | Link of redirection on button click (can be left if notification is prefered) | [optional] [default to undefined]
**notification** | [**DownloadsNotificationDto**](DownloadsNotificationDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { DownloadsButtonDto } from './api';

const instance: DownloadsButtonDto = {
    type,
    text,
    link,
    notification,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
