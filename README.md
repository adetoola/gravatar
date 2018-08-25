# Mailable

Mailable provides a clean, simple API over the popular NodeMailer library with drivers for SMTP, Mailgun, SparkPost, Amazon SES, allowing you to quickly get started sending mail through a local or cloud based service of your choice.

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
yarn add mailable
```

### Via Composer in package.json

Begin by installing `mailable` by editing your project's `package.json` file. Just add

``` json
    "dependencies": {
        ...
        "mailable": "^0.1.0"
    }
```

## Configuration

After installing, publish the package configuration file into your application by running

``` php
php artisan vendor:publish
```

And a `sms.php` file will be created in your `app/config` directory.

### Default SMS Gateway

You can specify any of the supported sms gateway from the list below:

- [x] Log
- [x] SMS247Live
- [ ] XWireless
- [ ] 50Kobo
- [ ] SMSTube

``` php
'default' => 'SMSLive247',
```

### SMS Gateway Credentials

Here you must specify credentials required from gateway

This credentials will be used to authenticate each activity on the chosen gateway API

``` php
'providers' => [

    'Log' => [
        'sender' =>env('SMS_SENDER', 'SENDER'),
    ],

    'SMS247Live' => [
        'sender' =>env('SMS_SENDER', 'SENDER'),
        'session_id' => env('SMS_SESSION_ID', 'SESSION_ID'),
    ],

    'X-Wireless' => [
        'sender' =>env('SMS_SENDER', 'SENDER'),
    ],

    '50Kobo' => [
        'sender' =>env('SMS_SENDER', 'SENDER'),
    ],

],
```

## Usage

Using SMS is quite simple.

```php

$sms = new Adetoola\SMS\SMS();
$sms->sender($sender)->country($country)->credentials($credentials)->gateway('SMSLive247');

$message_id = $sms->send('08123456789', 'Hi, I am using Adetoola SMS package');

echo $message_id;
```

### Methods

| Method                                                  | LOG   | SMS247LIVE | XWIRELESS | 50KOBO |
| ------------------------------------------------------- | ----- | ---------- | --------- | ------ |
| SMS::send($recipient, $msg [, $msg_type])               | **+** | **+**      | **+**     | **+**  |
| SMS::schedule($recipient, $msg, $datetime[, $msg_type]) | **-** | **+**      | **+**     | **+**  |
| SMS::balance()                                          | **-** | **+**      | **-**     | **+**  |
| SMS::charge($msg_id)                                    | **+** | **+**      | **+**     | **+**  |
| SMS::status($msg_id)                                    | **+** | **+**      | **+**     | **+**  |
| SMS::coverage($recipient)                               | **+** | **+**      | **+**     | **+**  |
| SMS::stop($msg_id)                                      | **-** | **+**      | **+**     | **+**  |
| SMS::history()                                          | **-** | **+**      | **+**     | **+**  |

### Valid Formats

| Input        | Description                                     | Accepted Formats                                      |
| ------------ | ----------------------------------------------- | ----------------------------------------------------- |
| `$recipient` | Comma separated numbers, number or array        | +2348012345678, 2348012345678, 8012345678, 0812345678 |
| `$msg`       | Text message which will be sent to the numbers. | [a-zA-Z0-9+_-."'\s]{1,160}                            |
| `$sender`    | Number to display as sender                     | [a-zA-Z0-9]{1,11}                                     |
| `$msg_type`  | Normal SMS or Flash                             | 0 or 1                                                |
| `$datetime`  | Datetime in format `Y-m-d H:i:s`.               | 2016-03-16 22:40:34                                   |
| `$msg_id`    | Message ID, provider by gateway                 | [a-zA-Z0-9]                                           |

### Example

``` php
#coming soon!
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CONDUCT](CONDUCT.md) for details.

## Security

If you discover any security related issues, please email adetola.onasanya@**gmail**.com instead of using the issue tracker.

## Credits

- [Adetola Onasanya](https://github.com/adetoola)

## License

SMS is an open-sourced package licensed under the [MIT license](http://opensource.org/licenses/MIT).
