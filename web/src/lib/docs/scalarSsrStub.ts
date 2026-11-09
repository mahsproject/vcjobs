// Vercel deployment stub: avoids bundling 5,500+ @scalar/* files into serverless function.
// ScalarReference mounts in the browser client-side via createApiReference('#scalar-app').
export function renderApiReferenceToString(): string {
  return '';
}

export default { renderApiReferenceToString };
