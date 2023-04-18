export const formatAddress = (address: any) => {
  if (address) {
    return `${address.addressLine1}, ${address.city}, ${address.state} ${address.zip}`;
  }

  return null;
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});