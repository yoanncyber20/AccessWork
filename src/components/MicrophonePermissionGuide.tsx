import React from 'react';
import { AlertCircle, Chrome, CheckCircle } from 'lucide-react';

export default function MicrophonePermissionGuide() {
  return (
    <div className="bg-muted/20 border-2 border-border rounded-2xl p-4 space-y-4">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-warning" />
        </div>
        <div>
          <h3 className="font-medium">How to Enable Microphone Access</h3>
          <p className="caption-text text-muted-foreground">
            Follow these steps to grant permission:
          </p>
        </div>
      </div>

      {/* Chrome/Edge Instructions */}
      <div className="bg-card rounded-xl p-3 border border-border space-y-2">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Chrome className="w-4 h-4" />
          <span className="caption-text font-medium">Chrome / Edge</span>
        </div>
        
        <ol className="space-y-1.5 pl-5 list-decimal text-xs text-muted-foreground">
          <li>
            Look for the <strong className="text-foreground">🎤 microphone icon</strong> in your address bar
          </li>
          <li>
            Click it and select <strong className="text-foreground">"Allow"</strong>
          </li>
          <li>
            Or click the <strong className="text-foreground">🔒 lock icon</strong> → Microphone → Allow
          </li>
          <li>
            Reload the page
          </li>
        </ol>
      </div>

      {/* Safari Instructions */}
      <div className="bg-card rounded-xl p-3 border border-border space-y-2">
        <div className="flex items-center gap-2 text-primary mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm3.833 6.667L12 13.5l-3.833-2.833L12 7.833l3.833 2.834z"/>
          </svg>
          <span className="caption-text font-medium">Safari (Mac)</span>
        </div>
        
        <ol className="space-y-1.5 pl-5 list-decimal text-xs text-muted-foreground">
          <li>
            Safari → Settings → <strong className="text-foreground">Websites</strong> tab
          </li>
          <li>
            Select <strong className="text-foreground">Microphone</strong> from sidebar
          </li>
          <li>
            Find this site → Set to <strong className="text-foreground">Allow</strong>
          </li>
          <li>
            Reload the page
          </li>
        </ol>
      </div>

      {/* Mobile Instructions */}
      <div className="bg-card rounded-xl p-3 border border-border space-y-2">
        <div className="flex items-center gap-2 text-primary mb-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" fill="none" strokeWidth="2"/>
            <circle cx="12" cy="18" r="1"/>
          </svg>
          <span className="caption-text font-medium">Mobile (iOS/Android)</span>
        </div>
        
        <ol className="space-y-1.5 pl-5 list-decimal text-xs text-muted-foreground">
          <li>
            When prompted, tap <strong className="text-foreground">"Allow"</strong>
          </li>
          <li>
            If missed: Device Settings → Safari/Chrome
          </li>
          <li>
            Enable <strong className="text-foreground">Microphone</strong> permission
          </li>
        </ol>
      </div>

      {/* Success Indicators */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-success font-medium mb-1">
              Success Indicator
            </p>
            <p className="text-xs text-muted-foreground">
              You'll see a 🔴 red dot in your browser tab when the microphone is active.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <details className="bg-muted/30 rounded-xl border border-border">
        <summary className="cursor-pointer p-3 text-xs font-medium hover:bg-muted/50 rounded-xl transition-colors">
          Still having issues? Click for troubleshooting
        </summary>
        <ul className="space-y-1.5 p-3 pt-0 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Ensure microphone is connected and working</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Test microphone in other apps</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Clear browser cache and reload</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use keyboard navigation (Tab key) as alternative</span>
          </li>
        </ul>
      </details>
    </div>
  );
}
