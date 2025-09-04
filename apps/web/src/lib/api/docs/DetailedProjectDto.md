# DetailedProjectDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **{ [key: string]: any; }** |  | [default to undefined]
**type** | [**ProjectType**](ProjectType.md) |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**draft** | **boolean** |  | [default to undefined]
**submitted** | **boolean** |  | [default to undefined]
**itemWeight** | **number** |  | [default to undefined]
**betterBedrockContent** | **boolean** |  | [default to undefined]
**lastChanged** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**error** | **string** |  | [default to undefined]
**thumbnail** | **string** |  | [default to undefined]
**downloadFile** | **string** |  | [default to undefined]
**tags** | [**Array&lt;TagNameDto&gt;**](TagNameDto.md) |  | [default to undefined]
**userId** | **string** |  | [default to undefined]
**user** | [**ProjectCreatorDto**](ProjectCreatorDto.md) |  | [default to undefined]
**rating** | [**ProjectRatingDto**](ProjectRatingDto.md) |  | [default to undefined]

## Example

```typescript
import { DetailedProjectDto } from './api';

const instance: DetailedProjectDto = {
    description,
    type,
    title,
    id,
    draft,
    submitted,
    itemWeight,
    betterBedrockContent,
    lastChanged,
    createdAt,
    error,
    thumbnail,
    downloadFile,
    tags,
    userId,
    user,
    rating,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
