import { Calendar, Eye, Mail, MapPin, Phone, Search, ShieldCheck, User, Users, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const AdminUsers: React.FC = () => {
  const { users, appointments } = useApp();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const q = search.toLowerCase();
      return (
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        (u.birthDetails?.pob && u.birthDetails.pob.toLowerCase().includes(q))
      );
    });
  }, [users, search]);

  const getUserAppointments = (userEmail: string) => {
    return appointments.filter(a => a.customerEmail.toLowerCase() === userEmail.toLowerCase());
  };

  return (
    <div id="admin-users-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Seekers & Client Directory</span>
          </h2>
          <p className="text-xs text-slate-400">
            Phase 6 User Management: Customer history, natal coordinates, and consultation records
          </p>
        </div>

        <div className="text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
          Total Registered: <strong>{users.length}</strong> Seekers
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by client name, email, phone, or birth city..."
          className="w-full px-3.5 py-2 pl-9 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Seeker Name</th>
                <th className="p-3.5">Contact Channels</th>
                <th className="p-3.5">Birth Coordinates</th>
                <th className="p-3.5">Sessions</th>
                <th className="p-3.5">Total Spent</th>
                <th className="p-3.5">Registered</th>
                <th className="p-3.5 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredUsers.map(u => {
                const userAppts = getUserAppointments(u.email);
                const totalSpent = userAppts.reduce((sum, a) => sum + (a.paymentStatus === 'Paid' ? a.amount : 0), 0);

                return (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-100 block">{u.name}</span>
                          <span className="text-[10px] text-slate-500">ID: {u.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200">{u.email}</div>
                      <div className="text-[10px] text-slate-400">{u.phone}</div>
                    </td>

                    <td className="p-3.5">
                      {u.birthDetails ? (
                        <div>
                          <span className="text-slate-200 block">{u.birthDetails.dob} ({u.birthDetails.tob})</span>
                          <span className="text-[10px] text-amber-400/80">{u.birthDetails.pob}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">Not recorded</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold text-[11px]">
                        {userAppts.length} Bookings
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-cinzel font-bold text-amber-300 text-xs">
                        ₹{totalSpent.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1 text-[11px] ml-auto transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View History</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User History Dossier Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-sm border border-amber-500/30">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">{selectedUser.name}</h3>
                  <span className="text-[10px] text-slate-400">{selectedUser.email} • {selectedUser.phone}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Birth details summary */}
            {selectedUser.birthDetails && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                  Natal Coordinates
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>• Gender: {selectedUser.birthDetails.gender}</div>
                  <div>• Date: {selectedUser.birthDetails.dob}</div>
                  <div>• Time: {selectedUser.birthDetails.tob}</div>
                  <div>• Place: {selectedUser.birthDetails.pob}</div>
                </div>
              </div>
            )}

            {/* Consultation History */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200">Consultation History</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {getUserAppointments(selectedUser.email).length === 0 ? (
                  <p className="text-slate-500 italic">No bookings recorded for this seeker.</p>
                ) : (
                  getUserAppointments(selectedUser.email).map(a => (
                    <div
                      key={a.id}
                      className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-slate-100 block">{a.serviceTitle}</span>
                        <span className="text-[10px] text-slate-400">{a.date} • {a.timeSlot}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-cinzel font-bold text-amber-300 block">₹{a.amount}</span>
                        <span className="text-[10px] text-emerald-400">{a.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
