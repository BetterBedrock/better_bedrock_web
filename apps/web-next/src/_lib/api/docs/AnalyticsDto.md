# AnalyticsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | [**AnalyticsType**](AnalyticsType.md) |  | [default to undefined]
**name** | [**AnalyticsNames**](AnalyticsNames.md) |  | [default to undefined]
**id** | **string** | Unique identifier of the analytics entry | [default to undefined]
**date** | **string** | The date when the analytics data was recorded | [default to undefined]
**value** | **number** | The numeric value associated with the analytics entry | [default to undefined]

## Example

```typescript
import { AnalyticsDto } from './api';

const instance: AnalyticsDto = {
    type,
    name,
    id,
    date,
    value,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
