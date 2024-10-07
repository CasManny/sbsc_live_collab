import { cn } from "@/lib/utils";
import { FilesIcon, FolderArchive } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};
const Header = ({ children }: Props) => {
  return (
    <header className={cn("header")}>
      <Link href={"/"} className="flex items-center">
        <FilesIcon className="text-sbsc mr-1" />
        <h1 className="text-sbsc font-bold">SBSC-COLLAB</h1>
      </Link>
      {children}
    </header>
  );
};

export default Header;
