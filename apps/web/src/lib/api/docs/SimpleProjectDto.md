# SimpleProjectDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | [**ProjectType**](ProjectType.md) |  | [default to undefined]
**user** | [**UserNameDto**](UserNameDto.md) |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**thumbnail** | **string** |  | [default to undefined]
**tags** | [**Array&lt;TagNameDto&gt;**](TagNameDto.md) |  | [default to undefined]
**lastChanged** | **string** |  | [default to undefined]
**betterBedrockContent** | **boolean** |  | [default to undefined]
**draft** | **boolean** |  | [default to undefined]

## Example

```typescript
import { SimpleProjectDto } from './api';

const instance: SimpleProjectDto = {
    type,
    user,
    id,
    title,
    thumbnail,
    tags,
    lastChanged,
    betterBedrockContent,
    draft,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
