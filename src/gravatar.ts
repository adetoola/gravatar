import axios from 'axios';
import * as md5 from 'md5';
import * as querystring from 'querystring';
import IOptions from './interfaces/IOptions';

export default class Gravatar {
  private MD5_REGEX = /^[0-9a-f]{32}$/;

  private GRAVATAR_URL = 'http://www.gravatar.com/avatar/';
  private S_GRAVATAR_URL = 'https://s.gravatar.com/avatar/';

  private PROFILE_URL = 'http://www.gravatar.com/';
  private S_PROFILE_URL = 'https://secure.gravatar.com/';
  private isValid;

  url(email, options: IOptions = {}, secured: boolean = true): string {
    const baseURL = secured ? this.S_GRAVATAR_URL : this.GRAVATAR_URL;
    const query = this.getQueryString(options);
    return baseURL + this.getHash(email) + query;
  }

  profile(email, options: IOptions = {}, secured: boolean = true) {
    const format =
      options !== undefined && options.format !== undefined
        ? String(options.format)
        : 'json';

    const baseURL = secured ? this.S_PROFILE_URL : this.PROFILE_URL;
    const query = this.getQueryString(options);
    return baseURL + this.getHash(email) + '.' + format + query;
  }

  profile_url(email, options: IOptions = {}, secured: boolean = true) {
    return this.profile(email, options, secured);
  }

  async isGravatar(email: string): Promise<boolean> {
    // Craft a potential url and test its headers
    const hash = this.getHash(email);
    const uri = `${this.GRAVATAR_URL}${hash}?d=404`;

    return new Promise<boolean>(async resolve => {
      const result = await axios.get(uri, {
        validateStatus: status => {
          // tslint:disable-line
          return status < 500; // Reject only if the status code is greater than or equal to 500
        },
      });

      const status: boolean = result.status === 200 ? true : false;
      resolve(status);
    });
  }

  private params(options: IOptions): object {
    // The Gravatar API Spec only accepts 'y' as the option for `forcedefault`
    // The following code will transform it into the acceptable format.
    options.forcedefault === true
      ? (options.forcedefault = 'y')
      : delete options.forcedefault;

    const params = {},
      removing = { format: 1 };
    for (const key in options) {
      if (!removing[key]) params[key] = options[key];
    }
    return params;
  }

  private getHash(email: string) {
    email =
      typeof email === 'string' ? email.trim().toLowerCase() : 'unspecified';
    return email.match(this.MD5_REGEX) ? email : md5(email);
  }

  private getQueryString(options) {
    const queryData = querystring.stringify(this.params(options));
    return (queryData && '?' + queryData) || '';
  }
}
