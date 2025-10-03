import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ShoppingBag, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            
            <div className="relative p-8 sm:p-12 md:p-16 text-center">
              {/* 404 Text */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-serif font-light text-primary/20 leading-none mb-2">
                  404
                </h1>
                <div className="h-1 w-24 bg-primary mx-auto mb-6" />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-8 space-y-3"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-3">
                  Page Not Found
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
                  We couldn't find the page you're looking for. It might have been moved or no longer exists.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              >
                <Link href="/">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    <ShoppingBag className="h-4 w-4" />
                    Browse Products
                  </Button>
                </Link>
              </motion.div>

              {/* Helper Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8"
              >
                <Link href="/">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    Return to previous page
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Need help? Contact our support team
        </motion.div>
      </motion.div>
    </div>
  );
}
