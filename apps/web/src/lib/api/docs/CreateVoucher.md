# CreateVoucher


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | Email associated with the voucher | [default to undefined]
**checkoutId** | **string** | Unique checkout session ID associated with the voucher | [optional] [default to undefined]
**code** | **string** | Unique voucher code | [default to undefined]
**expiresAt** | **string** | Expiry date of the voucher | [default to undefined]
**maxDownloads** | **number** | Maximum number of times the voucher can be downloaded | [default to undefined]
**downloadCount** | **number** | Current number of times the voucher has been downloaded | [default to undefined]
**betterBedrockContentOnly** | **boolean** | Restrict voucher to Better Bedrock content only | [default to undefined]
**blocked** | **boolean** | Determins whether voucher is blocked | [default to undefined]

## Example

```typescript
import { CreateVoucher } from './api';

const instance: CreateVoucher = {
    email,
    checkoutId,
    code,
    expiresAt,
    maxDownloads,
    downloadCount,
    betterBedrockContentOnly,
    blocked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
