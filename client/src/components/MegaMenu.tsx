import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategoryItem {
  title: string;
  href: string;
  description?: string;
}

interface MegaMenuSection {
  title: string;
  items: CategoryItem[];
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: MegaMenuSection[];
  featured?: {
    title: string;
    description: string;
    image?: string;
    href: string;
  };
}

export default function MegaMenu({ isOpen, onClose, sections, featured }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-2xl z-50"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link href={item.href}>
                            <a
                              onClick={onClose}
                              className="group flex items-center justify-between text-sm hover:text-primary transition-colors"
                            >
                              <div>
                                <div className="font-medium">{item.title}</div>
                                {item.description && (
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                {featured && (
                  <div className="md:col-span-1 bg-muted/30 rounded-lg p-6 hover-elevate transition-all">
                    <Link href={featured.href}>
                      <a onClick={onClose} className="block">
                        {featured.image && (
                          <div className="aspect-square rounded-md overflow-hidden mb-4">
                            <img
                              src={featured.image}
                              alt={featured.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold mb-2">{featured.title}</h3>
                        <p className="text-sm text-muted-foreground">{featured.description}</p>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
