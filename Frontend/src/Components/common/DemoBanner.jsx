import { useState } from 'react';
import { IS_DEMO } from '../../lib/api';
import { DEMO_ADMIN } from '../../lib/demo/fixtures';

// Only ever rendered on the hosted build, where there is no backend to talk to.
export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (!IS_DEMO || dismissed) return null;

  return (
    <div className="demo-banner">
      <span>
        <strong>Demo mode.</strong> Data is bundled with the app and saved in your browser.
        Admin sign-in: <code>{DEMO_ADMIN.email}</code> / <code>{DEMO_ADMIN.password}</code>
      </span>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss demo notice">
        ×
      </button>
    </div>
  );
}
