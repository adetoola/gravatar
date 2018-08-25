import Gravatar from '../gravatar';
import * as url from 'url';
import * as md5 from 'md5';

describe('gravatar', () => {
  let gravatar: Gravatar;

  const UNSECURED_URL = 'http://www.gravatar.com/avatar/';
  const SECURED_URL = 'https://s.gravatar.com/avatar/';
  const PROFILE_URL = 'http://www.gravatar.com/';
  const PROFILE_SECURE_URL = 'https://secure.gravatar.com/';
  const VALID_EMAIL = 'adetola.onasanya@gmail.com';
  const VALID_EMAIL_CASE = 'aDetoLa.oNasAnya@gMail.COM';
  const VALID_EMAIL_HASH = 'f7eb4ba5b722241a008fc2309613e8a0';
  const INVALID_EMAIL = '45503aaa7bc259c0ef5bba9997b77875@examplE.com';
  const UNSPECIFIED_HASH = 'd415f0e30c471dfdd9bc4f827329ef48';

  beforeEach(() => {
    gravatar = new Gravatar();
  });

  it('should generate correct uri given an email', () => {
    expect(gravatar.url(VALID_EMAIL)).toEqual(SECURED_URL + VALID_EMAIL_HASH);
    expect(gravatar.url(VALID_EMAIL)).toEqual(SECURED_URL + VALID_EMAIL_HASH);
    expect(gravatar.url('foo@bar.baz')).toEqual(
      SECURED_URL + md5('foo@bar.baz'),
    );
  });

  it('should generate same uri ignoring case', () => {
    expect(gravatar.url(VALID_EMAIL_CASE)).toEqual(
      SECURED_URL + VALID_EMAIL_HASH,
    );
  });

  it('should detect MD5 hashes and not hash them again', () => {
    expect(gravatar.url(VALID_EMAIL_HASH)).toEqual(
      SECURED_URL + VALID_EMAIL_HASH,
    );
  });

  it('should generate uri with user passed parameters', () => {
    const gravatarURL = gravatar.url(VALID_EMAIL_HASH, {
      size: '200',
      forcedefault: true,
      rating: 'g',
      default: '404',
    });
    const queryString = url.parse(gravatarURL, true).query;
    expect(queryString.size).toEqual('200');
    expect(queryString.forcedefault).toBeTruthy();
    expect(queryString.rating).toEqual('g');
    expect(queryString.default).toEqual('404');
  });

  it('should force http protocol on gravatar uri generation', () => {
    expect(gravatar.url(VALID_EMAIL, {}, false)).toEqual(
      UNSECURED_URL + VALID_EMAIL_HASH,
    );
    expect(gravatar.url(VALID_EMAIL_HASH, {}, false)).toEqual(
      UNSECURED_URL + VALID_EMAIL_HASH,
    );
  });

  it('should force https protocol on gravatar uri generation', () => {
    expect(gravatar.url(VALID_EMAIL, {}, true)).toEqual(
      SECURED_URL + VALID_EMAIL_HASH,
    );
    expect(gravatar.url(VALID_EMAIL_HASH, {}, true)).toEqual(
      SECURED_URL + VALID_EMAIL_HASH,
    );
  });

  it('should handle falsey values for the email property', () => {
    expect(gravatar.url(null)).toBeDefined();
    expect(gravatar.url(undefined)).toBeDefined();
    expect(gravatar.url('')).toBeDefined();
  });

  it('should handle non string values for the email property', () => {
    expect(gravatar.url({}, {}, true)).toEqual(SECURED_URL + UNSPECIFIED_HASH);
    expect(gravatar.url(3, {}, true)).toEqual(SECURED_URL + UNSPECIFIED_HASH);
    expect(gravatar.url(true, {}, true)).toEqual(
      SECURED_URL + UNSPECIFIED_HASH,
    );
  });

  it('should generate profile url', () => {
    expect(gravatar.profile(VALID_EMAIL_HASH, {}, true)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.json',
    );
    expect(gravatar.profile(VALID_EMAIL_HASH, { format: 'xml' }, true)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.xml',
    );
    expect(gravatar.profile(VALID_EMAIL_HASH, { format: 'qr' }, true)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.qr',
    );
    expect(gravatar.profile(VALID_EMAIL_HASH)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.json',
    );
  });

  it('should generate profile url', () => {
    expect(gravatar.profile_url(VALID_EMAIL_HASH, {}, true)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.json',
    );
    expect(
      gravatar.profile_url(VALID_EMAIL_HASH, { format: 'xml' }, true),
    ).toEqual(PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.xml');
    expect(
      gravatar.profile_url(VALID_EMAIL_HASH, { format: 'qr' }, true),
    ).toEqual(PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.qr');
    expect(gravatar.profile_url(VALID_EMAIL_HASH)).toEqual(
      PROFILE_SECURE_URL + 'f7eb4ba5b722241a008fc2309613e8a0.json',
    );
  });

  it('should generate unspecified profile url when email is null', () => {
    expect(gravatar.profile(null, {}, true)).toEqual(
      PROFILE_SECURE_URL + UNSPECIFIED_HASH + '.json',
    );
    expect(gravatar.profile(undefined, {}, true)).toEqual(
      PROFILE_SECURE_URL + UNSPECIFIED_HASH + '.json',
    );
  });

  it('should generate uri with user passed parameters in options', () => {
    const gravatarURL = gravatar.url(VALID_EMAIL_HASH, {
      size: '200',
      forcedefault: true,
      rating: 'g',
      default: '404',
    });
    const queryString = url.parse(gravatarURL, true).query;
    expect({
      size: '200',
      forcedefault: 'y',
      rating: 'g',
      default: '404',
    }).toEqual(expect.objectContaining(queryString));
  });

  it('should check if a gravatar exist', () => {
    expect(gravatar.isGravatar(VALID_EMAIL)).toBeTruthy();
    expect(gravatar.isGravatar(INVALID_EMAIL)).toBeFalsy();
  });
});
