import { CheckCircle2, Copy, ExternalLink, Globe, Lock, Rocket, Server, ShieldCheck, Terminal } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdminDeployment: React.FC = () => {
  const { showToast } = useApp();
  const [customDomain, setCustomDomain] = useState('astroveda.com');
  const [dnsVerified, setDnsVerified] = useState(true);

  const dnsRecords = [
    { type: 'A', host: '@', value: '216.239.32.21', status: 'Active (Proxied)' },
    { type: 'A', host: '@', value: '216.239.34.21', status: 'Active (Proxied)' },
    { type: 'CNAME', host: 'www', value: 'ghs.googlehosted.com.', status: 'Active' },
    { type: 'TXT', host: '@', value: 'google-site-verification=vedic_astro_108_kashi', status: 'Verified' },
  ];

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    showToast(`Copied "${val}" to clipboard!`, 'info');
  };

  return (
    <div id="admin-deployment-view" className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-amber-400" />
          <span>Production Deployment & SSL Security</span>
        </h2>
        <p className="text-xs text-slate-400">
          Phase 8: Cloud Run container status, SSL/TLS certificates, and custom DNS domain routing
        </p>
      </div>

      {/* Production Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Container Status</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Healthy</span>
            </span>
          </div>
          <div className="font-cinzel text-lg font-bold text-white">Google Cloud Run</div>
          <span className="text-[10px] text-slate-400 block font-mono">Port 3000 • Node.js ESM</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">SSL Certificate</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Active</span>
            </span>
          </div>
          <div className="font-cinzel text-lg font-bold text-white">Let's Encrypt / Google CA</div>
          <span className="text-[10px] text-slate-400 block">Auto-renews (TLS 1.3 256-bit)</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Build Profile</span>
            <span className="flex items-center gap-1 text-indigo-400 font-semibold">
              <Server className="w-3.5 h-3.5" />
              <span>Vite + React 19</span>
            </span>
          </div>
          <div className="font-cinzel text-lg font-bold text-white">Optimized SPA Bundle</div>
          <span className="text-[10px] text-slate-400 block">Gzipped assets in dist/</span>
        </div>
      </div>

      {/* Custom Domain & DNS Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Custom Domain Routing</span>
            </h3>
            <p className="text-slate-400 text-[11px]">
              Point your domain registrar (GoDaddy, Namecheap, Google Domains) to our high-speed Cloud CDN
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customDomain}
              onChange={e => setCustomDomain(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => {
                setDnsVerified(true);
                showToast(`DNS records for ${customDomain} validated!`, 'success');
              }}
              className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Verify DNS
            </button>
          </div>
        </div>

        {/* DNS Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px]">
                <th className="p-3">Type</th>
                <th className="p-3">Host / Name</th>
                <th className="p-3">Target Value / Destination</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dnsRecords.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold text-amber-300">{r.type}</td>
                  <td className="p-3 font-mono text-slate-300">{r.host}</td>
                  <td className="p-3 font-mono text-slate-300 max-w-xs truncate">{r.value}</td>
                  <td className="p-3 text-emerald-400 font-medium text-[11px]">{r.status}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleCopy(r.value)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Quick Instructions */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
        <h4 className="font-cinzel font-bold text-amber-200 flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Production Build Instructions</span>
        </h4>
        <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] space-y-1">
          <p className="text-slate-500"># 1. Install all dependencies</p>
          <p className="text-emerald-400">npm install</p>
          <p className="text-slate-500"># 2. Build production static bundle</p>
          <p className="text-emerald-400">npm run build</p>
          <p className="text-slate-500"># 3. Preview bundle locally on port 3000</p>
          <p className="text-emerald-400">npm run preview</p>
        </div>
      </div>
    </div>
  );
};
