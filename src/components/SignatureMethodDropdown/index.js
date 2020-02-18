import React from "react";

import Dropdown from "components/Dropdown";

function SignatureMethodDropdown({ label, value, setValue }){
  return (
    <Dropdown label={label} value={value} setValue={setValue}>
      <option value="md5hash">MD5 HASH signature</option>
      <option value="md5">MD5 HMAC signature</option>
      <option value="sha1">SHA1 HMAC signature</option>
      <option value="sha256">SHA-256 HMAC signature</option>
      <option value="sha512">SHA-512 HMAC signature</option>
    </Dropdown>
  )
}
export default SignatureMethodDropdown;