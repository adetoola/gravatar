[![Build Status](https://secure.travis-ci.org/adetoola/gravatar.svg)](http://travis-ci.org/adetoola/gravatar)

# Gravatar - Node.js

Gravatar provides a clean, simple API Gravatar service.

## Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#credits)
- [License](#license)

## Installation

### Via Bash in Terminal

``` bash
yarn add gravatar2
```

### Via Composer in package.json

Begin by installing `gravatar2` by editing your project's `package.json` file. Just add

``` json
    "dependencies": {
        ...
        "gravatar2": "^0.1.0"
    }
```

## Usage

Using gravatar is quite simple.

```javascript
import Gravatar from 'gravatar2';
const gravatar = new Gravatar();

gravatar.url(email);
gravatar.url(email, options);
gravatar.url(email, options, secured);

gravatar.profile(email);
gravatar.profile(email, options);
gravatar.profile(email, options, secured);

gravatar.isGravatar(email);
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CONDUCT](CONDUCT.md) for details.

## Security

If you discover any security related issues, please email adetola.onasanya@**gmail**.com instead of using the issue tracker.

## Credits

- Heavily inspired by (<https://github.com/emerleite/node-gravatar/>)

## License

SMS is an open-sourced package licensed under the [MIT license](http://opensource.org/licenses/MIT).
