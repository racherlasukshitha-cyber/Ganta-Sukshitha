import { Check, Edit, Plus, Sparkles, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Service, ServiceCategory } from '../../types';

export const AdminServices: React.FC = () => {
  const { services, updateService, addService, deleteService, showToast } = useApp();

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states for edit/add
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('kundli');
  const [price, setPrice] = useState(1499);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(2499);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [shortDescription, setShortDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [popular, setPopular] = useState(false);
  const [active, setActive] = useState(true);

  const startEdit = (srv: Service) => {
    setEditingService(srv);
    setIsAddingNew(false);
    setTitle(srv.title);
    setHindiTitle(srv.hindiTitle || '');
    setCategory(srv.category);
    setPrice(srv.price);
    setOriginalPrice(srv.originalPrice);
    setDurationMinutes(srv.durationMinutes);
    setShortDescription(srv.shortDescription);
    setFeaturesText(srv.features.join('\n'));
    setPopular(srv.popular || false);
    setActive(srv.active);
  };

  const startAdd = () => {
    setEditingService(null);
    setIsAddingNew(true);
    setTitle('');
    setHindiTitle('');
    setCategory('kundli');
    setPrice(1499);
    setOriginalPrice(2499);
    setDurationMinutes(45);
    setShortDescription('');
    setFeaturesText('Vedic Janam Kundli Analysis\nPlanetary Dasha Timings\nCustom Gemstone Prescription');
    setPopular(false);
    setActive(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      showToast('Please fill in the title and description.', 'error');
      return;
    }

    const feats = featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingService) {
      updateService({
        ...editingService,
        title,
        hindiTitle,
        category,
        price,
        originalPrice,
        durationMinutes,
        shortDescription,
        features: feats,
        popular,
        active,
      });
      showToast(`Service "${title}" updated successfully!`, 'success');
      setEditingService(null);
    } else if (isAddingNew) {
      addService({
        title,
        hindiTitle,
        category,
        price,
        originalPrice,
        durationMinutes,
        shortDescription,
        features: feats,
        popular,
        active,
        iconName: 'Sparkles',
      });
      showToast(`New service "${title}" created!`, 'success');
      setIsAddingNew(false);
    }
  };

  return (
    <div id="admin-services-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Vedic Astrology Services & Consultation Fees</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure offered consultation types, pricing, duration, and promotional badges
          </p>
        </div>

        <button
          type="button"
          onClick={startAdd}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Consultation</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Service Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Consultation Fee</th>
                <th className="p-3.5">Badge</th>
                <th className="p-3.5">Visibility</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {services.map(srv => (
                <tr key={srv.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-100">{srv.title}</div>
                    {srv.hindiTitle && (
                      <div className="text-[11px] text-amber-400/80 font-serif">{srv.hindiTitle}</div>
                    )}
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                      {srv.shortDescription}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                      {srv.category}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    {srv.durationMinutes} Minutes
                  </td>

                  <td className="p-3.5">
                    <div className="font-cinzel text-amber-300 font-bold text-sm">
                      ₹{srv.price.toLocaleString('en-IN')}
                    </div>
                    {srv.originalPrice && (
                      <div className="text-[10px] text-slate-500 line-through">
                        ₹{srv.originalPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  <td className="p-3.5">
                    {srv.popular ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Most Booked
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Standard</span>
                    )}
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() =>
                        updateService({
                          ...srv,
                          active: !srv.active,
                        })
                      }
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        srv.active
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {srv.active ? 'Published' : 'Hidden'}
                    </button>
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(srv)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete consultation "${srv.title}"?`)) {
                            deleteService(srv.id);
                            showToast(`Deleted ${srv.title}`, 'info');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {(editingService || isAddingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-cinzel text-base font-bold text-amber-200">
                {editingService ? `Edit "${editingService.title}"` : 'Add New Vedic Consultation'}
              </h3>
              <button
                onClick={() => {
                  setEditingService(null);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Navamsha & Vivah Kundli Milan"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Hindi / Sanskrit Title</label>
                  <input
                    type="text"
                    value={hindiTitle}
                    onChange={e => setHindiTitle(e.target.value)}
                    placeholder="e.g. विवाह व अष्टकूट मिलान"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500 font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="kundli">Kundli</option>
                    <option value="marriage">Marriage</option>
                    <option value="career">Career</option>
                    <option value="gemstone">Gemstone</option>
                    <option value="vastu">Vastu</option>
                    <option value="puja">Puja</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Fee (INR) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Original Price (Strike)</label>
                  <input
                    type="number"
                    value={originalPrice || ''}
                    onChange={e => setOriginalPrice(Number(e.target.value) || undefined)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={popular}
                      onChange={e => setPopular(e.target.checked)}
                      className="rounded border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <span>Most Booked Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={e => setActive(e.target.checked)}
                      className="rounded border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <span>Active (Public)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={e => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Features & Inclusions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={e => setFeaturesText(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
