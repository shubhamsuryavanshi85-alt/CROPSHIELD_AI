import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CropShield UI Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 bg-white rounded-2xl border border-danger-red/30 shadow-2xl text-center space-y-4">
          <div className="w-12 h-12 bg-danger-red/10 text-danger-red rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-xl text-soil-dark">Component Render Warning</h2>
          <p className="text-xs text-soil-dark/70 max-w-md mx-auto">
            An issue occurred while rendering this section. The application recovered automatically.
          </p>
          <div className="text-[11px] font-mono-data bg-soil-dark/5 p-3 rounded text-left text-danger-red overflow-x-auto max-h-32">
            {this.state.error?.toString()}
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-field-green text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow hover:bg-field-dark transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Reset & Reload View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
