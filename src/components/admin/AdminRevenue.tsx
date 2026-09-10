import { CheckCircle2, CreditCard, Download, FileSpreadsheet, Filter, Search, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadInvoicePDF } from '../../utils/pdfGenerator';

export const AdminRevenue: React.FC = () => {
  const { transactions, appointments, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const filteredTx = useMemo(() => {
    return transactions.filter(t => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        t.customerName.toLowerCase().includes(q) ||
        t.customerEmail.toLowerCase().includes(q) ||
        t.razorpayPaymentId.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);

      const matchesMethod = methodFilter === 'all' || t.method === methodFilter;
      return matchesSearch && matchesMethod;
    });
  }, [transactions, search, methodFilter]);

  const totalCollected = transactions.reduce((sum, t) => sum + (t.status === 'Success' ? t.amount : 0), 0);
  const gstCollected = Math.round(totalCollected * 0.18);
  const netRevenue = totalCollected - gstCollected;

  const exportCSV = () => {
    const headers = ['Transaction ID', 'Customer Name', 'Email', 'Amount (INR)', 'Payment Method', 'Razorpay Payment ID', 'Status', 'Date'];
    const rows = filteredTx.map(t => [
      t.id,
      `"${t.customerName}"`,
      t.customerEmail,
      t.amount,
      t.method,
      t.razorpayPaymentId,
      t.status,
      t.date,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AstroVeda_Revenue_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Financial CSV ledger exported!', 'success');
  };

  return (
    <div id="admin-revenue-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-amber-400" />
            <span>Revenue Reports & Transaction Ledger</span>
          </h2>
          <p className="text-xs text-slate-400">
            Phase 3 & Phase 6: Razorpay settlement reconciliations, GST breakdowns, and downloadable invoices
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      {/* 3 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Total Gross Settlements
          </span>
          <span className="font-cinzel text-2xl font-bold text-amber-300">
            ₹{totalCollected.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-400 block mt-1">100% Razorpay Captured</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            GST Collected (18%)
          </span>
          <span className="font-cinzel text-2xl font-bold text-slate-100">
            ₹{gstCollected.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">GSTIN: 09AABCU9603R1ZM</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Net Sansthan Revenue
          </span>
          <span className="font-cinzel text-2xl font-bold text-emerald-400">
            ₹{netRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">Excluding 18% statutory tax</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by client name, email, transaction ID, or Razorpay ID..."
            className="w-full px-3.5 py-2 pl-9 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={methodFilter}
          onChange={e => setMethodFilter(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Payment Channels</option>
          <option value="UPI">UPI / QR Code</option>
          <option value="Credit Card">Credit / Debit Card</option>
          <option value="Netbanking">Netbanking</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Tx ID & Razorpay ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Amount (INR)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredTx.map(tx => {
                const appt = appointments.find(a => a.id === tx.appointmentId);

                return (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-200 block">{tx.id}</span>
                      <span className="font-mono text-[10px] text-amber-400/90">{tx.razorpayPaymentId}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-100">{tx.customerName}</div>
                      <div className="text-[10px] text-slate-400">{tx.customerEmail}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                        {tx.method}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-cinzel font-bold text-amber-300 text-sm">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{tx.status}</span>
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {new Date(tx.date).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>

                    <td className="p-3.5 text-right">
                      {appt && (
                        <button
                          onClick={() => {
                            downloadInvoicePDF(appt);
                            showToast(`Invoice generated for ${tx.id}`, 'success');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] flex items-center gap-1 ml-auto transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
