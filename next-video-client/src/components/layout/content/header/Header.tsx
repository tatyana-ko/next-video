import { HeaderLinks } from "./HeaderLinks";
import { HeaderProfile } from "./profile/HeaderProfile";
import { SearchField } from "./SearchField";

export function Header() {
  return <header className="flex items-center justify-between mb-4 border-b border-gray-500 p-2">
    <SearchField />

    <div className="flex items-center gap-5">
      <HeaderLinks />
      <HeaderProfile />
    </div>
  </header>
}
