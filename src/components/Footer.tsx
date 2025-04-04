
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 bg-lavender/10 border-t border-lavender/20 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lavender-dark">Knitopia</h3>
            <p className="text-sm text-muted-foreground">
              Creating beautiful knitting patterns with the help of AI technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lavender-dark">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">API Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lavender-dark">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">Twitter</a></li>
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">Instagram</a></li>
              <li><a href="#" className="text-foreground hover:text-lavender transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-lavender/10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Knitopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
