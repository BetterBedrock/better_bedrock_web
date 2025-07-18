# CheckoutOptionGroupDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | Title of the group (e.g. Week, Month) | [default to undefined]
**items** | [**Array&lt;CheckoutOptionEntryDto&gt;**](CheckoutOptionEntryDto.md) | List of pricing entries for this group | [default to undefined]

## Example

```typescript
import { CheckoutOptionGroupDto } from './api';

const instance: CheckoutOptionGroupDto = {
    title,
    items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
