export function transformUserInitials(fullName:string | undefined): string {
  if(!fullName) return 'Anonymous';

  const [firstName, lastName] = fullName.split(' ');

  return `${firstName.charAt(0)} ${lastName.charAt(0)}`
}