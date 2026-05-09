import Link from "next/link";
import { socialLinks } from "@/features/auth/components/SocialLinks";

const Footer = () => {
  return (
    <footer className="-mx-4 -mb-4 border-t border-green-700/20 bg-transparent px-4 py-2 text-white backdrop-blur-xl dark:border-white/10 dark:bg-[#020c06] dark:text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <p className="text-center sm:text-left">
          <span className="font-semibold text-white">© Copyrights</span>{" "}
          {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            BudgetBloom{" "}
          </span>
          | Built by{" "}
          <span className="font-medium text-white">Monjurul Alam</span>
        </p>

        <div className="flex items-center gap-2.5">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;

            return (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full border border-green-600/15 bg-green-600/10 text-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-green-500 dark:hover:text-white"
              >
                <Icon size={15} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
