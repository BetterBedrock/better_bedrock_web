# UpdateProjectDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**type** | [**ProjectType**](ProjectType.md) |  | [optional] [default to undefined]
**thumbnail** | **string** |  | [optional] [default to undefined]
**tags** | [**Array&lt;TagNameDto&gt;**](TagNameDto.md) |  | [optional] [default to undefined]
**betterBedrockContent** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateProjectDto } from './api';

const instance: UpdateProjectDto = {
    description,
    type,
    thumbnail,
    tags,
    betterBedrockContent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
