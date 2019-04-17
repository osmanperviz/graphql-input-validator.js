# input-validator

This package validates and format user input especially for Graph QL servers.

## Example

``` javascript
const {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLString
} = require('graphql')
const inputValidator = require('./input-validator')

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    email: {
      type: GraphQLString,
      format: 'url',
      maximumLength: 100,
      normalizeFormat: true
    }
  }
})
const inputSchema = inputValidator.createSchemaFromInputType(createUserInputType)

const input = {
  url: 'www.someCoollWebSite.com'
}  
const {cleanedInput, errors} = inputValidator.validateAndFormatInput({input, inputSchema})
```

### Supported fields

The following fields are supported for arrays:
* maximumItems: number
* minimumItems: number
* uniqueItems: boolean

The following fields are supported for numbers:
* minimumValue: number
* maximumValue: number

The following fields are supported for strings:
* countryIsoCodeField: string
* enum: array of valid string values
* format: string
  * email
  * date
  * dateTime
  * mobile
  * iban
  * loginId
  * password
  * postalCode
  * time
  * url
  * vatIdentificationNumber
  * week
* maximumLength: number
* minimumLength: number
* normalizeFormat: boolean
* required: boolean (Will be automatically set for non null fields.)
* toLowerCase: boolean
* toUpperCase: boolean
* trim: boolean
* validateFormat: boolean
