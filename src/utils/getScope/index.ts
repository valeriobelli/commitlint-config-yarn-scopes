export const getScope = (packageName: string) => {
  if (packageName.charAt(0) === '@') {
    return packageName.split('/')[1]
  }

  return packageName
}
