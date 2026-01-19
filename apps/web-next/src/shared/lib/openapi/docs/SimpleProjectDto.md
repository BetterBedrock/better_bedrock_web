# SimpleProjectDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | [**ProjectType**](ProjectType.md) |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**thumbnail** | **string** |  | [default to undefined]
**tags** | [**Array&lt;TagNameDto&gt;**](TagNameDto.md) |  | [default to undefined]
**lastChanged** | **string** |  | [default to undefined]
**betterBedrockContent** | **boolean** |  | [default to undefined]
**draft** | **boolean** |  | [default to undefined]
**userId** | **string** |  | [default to undefined]
**itemWeight** | **number** |  | [default to undefined]
**submitted** | **boolean** |  | [default to undefined]
**user** | [**ProjectCreatorDto**](ProjectCreatorDto.md) |  | [default to undefined]
**rating** | [**ProjectRatingDto**](ProjectRatingDto.md) |  | [default to undefined]

## Example

```typescript
import { SimpleProjectDto } from './api';

const instance: SimpleProjectDto = {
    type,
    id,
    title,
    thumbnail,
    tags,
    lastChanged,
    betterBedrockContent,
    draft,
    userId,
    itemWeight,
    submitted,
    user,
    rating,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
