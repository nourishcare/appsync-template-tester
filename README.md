# appsync-template-tester

![license](https://badgen.net/npm/license/appsync-template-tester)

Unit test AppSync VTL resolvers, with popular frameworks such as Jest.

## Use

### Example

```shell
yarn add appsync-template-tester --dev
```

```typescript
import Parser from 'appsync-template-tester';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load from a file (if not in a string already)
const templateFilePath = join(__dirname, './pathToFile.vtl');
const template = readFileSync(templateFilePath);

// Create the resolver
const parser = new Parser(template);

test('Test the resolver', () => {
  // The Appsync Context (ctx) object
  const context = {
    // For example with a dynamoDB response resolver:
    result: {
      id: 'testId',
      // ...
    },
  };

  // parser.resolve() automatically typecasts (note JSON becomes a JS object for ease of testing)
  const response = parser.resolve(context);

  // For convenience, the response is returned as a JS object rather than JSON
  expect(response.id).toBe('testId');
});
```

### Util helpers supported

This module supports all the provided core & time \$util methods, and most of the dynamodb methods. The underlying methods can be seen in the [Resolver Mapping Template Utility Reference
docs](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html).

> Note: The errors list is also not returned (but \$util.error will throw an error).

Support for the `#return` directive is also added (see [Pipeline Resolvers](https://docs.aws.amazon.com/appsync/latest/devguide/pipeline-resolvers.html) for how to use this directive)
is also added.

> Note: The actual `#return` directive will ignore any prior output but in this package the prior output will still be returned.
> It is suggested that you only do output at the end of your resolvers, in general this makes the resolvers easier to read, and
> will also mean that this limitation of the implementation of `#return` here will not matter.

## Contributors

[Original package](https://www.npmjs.com/package/appsync-template-tester) contributed by the team at [Skyhook](https://www.skyhookadventure.com/).

[This fork](https://github.com/CarePlanner/appsync-template-tester) maintained by [CarePlanner](https://www.care-planner.co.uk/).
