# PriceOptionDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**price** | **number** | Price in EUR | [default to undefined]
**label** | **string** | Description of the pricing option | [default to undefined]
**title** | **string** | A title for the DownloadMethodCard | [default to undefined]
**featured** | **boolean** | Whether this option is featured | [default to undefined]
**maxDownloads** | **number** | How many dowloads does user get with the voucher | [default to undefined]
**expiresAt** | **number** | How many days from today does user have to use the voucher | [default to undefined]
**betterBedrockContentOnly** | **boolean** | Specifies whether the voucher allows for download of Better Bedrock content | [default to undefined]

## Example

```typescript
import { PriceOptionDto } from './api';

const instance: PriceOptionDto = {
    price,
    label,
    title,
    featured,
    maxDownloads,
    expiresAt,
    betterBedrockContentOnly,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
