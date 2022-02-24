export function checkNumericInput(value) {
  const regex = /^[0-9]{1,5}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export function checkAlphaInput(value) {
  const regex = /^[a-zA-Z]{2,}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export function checkAlphaNumericInput(value) {
  const regex = /^[a-zA-Z0-9]{2,}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}
